<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentaireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);




Route::apiResource('article', ArticleController::class);


Route::apiResource('commentaire', CommentaireController::class)->only(['index','show','destroy','update']);




Route::post('commentaire/{article_uuid}/', [CommentaireController::class, 'store']);



Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Récupérer les activités
Route::get('/activities', [ActivityController::class, 'index']);

// Récupérer les messages d'une activite
Route::get('/messages/{activity_uuid}', [MessageController::class, 'index']);

// Routes Vues
Route::post('/activity/{uuid}/view', [ActivityController::class, 'incrementViews']);
Route::post('/message/{uuid}/view', [MessageController::class, 'incrementViews']);

// Récupérer nombre de likes et vues
Route::get('/activity/{uuid}/likes', [ActivityController::class, 'getLikesCount']);
Route::get('/activity/{uuid}/views', [ActivityController::class, 'getViewsCount']);
Route::get('/message/{uuid}/likes', [MessageController::class, 'getLikesCount']);
Route::get('/message/{uuid}/views', [MessageController::class, 'getViewsCount']);




Route::middleware('auth:sanctum','role:admin')->group(function () {

    //activity management
    Route::post('/activity', [ActivityController::class, 'store']);
    Route::put('/activity/{uuid}', [ActivityController::class, 'update']);
    Route::delete('/activity/{uuid}', [ActivityController::class, 'destroy']);
    
    // messages management
    Route::post('/message', [MessageController::class, 'store']);
    Route::put('/message/{uuid}', [MessageController::class, 'update']);
    Route::delete('/message/{uuid}', [MessageController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Routes Like/Dislike
    Route::post('/activity/{uuid}/toogle-like', [ActivityController::class, 'toggleLike']);
    Route::post('/message/{uuid}/toogle-like', [MessageController::class, 'toggleLike']);

});

