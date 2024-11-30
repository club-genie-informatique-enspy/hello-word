<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentaireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::apiResource('article', ArticleController::class);
Route::apiResource('commentaire', CommentaireController::class)->only(['index','show','destroy','update']);
Route::post('commentaire/{article_uuid}/', [CommentaireController::class, 'store']);
