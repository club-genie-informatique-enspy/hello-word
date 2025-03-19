<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RubriqueController;
use App\Http\Controllers\ArticleControllerv2;
use App\Http\Controllers\ClicherController;



//Route::middleware('api-key')->group(function () {
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


Route::delete('articles/{uuid}', [ArticleControllerv2::class, 'destroy']);
Route::get('/articles/my', [ArticleControllerv2::class, 'myArticles']);
Route::resource('articles', ArticleControllerv2::class);

Route::get('/articles', [ArticleControllerv2::class, 'index']);
Route::get('/articles/{article}', [ArticleControllerv2::class, 'show']);
// Ajoutez cette route dans routes/api.php
Route::get('test-storage', [ArticleControllerv2::class, 'testStorage']);
// Afficher un cliché
Route::get('/clicher/{id}', [ClicherController::class, 'show'])->name('clicher.show');

// Ajouter un commentaire
Route::post('/clicher/{id}/comment', [ClicherController::class, 'addComment'])->name('clicher.addComment');

// Ajouter un like
Route::post('/clicher/{id}/like', [ClicherController::class, 'like'])->name('clicher.like');

Route::get('/clichers', [ClicherController::class, 'index']);

//});
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent']);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = \App\Models\User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Invalid verification link'], 403);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email already verified']);
    }

    $user->markEmailAsVerified();

    return response()->json(['message' => 'Email successfully verified']);
})->middleware(['signed'])->name('verification.verify');
