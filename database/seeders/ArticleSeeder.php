<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Créer 10 articles avec des données de base
        Article::factory(10)->create()->each(function ($article) {
            // Associez un utilisateur aléatoire à l'article (en supposant que vous ayez des utilisateurs dans la base)
            $user = User::inRandomOrder()->first();
            
            // Utilisez attach() pour lier l'article au like de l'utilisateur
            $article->likes()->attach($user->id);
        });
    }
}
