<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    /**
     * Upload une image à partir d'un fichier
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240', // 10MB max
        ]);

        try {
            $file = $request->file('image');
            $filename = 'articles/images/' . date('YmdHis') . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            $path = Storage::disk('public')->putFileAs('', $file, $filename);
            $url = Storage::disk('public')->url($filename);

            return response()->json([
                'url' => $url,
                'path' => $filename
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Upload une image à partir de données base64
     */
    public function uploadBase64Image(Request $request)
    {
        $request->validate([
            'type' => 'required|string', // png, jpeg, etc.
            'data' => 'required|string', // données base64
        ]);

        try {
            // Décoder les données base64
            $decodedData = base64_decode($request->data, true);
            if ($decodedData === false) {
                return response()->json(['error' => 'Données base64 invalides'], 400);
            }

            // Générer un nom de fichier unique
            $filename = 'articles/images/' . date('YmdHis') . '_' . Str::random(10) . '.' . $request->type;

            // Sauvegarder l'image
            Storage::disk('public')->put($filename, $decodedData);
            $url = Storage::disk('public')->url($filename);

            return response()->json([
                'url' => $url,
                'path' => $filename
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
