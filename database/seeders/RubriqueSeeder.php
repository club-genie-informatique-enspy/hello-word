<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rubrique;
use Illuminate\Support\Str;

class RubriqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Données des rubriques à insérer
        $rubriques = [
            [
                'rubrique_uuid' => Str::uuid(),
                'titre' => 'Vie sur le campus',
                'description' => 'Tout ce qui touche à la vie sur le campus, les événements, les associations et plus.',
                'image' => 'path_to_image_campus.jpg', // Remplacer par le chemin réel de l’image
            ],
            [
                'rubrique_uuid' => Str::uuid(),
                'titre' => 'Sport',
                'description' => 'Les actualités sportives, les événements, les résultats et les compétitions.',
                'image' => 'path_to_image_sport.jpg', // Remplacer par le chemin réel de l’image
            ],
            [
                'rubrique_uuid' => Str::uuid(),
                'titre' => 'Jeux et divers',
                'description' => 'Rubrique dédiée aux jeux vidéo, jeux de société et autres loisirs divers.',
                'image' => 'path_to_image_jeux.jpg', // Remplacer par le chemin réel de l’image
            ],
            [
                'rubrique_uuid' => Str::uuid(),
                'titre' => 'Regards sur le monde',
                'description' => 'Les dernières actualités mondiales, analyses et réflexions sur les événements internationaux.',
                'image' => 'path_to_image_monde.jpg', // Remplacer par le chemin réel de l’image
            ],
        ];

        // Insérer chaque rubrique dans la base de données
        foreach ($rubriques as $rubrique) {
            Rubrique::create($rubrique);
        }
    }
}
