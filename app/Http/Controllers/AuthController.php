<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
{
    // Vérification préalable de l'email
    if (User::where('email', $request->email)->exists()) {
        return response()->json([
            'error' => 'Cet email est déjà utilisé.',
            'field' => 'email'  // Indique quel champ a causé l'erreur
        ], 422);  // Utilisation de 422 pour les erreurs de validation
    }

    try {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
            'role' => 'string|in:user,admin',
        ], [
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $request->role ?? 'user',
        ]);

//        event(new Registered($user));
        $user->sendEmailVerificationNotification();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'email_verified' => $user->hasVerifiedEmail(),
            ],
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 201);

    } catch (ValidationException $e) {
        return response()->json([
            'error' => current($e->errors())[0],
            'field' => key($e->errors())
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Une erreur est survenue lors de l\'inscription.',
            'details' => $e->getMessage()
        ], 500);
    }
}

    // Connexion
    // Connexion
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'email_verified' => $user->hasVerifiedEmail()

        ],
        'token' => $user->createToken('auth_token')->plainTextToken,
        'email_verified' => $user->hasVerifiedEmail()
    ]);
}


    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    // Récupérer le profil de l'utilisateur
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
    public function generateVerificationUrl(Request $request)
    {
        $user = $request->user();

        // Générer une URL de vérification signée
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $user->id,
                'hash' => sha1($user->email),
                'redirect_to' => config('app.frontend_url').'/email-verified' // URL de redirection côté frontend
            ]
        );

        return response()->json(['verification_url' => $verificationUrl]);
    }

    public function verifyEmail(Request $request)
    {
        $user = User::findOrFail($request->id);

        if (!hash_equals((string) $request->hash, sha1($user->email))) {
            return response()->json(['message' => 'Lien invalide'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            // L'email est déjà vérifié, rediriger vers le frontend
            return redirect()->away($request->redirect_to ?? config('app.frontend_url'));
        }

        $user->markEmailAsVerified();

        // Rediriger vers le frontend avec succès
        return redirect()->away($request->redirect_to ?? config('app.frontend_url'));
    }

    public function resendVerificationEmail(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié'], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Lien de vérification envoyé']);
    }
}
