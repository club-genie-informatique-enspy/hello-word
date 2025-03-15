<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clicher;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ClicherController extends Controller
{
    // Afficher un cliché avec ses commentaires

    public function create()
{
    return view('clicher.create'); // Assure-toi que la vue "clicher.create" existe
}
    public function show($id)
    {
        $clicher = Clicher::with('comments')->findOrFail($id);
        return view('clicher.show', compact('clicher'));
    }
// Enregistrer un nouveau cliché
public function store(Request $request)
{
    // Validation des données
    $request->validate([
        'image' => 'required|image|mimes:jpg,png,webp|max:4096', // 4 Mo max
        'description' => 'required|string|max:255',
        'author_signature' => 'required|string|max:255',
        'name' => 'required|string|max:255',
        'class' => 'required|string|max:255',
    ]);

    // Enregistrer l'image
    $imagePath = $request->file('image')->store('public/images');
    $imagePath = str_replace('public/', '', $imagePath); // Enlever "public/" du chemin

    // Créer un nouveau cliché
    Clicher::create([
        'image_path' => $imagePath,
        'description' => $request->description,
        'author_signature' => $request->author_signature,
        'name' => $request->name,
        'class' => $request->class,
    ]);

    return redirect()->route('clicher.create')->with('success', 'Cliché enregistré avec succès !');
}
    // Ajouter un commentaire
    public function addComment(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        Comment::create([
            'commentaire_uuid' => Str::uuid(), // Générer un UUID
            'user_id' => Auth::id(), // ID de l'utilisateur connecté
            'clicher_id' => $id, // ID du cliché
            'content' => $request->content, // Contenu du commentaire
        ]);

        return redirect()->route('clicher.show', $id)->with('success', 'Commentaire ajouté avec succès !');
    }

    // Incrémenter le compteur de likes
    public function like($id)
    {
        $clicher = Clicher::findOrFail($id);
        $clicher->incrementLikes();

        return redirect()->route('clicher.show', $id)->with('success', 'Like ajouté avec succès !');
    }
}