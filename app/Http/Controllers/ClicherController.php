<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clicher;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ClicherController extends Controller
{
    // Afficher un cliché avec ses commentaires
    public function show($id)
    {
        $clicher = Clicher::with('comments')->findOrFail($id);
        return response()->json($clicher);
    }
    
    // Enregistrer un nouveau cliché
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,webp|max:4096',
            'description' => 'required|string|max:255',
            'author_signature' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'class' => 'required|string|max:255',
        ]);

        $imagePath = $request->file('image')->store('public/images');
        $imagePath = str_replace('public/', '', $imagePath);

        $clicher = Clicher::create([
            'image_path' => $imagePath,
            'description' => $request->description,
            'author_signature' => $request->author_signature,
            'name' => $request->name,
            'class' => $request->class,
        ]);

        return response()->json(['message' => 'Cliché enregistré avec succès !', 'clicher' => $clicher], 201);
    }

    // Ajouter un commentaire
    public function addComment(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'commentaire_uuid' => Str::uuid(),
            'user_id' => Auth::id(),
            'clicher_id' => $id,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Commentaire ajouté avec succès !', 'comment' => $comment], 201);
    }

    // Incrémenter le compteur de likes
    public function like($id)
    {
        $clicher = Clicher::findOrFail($id);
        $clicher->incrementLikes();

        return response()->json(['message' => 'Like ajouté avec succès !', 'likes_count' => $clicher->likes_count]);
    }

    // Récupérer tous les clichés
    public function index()
    {
        $clichers = Clicher::all();
        return response()->json($clichers);
    }
}
