<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Message;
use Illuminate\Support\Str;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Chemin vers votre fichier Excel dans le projet
        $filePath = storage_path('app/data/crush_anonyme.xlsx');

        // UUID de l'activité à utiliser (à remplacer par votre UUID)
        $activityUuid = 'f68b84ac-733b-4e9a-9cc9-b8c4e0a88b9a';

        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        // Supprimer l'en-tête
        array_shift($rows);

        $count = 0;
        foreach ($rows as $row) {
            // Vérifier si la ligne contient des données et un destinataire
            if (empty($row[0]) || empty($row[2]) || empty($row[1])) {
                continue;
            }

            Message::create([
                'message_uuid' => Str::uuid(),
                'activity_uuid' => $activityUuid,
                'sender' => $row[3] ?? 'Anonyme', // Signature
                'contenu' => $row[2], // Déclaration
                'receiver' => $row[1], // A destination de
                'nb_vues' => 0
            ]);
            $count++;
        }

        $this->command->info("$count messages importés avec succès !");
    }
}
