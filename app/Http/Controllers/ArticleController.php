<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use App\Models\Rubrique;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{

    public function index()
    
    {
        return ArticleResource::collection(Article::all());
    }

    public function store(Request $request, string $rubrique_uuid)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'contenu' => 'required|string',
            'titre' => 'required|string',
            'slug' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'auteur' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'nb_vues' => 'required|integer',
            'slogan'=>'required|string',
        ]);
    
        // Vérifier si la rubrique existe
        $rubrique = Rubrique::where('rubrique_uuid', $rubrique_uuid)->first();
        if (!$rubrique) {
            return response()->json(['message' => 'Rubrique non trouvée'], 404);
        }
    
        // Gestion de l'upload de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/uploads/articles/images'), $imageName);
            $validated['image'] = asset('storage/uploads/articles/images/' . $imageName);
        }
    
        // Ajout des champs supplémentaires
        $validated['article_uuid'] = Str::uuid();
        $validated['rubrique_uuid'] = $rubrique->rubrique_uuid;
    
        // Créer l'article
        $article = Article::create($validated);
    
        return new ArticleResource($article);
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
        return response()->json($model, 201);
    }

    public function destroy(string $uuid)
    {
        $article = Article::where('article_uuid', $uuid)->firstOrFail();
        $article->commentaires()->delete();
        $article->delete();

        return response()->json(['message' => 'Article deleted!']);
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
