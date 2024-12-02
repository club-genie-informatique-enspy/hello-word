<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_id = \App\Models\User::all()->pluck('id')->toArray();
        return [
            'user_id' => fake()->randomElement($user_id),
            'article_uuid' => (string)Str::uuid(),
            'image' => 'https://picsum.photos/640/480?random=' . fake()->numberBetween(1, 1000),
            'contenu' => fake()->sentence(),
            'titre' => fake()->word(),
            'slug' => fake()->unique()->slug(),
            'auteur' => fake()->word(),
            'source' => fake()->word(),
            'nb_vues' => fake()->randomNumber(),
            'likes' => fake()->randomNumber(),
        ];
    }
}
