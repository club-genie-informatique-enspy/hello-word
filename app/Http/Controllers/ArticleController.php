<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Http\Resources\ArticleResource;

class ArticleController extends Controller
{

    public function index()
    {
        return ArticleResource::collection(Article::all());
    }

    public function store(ArticleRequest $request): ArticleResource
    {
        $validated = $request->validated();
        $model = Article::create($validated);
        return new ArticleResource($model);
    }

    public function show(string $uuid)
    {
        $model = Article::findByUuid($uuid);
        return new ArticleResource($model);
    }

    public function update(ArticleRequest $request, string $uuid)
    {
        $model = Article::findByUuid($uuid);
        $validated = $request->validated();
        $model = $model->update($validated);
        return new ArticleResource($model);
    }

    public function destroy(string $uuid)
    {
        $model = Article::findByUuid($uuid);
        $model->delete();
        return response(null, 204);
    }

}
