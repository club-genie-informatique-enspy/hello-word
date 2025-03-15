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