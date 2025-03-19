<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    /**
     * Constructeur
     */
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum')->only('resend');
    //     $this->middleware('signed')->only('verify');
    //     $this->middleware('throttle:6,1')->only('verify', 'resend');
    // }

    /**
     * Vérifier l'adresse e-mail
     */
    public function verify(Request $request)
    {
        $user = User::findOrFail($request->route('id'));

        if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json([
                'message' => 'Lien de vérification invalide'
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email déjà vérifié',
                'verified' => true
            ]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // Si un paramètre redirect_to est présent dans la requête, rediriger l'utilisateur
        if ($request->has('redirect_to')) {
            return redirect($request->redirect_to);
        }

        return response()->json([
            'message' => 'Email vérifié avec succès',
            'verified' => true
        ]);
    }

    /**
     * Renvoyer l'email de vérification
     */
    public function resend(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email déjà vérifié',
                'verified' => true
            ], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Email de vérification envoyé avec succès'
        ]);
    }
}
