<?php

namespace App\Http\Controllers;

use App\Models\Rubrique;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RubriqueController extends Controller
{
    /**
     * Affiche toutes les rubriques.
     */
    public function index()
    {
        $rubriques = Rubrique::all();
        return response()->json($rubriques);
    }

    /**
     * Crée une nouvelle rubrique.
     */
    public function store(Request $request)
{
    $request->validate([
        'titre' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('storage/uploads/rubriques/images'), $imageName);
        $imagePath = asset('storage/uploads/rubriques/images/' . $imageName);
    }

    $rubrique = Rubrique::create([
        'rubrique_uuid' => Str::uuid(),
        'titre' => $request->titre,
        'description' => $request->description,
        'image' => $imagePath,
    ]);

    return response()->json($rubrique, 201);
}


    /**
     * Affiche une rubrique spécifique.
     */
    public function show($uuid)
    {
        $rubrique = Rubrique::findByUuid($uuid);
        if (!$rubrique) {
            return response()->json(['message' => 'Rubrique non trouvée'], 404);
        }

        return response()->json($rubrique);
    }

    /**
     * Met à jour une rubrique.
     */
    public function update(Request $request, $uuid)
    {
        $rubrique = Rubrique::findByUuid($uuid);
        if (!$rubrique) {
            return response()->json(['message' => 'Rubrique non trouvée'], 404);
        }
    
        $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/uploads/rubriques/images'), $imageName);
            $rubrique->image = asset('storage/uploads/rubriques/images/' . $imageName);
        }
    
        $rubrique->update($request->only(['titre', 'description', 'image']));
    
        return response()->json($rubrique);
    }
    
    /**
     * Supprime une rubrique.
     */
    public function destroy($id)
{
    $rubrique = Rubrique::where('rubrique_uuid', $id)->firstOrFail();
    
    // Supprimer d'abord les articles liés
    $rubrique->articles()->delete();

    // Puis supprimer la rubrique
    $rubrique->delete();

    return response()->json(['message' => 'Rubrique supprimée avec succès']);
}


    /**
     * Affiche les articles d'une rubrique.
     */
    public function articles($uuid)
    {
        $rubrique = Rubrique::findByUuid($uuid);
        if (!$rubrique) {
            return response()->json(['message' => 'Rubrique non trouvée'], 404);
        }

        $articles = $rubrique->articles;
        return response()->json($articles);
    }
}
