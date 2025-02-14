<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Message;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ActivitySeeder extends Seeder
{
    public function run()
    {
        $activity = Activity::create([
            'activity_uuid' => Str::uuid(),
            'type' => 'crush',
            'title' => 'Déclarations anonymes',
            'description' => 'les crush anonymes 20025, la magie la magie la magie',
            'nb_vues' => 0,
        ]);

        Message::create([
            'message_uuid' => Str::uuid(),
            'activity_uuid' => $activity->activity_uuid,
            'sender' => 'Anonyme',
            'contenu' => 'J’ai un crush sur toi depuis longtemps...',
            'receiver' => 'Anonyme',
            'nb_vues' => 0,
        ]);
        Message::create([
            'message_uuid' => Str::uuid(),
            'activity_uuid' => $activity->activity_uuid,
            'sender' => 'Anonyme',
            'contenu' => 'J’ai un crush sur toi depuis longtemps...',
            'receiver' => 'Anonyme',
            'nb_vues' => 0,
        ]);
        Message::create([
            'message_uuid' => Str::uuid(),
            'activity_uuid' => $activity->activity_uuid,
            'sender' => 'Anonyme',
            'contenu' => 'J’ai un crush sur toi depuis longtemps...',
            'receiver' => 'Anonyme',
            'nb_vues' => 0,
        ]);
        Message::create([
            'message_uuid' => Str::uuid(),
            'activity_uuid' => $activity->activity_uuid,
            'sender' => 'Anonyme',
            'contenu' => 'J’ai un crush sur toi depuis longtemps...',
            'receiver' => 'Anonyme',
            'nb_vues' => 0,
        ]);
    }
}
