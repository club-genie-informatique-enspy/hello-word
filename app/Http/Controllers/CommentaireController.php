<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentaireRequest;
use App\Models\Article;
use App\Models\Commentaire;
use App\Http\Resources\CommentaireResource;

class CommentaireController extends Controller
{

    public function index()
    {
        return CommentaireResource::collection(Commentaire::all());
    }

    public function store(CommentaireRequest $request, string $article_uuid)
    {
        $validated = $request->validated();
        $model = Commentaire::create($validated);
        return new CommentaireResource($model);
    }

    public function show(string $uuid)
    {
        return new CommentaireResource(Commentaire::findByUuid($uuid));
    }

    public function update(CommentaireRequest $request, string $article_uuid, string $uuid)
    {
        $validated = $request->validated();
        $comment = Commentaire::findByUuid($uuid);
        $model = $comment;
        $model->update($validated);
        return new CommentaireResource($model);
    }

    public function destroy(string $uuid)
    {
        $model = Commentaire::findByUuid($uuid);
        $model->delete();
        return response(null, 204);
    }

}
