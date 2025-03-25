<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ArticleControllerv2 extends Controller
{
    public function index()
    {
        $articles = Article::latest()->paginate(10);
        return response()->json($articles);
    }

    public function myArticles()
    {
        $articles = Article::latest()->paginate(10);
        return response()->json($articles);
    }

    public function show($article_uuid)
    {
        $article = Article::where('article_uuid', $article_uuid)->first();

        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        // Incrémenter le compteur de vues
        $article->increment('nb_vues');

        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'rubrique_uuid' => 'required|string|exists:rubriques,rubrique_uuid',
            'auteur' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'image' => 'nullable|image',
        ]);

        $article_uuid = (string) Str::uuid();
        $slug = Str::slug($validated['titre']);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->handleImageUpload($request->file('image'));
        }

        // Vérifier s'il reste des images base64 à traiter
        // Cette fonctionnalité est conservée comme filet de sécurité
        $content = $this->checkAndProcessRemainingBase64Images($validated['contenu']);

        $article = Article::create([
            'article_uuid' => $article_uuid,
            'user_id' => $validated['user_id'],
            'rubrique_uuid' => $validated['rubrique_uuid'],
            'auteur' => $validated['auteur'],
            'titre' => $validated['titre'],
            'contenu' => $content,
            'slug' => $slug,
            'image' => $imagePath ? asset('storage/'.$imagePath) : null,
            'source' => $validated['source'] ?? null,
            'slogan' => $validated['slogan'] ?? null,
            'nb_vues' => 0,
        ]);

        return response()->json($article, 201);
    }

    public function update(Request $request, $article_uuid)
    {
        $article = Article::where('article_uuid', $article_uuid)->first();

        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        // Vérifier si l'utilisateur est autorisé à modifier cet article
        if ($article->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'rubrique_uuid' => 'required|string|exists:rubriques,rubrique_uuid',
            'auteur' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'image' => 'nullable|image',
        ]);

        // Mise à jour du slug si le titre a changé
        if ($article->titre !== $validated['titre']) {
            $article->slug = Str::slug($validated['titre']);
        }

        // Gestion de l'image de couverture
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($article->image) {
                $this->deleteImageFromUrl($article->image);
            }

            $imagePath = $this->handleImageUpload($request->file('image'));
            $article->image = asset('storage/'.$imagePath);
        }

        // Vérifier s'il reste des images base64 à traiter
        $content = $this->checkAndProcessRemainingBase64Images($validated['contenu'], $article->contenu);

        // Nettoyer les images non utilisées
        $this->cleanUnusedImages($content, $article->contenu);

        $article->titre = $validated['titre'];
        $article->contenu = $content;
        $article->rubrique_uuid = $validated['rubrique_uuid'];
        $article->auteur = $validated['auteur'] ?? $article->auteur;
        $article->source = $validated['source'] ?? $article->source;
        $article->slogan = $validated['slogan'] ?? $article->slogan;
        $article->save();

        return response()->json($article);
    }

    public function destroy($article_uuid)
    {
        $article = Article::where('article_uuid', $article_uuid)->first();

        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        // Supprimer l'image de couverture
        if ($article->image) {
            $this->deleteImageFromUrl($article->image);
        }

        // Supprimer les images du contenu
        $this->deleteContentImages($article->contenu);

        $article->delete();

        return response()->json(['message' => 'Article supprimé']);
    }

    /**
     * Supprime une image à partir de son URL
     */
    private function deleteImageFromUrl($imageUrl)
    {
        // Extraire le chemin relatif à partir de l'URL
        $path = parse_url($imageUrl, PHP_URL_PATH);
        if ($path) {
            $relativePath = str_replace('/storage/', '', $path);
            Storage::disk('public')->delete($relativePath);
            Log::info("Deleted image: {$relativePath}");
        }
    }

    /**
     * Gère l'upload d'une image
     */
    private function handleImageUpload($image)
    {
        $filename = 'articles/covers/' . date('YmdHis') . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
        $image->storeAs('public', $filename);
        return $filename;
    }

    /**
     * Vérifie et traite les images base64 restantes dans le contenu
     * Cette fonction est conservée comme filet de sécurité au cas où des images base64
     * n'auraient pas été traitées côté client
     */
    private function checkAndProcessRemainingBase64Images($content, $oldContent = null)
    {
        // Vérifier s'il y a des images base64 dans le contenu
        if (strpos($content, 'data:image/') === false) {
            return $content; // Pas d'images base64, retourner le contenu tel quel
        }

        // Trouver toutes les balises d'images base64
        $pattern = '/<img[^>]*src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/i';
        if (!preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
            return $content; // Pas de correspondances
        }

        Log::info('Found ' . count($matches) . ' remaining base64 images to process');

        foreach ($matches as $index => $match) {
            $fullImgTag = $match[0];       // La balise <img> complète
            $extension = $match[1];        // L'extension (png, jpeg, etc.)
            $base64Data = $match[2];       // Les données en base64

            try {
                // Décoder les données base64
                $decodedData = base64_decode($base64Data, true);
                if ($decodedData === false) {
                    Log::warning("Image {$index}: Invalid base64 data");
                    continue;
                }

                // Générer un nom de fichier unique
                $filename = 'articles/images/' . date('YmdHis') . '_' . Str::random(10) . '.' . $extension;

                // Sauvegarder l'image
                if (!Storage::disk('public')->put($filename, $decodedData)) {
                    Log::error("Failed to save image");
                    continue;
                }

                Log::info("Image {$index}: Saved to {$filename}");

                // Créer l'URL pour l'image
                $imageUrl = Storage::disk('public')->url($filename);

                // Remplacer la balise img
                $newImgTag = str_replace(
                    'src="data:image/' . $extension . ';base64,' . $base64Data . '"',
                    'src="' . $imageUrl . '"',
                    $fullImgTag
                );

                // Remplacer dans le contenu
                $content = str_replace($fullImgTag, $newImgTag, $content);
            } catch (\Exception $e) {
                Log::error("Error processing image {$index}: " . $e->getMessage());
            }
        }

        return $content;
    }

    /**
     * Identifie et supprime les images qui ne sont plus utilisées dans le contenu
     */
    private function cleanUnusedImages($newContent, $oldContent)
    {
        // Extraire les URL des images de l'ancien contenu
        preg_match_all('/src="(\/storage\/articles\/images\/[^"]+)"/', $oldContent, $oldMatches);

        // Extraire les URL des images du nouveau contenu
        preg_match_all('/src="(\/storage\/articles\/images\/[^"]+)"/', $newContent, $newMatches);

        // Identifier les images qui ne sont plus utilisées
        $oldImageUrls = $oldMatches[1] ?? [];
        $newImageUrls = $newMatches[1] ?? [];

        $unusedImages = array_diff($oldImageUrls, $newImageUrls);

        // Supprimer les images non utilisées
        foreach ($unusedImages as $imageUrl) {
            $path = str_replace('/storage/', '', $imageUrl);
            Storage::disk('public')->delete($path);
            Log::info("Deleted unused image: {$path}");
        }
    }

    /**
     * Supprime toutes les images d'un contenu
     */
    private function deleteContentImages($content)
    {
        preg_match_all('/src="(\/storage\/articles\/images\/[^"]+)"/', $content, $matches);

        if (isset($matches[1])) {
            foreach ($matches[1] as $imageUrl) {
                $path = str_replace('/storage/', '', $imageUrl);
                Storage::disk('public')->delete($path);
                Log::info("Deleted image: {$path}");
            }
        }
    }
}
