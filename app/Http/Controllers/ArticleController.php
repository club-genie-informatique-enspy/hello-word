<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

    public function index()
    
    {
        return ArticleResource::collection(Article::all());
    }

    public function store(ArticleRequest $request): ArticleResource
    {
        $validated = $request->validated();
        // Bien ici on va gérer l'upload de l'image
        $image = $request->file('image');
        $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('storage/uploads/articles/images'), $imageName);
        $validated["image"] = asset('storage/uploads/articles/images/' .  $imageName);
        //Ennnnnnnnndddddddddddddddd
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
    public function like($uuid)
    {
        $article = Article::where('article_uuid', $uuid)->firstOrFail();
        $user = Auth::user();
        $article->likes()->attach($user->id);
        
        return response()->json(['message' => 'Liked!']);
    }

    public function toggleLike($uuid)
    {
        $article = Article::where('article_uuid', $uuid)->firstOrFail();
        $user = Auth::user();
        $article = $article->toggleLike($user->id);

        return response()->json(['message' => $article]);
    }

    public function incrementViews($uuid)
    {
        $article = Article::where('article_uuid', $uuid)->firstOrFail();
        $article->incrementViews();

        return response()->json(['message' => 'View count incremented']);
    }

    public function getLikesCount($uuid)
    {
        $article = Article::where('article_uuid', $uuid)->withCount('likes')->firstOrFail();
        
        return response()->json(['likes' => $article->likes_count]);
    }

    public function getViewsCount($uuid)
    {
        $article = Article::where('article_uuid', $uuid)->firstOrFail();
        
        return response()->json(['views' => $article->nb_vues]);
    }


}
