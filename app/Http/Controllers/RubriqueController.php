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
        $rubrique = Rubrique::where('rubrique_uuid', $uuid)->first();
        
        if (!$rubrique) {
            return response()->json(['message' => 'Rubrique non trouvée'], 404);
        }
    
        // Validation des champs
        $validatedData = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Gestion de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/uploads/rubriques/images'), $imageName);
            $validatedData['image'] = asset('storage/uploads/rubriques/images/' . $imageName);
        }
    
        // Mise à jour des données
        $rubrique->fill($validatedData);
    
        // Vérification si des modifications ont été faites avant de sauvegarder
        if ($rubrique->isDirty()) {
            $rubrique->save();
        } else {
            return response()->json(['message' => 'Aucune modification détectée'], 200);
        }
    
        return response()->json($rubrique);
    }
    
    
    /**
     * Supprime une rubrique.
     */
    public function destroy($id)
    {
        $rubrique = Rubrique::where('rubrique_uuid', $id)->firstOrFail();
    
        // Récupérer tous les articles liés à cette rubrique
        $articles = $rubrique->articles()->get();
    
        foreach ($articles as $article) {
            // Supprimer tous les commentaires liés à l'article
            $article->commentaires()->delete();
            
            // Supprimer l'article après la suppression des commentaires
            $article->delete();
        }
    
        // Une fois les articles supprimés, supprimer la rubrique
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
