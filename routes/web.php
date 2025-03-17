<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClicherController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/clicher/create', [ClicherController::class, 'create'])->name('clicher.create');

// Enregistrer un nouveau cliché
Route::post('/clicher/store', [ClicherController::class, 'store'])->name('clicher.store');

// Afficher un cliché
Route::get('/clicher/{id}', [ClicherController::class, 'show'])->name('clicher.show');

// Ajouter un commentaire
Route::post('/clicher/{id}/comment', [ClicherController::class, 'addComment'])->name('clicher.addComment');

// Ajouter un like
Route::post('/clicher/{id}/like', [ClicherController::class, 'like'])->name('clicher.like');
