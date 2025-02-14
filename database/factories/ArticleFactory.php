<?php

namespace Database\Factories;

use App\Models\Rubrique;
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
        $rubrique_uuid=Rubrique::all()->pluck('rubrique_uuid')->toArray();
        return [
            'user_id' => fake()->randomElement($user_id),
            'article_uuid' => (string)Str::uuid(),
            'rubrique_uuid' => fake()->randomElement($rubrique_uuid), 
            'image' => 'https://picsum.photos/640/480?random=' . fake()->numberBetween(1, 1000),
            'contenu' => fake()->sentence(),
            'titre' => fake()->word(),
            'slogan' => fake()->word(),
            'slug' => fake()->unique()->slug(),
            'auteur' => fake()->word(),
            'source' => fake()->word(),
            'nb_vues' => fake()->randomNumber(),
            
        ];
    }
}
