<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Rubrique;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('name', 'Hello world')->first();

        if (!$user) {
            $this->command->error('Utilisateur "Hello Word" non trouvé.');
            return;
        }

        $rubriqueOfficial = Rubrique::where('titre', 'Vie sur le campus')->first();
        $rubriqueSport = Rubrique::where('titre', 'Sport')->first();

        if (!$rubriqueOfficial || !$rubriqueSport) {
            $this->command->error('Certaines rubriques filtrées sont introuvables.');
            return;
        }

        DB::table('articles')->insert([
            [
                'user_id'      => $user->id,
                'article_uuid' => (string) Str::uuid(),
                'rubrique_uuid' => $rubriqueOfficial->rubrique_uuid,
                'titre'        => 'CÉRÉMONIE D\'INSTALLATION OFFICIELLE 🎓✨',
                'slug'         => Str::slug('Cérémonie Installation Officielle'),
                'contenu'      => "Le Vendredi 14 février 2025, la Salle des Actes de l'\u00c9cole Nationale Supérieure Polytechnique de Yaoundé a accueilli la cérémonie officielle d'installation des présidents élus des clubs et associations, ainsi que les membres de l'Exécutif de l'AE-ENSPY.\n\nPrésidée par le Directeur de l'ENSPY, cette cérémonie a marqué le début d'un mandat placé sous le signe de l'engagement, du dynamisme et de la collaboration pour le rayonnement de la communauté polytechnicienne.\n\nFélicitations aux nouveaux responsables et plein succès dans leurs missions ! 🎓",
                'image'        => public_path('vie-sur-campus-1.jpeg'),
                'auteur'       => 'Administration ENSPY',
                'source'       => 'Communiqué officiel',
                'nb_vues'      => 0,
                'slogan'       => 'Un mandat sous le signe de l\'engagement !',
                'created_at'   => Carbon::now(),
                'updated_at'   => Carbon::now(),
            ],
            [
                'user_id'      => $user->id,
                'article_uuid' => (string) Str::uuid(),
                'rubrique_uuid' => $rubriqueSport->rubrique_uuid,
                'titre'        => 'POLYTECH HANDBALL CUP 2025 🏆',
                'slug'         => Str::slug('Polytech Handball Cup 2025'),
                'contenu'      => "🏐 La Polytech Handball Cup 2025 est sur le point de démarrer ! \n\nL'AFENSPY nous promet des moments épiques.\nLes inscriptions sont ouvertes pour toutes les filles désireuses de participer à ce grand tournoi universitaire de handball. Ne manquez pas l'opportunité de vivre une compétition intense et de démontrer votre talent sur le terrain. 💪🔥\n\n🗓 Début du tournoi : --\n📍 Lieu : --\n\nPour toute information supplémentaire, restez connectés et préparez-vous à l'action ! 🚀\n\n#PHC2025 #Handball #PolytechSport",
                'image'        => public_path('storage/sport-1.jpeg'),
                'auteur'       => 'Comité Sport AFENSPY',
                'source'       => 'Affiche officielle',
                'nb_vues'      => 0,
                'slogan'       => 'Un tournoi, une passion, une équipe !',
                'created_at'   => Carbon::now(),
                'updated_at'   => Carbon::now(),
            ],
        ]);
    }
}
