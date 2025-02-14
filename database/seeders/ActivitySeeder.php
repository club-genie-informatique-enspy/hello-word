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
            'activity_uuid' => 'f68b84ac-733b-4e9a-9cc9-b8c4e0a88b9a',
            'type' => 'crush',
            'title' => 'Déclarations anonymes',
            'description' => 'les crush anonymes 20025, la magie la magie la magie',
            'nb_vues' => 0,
        ]);

    }
}
