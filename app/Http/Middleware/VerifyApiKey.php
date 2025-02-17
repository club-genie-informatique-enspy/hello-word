<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apikey = config('app.api_key');
        $apiKeyIsValid = (
            filled($apikey)
            && $apikey === $request->header('X-API-KEY')
        );
        
        abort_if(! $apiKeyIsValid, Response::HTTP_UNAUTHORIZED,'Access Denied');

        return $next($request);
    }
}
