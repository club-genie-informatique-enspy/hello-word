<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentaireRequest;
use App\Models\Article;
use App\Models\Commentaire;
use App\Http\Resources\CommentaireResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CommentaireController extends Controller
{

    public function index()
    {
        return CommentaireResource::collection(Commentaire::all());
    }

   // Dans CommentaireController.php
public function store(Request $request, string $article_uuid)
{
    // Vérifier si l'article existe
    $article = Article::findByUuid($article_uuid);
    if (!$article) {
        return response()->json(['message' => 'Article non trouvé'], 404);
    }

    // Valider les données
    $validated = $request->validate([
        'contenu' => 'required|string'
    ]);

    // Vérifier que l'utilisateur est authentifié
    if (!Auth::check()) {
        return response()->json(['message' => 'Utilisateur non authentifié'], 401);
    }

    // Ajout des champs supplémentaires
    $validated['commentaire_uuid'] = Str::uuid();
    $validated['article_uuid'] = $article_uuid;
    $validated['user_id'] = Auth::id();

    // Créer le commentaire
    $commentaire = Commentaire::create($validated);

    return new CommentaireResource($commentaire);
}

    public function show(string $uuid)
    {
        return new CommentaireResource(Commentaire::findByUuid($uuid));
    }

    public function update(Request $request,  string $uuid)
    {
      

        // Trouver le commentaire
        $commentaire = Commentaire::findByUuid($uuid);
        if (!$commentaire) {
            return response()->json(['message' => 'Commentaire non trouvé'], 404);
        }

        // Vérifier que l'utilisateur est propriétaire du commentaire ou est admin
        if (Auth::id() !== $commentaire->user_id && !Auth::user()->role=='admin') {
            return response()->json(['message' => 'Non autorisé à modifier ce commentaire'], 403);
        }

        // Valider les données
        $validated = $request->validate([
            'contenu' => 'required|string'
        ]);

        // Mise à jour du commentaire
        $commentaire->update($validated);

        return new CommentaireResource($commentaire);
    }

    public function destroy(string $uuid)
    {
        $model = Commentaire::findByUuid($uuid);
        $model->delete();
        return response(null, 204);
    }

}
