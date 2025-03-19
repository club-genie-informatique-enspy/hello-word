<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() &&
            $request->user() instanceof MustVerifyEmail &&
            ! $request->user()->hasVerifiedEmail()) {

            return response()->json([
                'message' => 'Votre adresse e-mail n\'est pas vérifiée.',
                'verification_needed' => true
            ], 409); // 409 Conflict
        }

        return $next($request);
    }
}
