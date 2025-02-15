<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

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
            'email' => 'required|string|email',  // Retrait de unique:users car déjà vérifié
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:user,admin',
        ], [
            'email.email' => 'L\'adresse email n\'est pas valide.',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
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
        ],
        'token' => $user->createToken('auth_token')->plainTextToken,
    ]);
}


    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    // Profil utilisateur
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}
