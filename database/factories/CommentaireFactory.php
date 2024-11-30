<?php

namespace Database\Factories;

use App\Models\Commentaire;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Commentaire>
 */
class CommentaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $articles_uuid = \App\Models\Article::all()->pluck('article_uuid')->toArray();
        $user_id = \App\Models\User::all()->pluck('id')->toArray();
        return [
            'commentaire_uuid' => (string)Str::uuid(),
            'article_uuid' => fake()->randomElement($articles_uuid),
            'user_id' => fake()->randomElement($user_id),
            'contenu' => fake()->sentence()
        ];
    }
}
