<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentaireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RubriqueController;

Route::middleware('api-key')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);


    // Routes Rubriques
    Route::get('rubriques', [RubriqueController::class, 'index']);
    Route::get('rubriques/{uuid}', [RubriqueController::class, 'show']);
    Route::get('rubriques/{uuid}/articles', [RubriqueController::class, 'articles']);


    // Routes articles
    Route::get('article', [ArticleController::class, 'index']);
    Route::get('article/{uuid}', [ArticleController::class, 'show']);


    // Récupérer tous les commentaires
    Route::get('commentaire', [CommentaireController::class, 'index']);
    Route::get('commentaire/{uuid}', [CommentaireController::class, 'show']);

    // Récupérer les activités
    Route::get('/activities', [ActivityController::class, 'index']);
    Route::get('/activity/{uuid}', [ActivityController::class, 'show']);
    Route::get('/messages/{activity_uuid}', [MessageController::class, 'index']);


    // Routes Vues
    Route::post('/activity/{uuid}/increment-views', [ActivityController::class, 'incrementViews']);
    Route::post('/message/{uuid}/increment-views', [MessageController::class, 'incrementViews']);
    Route::post('/article/{uuid}/increment-views', [ArticleController::class, 'incrementViews']);

    // Récupérer nombre de likes et vues
    Route::get('/activity/{uuid}/likes', [ActivityController::class, 'getLikesCount']);
    Route::get('/activity/{uuid}/views', [ActivityController::class, 'getViewsCount']);
    Route::get('/message/{uuid}/likes', [MessageController::class, 'getLikesCount']);
    Route::get('/message/{uuid}/views', [MessageController::class, 'getViewsCount']);
    Route::get('/article/{uuid}/likes', [ArticleController::class, 'getLikesCount']);
    Route::get('/article/{uuid}/views', [ArticleController::class, 'getViewsCount']);


    Route::get('/csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });


    Route::middleware('auth:sanctum')->group(function () {
        // Créer un commentaire pour un article spécifique
        Route::post('commentaire/{article_uuid}', [CommentaireController::class, 'store']);

        // Routes Like/Dislike
        Route::post('/activity/{uuid}/toogle-like', [ActivityController::class, 'toggleLike']);
        Route::post('/message/{uuid}/toogle-like', [MessageController::class, 'toggleLike']);
        Route::post('/article/{uuid}/toogle-like', [ArticleController::class, 'toggleLike']);
    });

    Route::middleware('auth:sanctum', 'role:admin')->group(function () {

        //rubrique management
        Route::post('rubriques', [RubriqueController::class, 'store']);
        Route::put('rubriques/{uuid}', [RubriqueController::class, 'update']);
        Route::delete('rubriques/{uuid}', [RubriqueController::class, 'destroy']);

        //article management
        Route::post('articles/{rubrique_uuid}', [ArticleController::class, 'store']);
        Route::put('articles/{uuid}', [ArticleController::class, 'update']);
        Route::delete('articles/{uuid}', [ArticleController::class, 'destroy']);

        //activity management
        Route::post('/activity', [ActivityController::class, 'store']);
        Route::put('/activity/{uuid}', [ActivityController::class, 'update']);
        Route::delete('/activity/{uuid}', [ActivityController::class, 'destroy']);

        // messages management
        Route::post('/message', [MessageController::class, 'store']);
        Route::put('/message/{uuid}', [MessageController::class, 'update']);
        Route::delete('/message/{uuid}', [MessageController::class, 'destroy']);

        // Supprimer un commentaire spécifique
        Route::delete('commentaire/{uuid}', [CommentaireController::class, 'destroy']);

        // Mettre à jour un commentaire spécifique
        Route::put('commentaire/{uuid}', [CommentaireController::class, 'update']);
    });
});
