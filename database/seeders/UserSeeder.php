<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Créer un utilisateur admin
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',  // Rôle admin
        ]);

        // Créer un utilisateur normal
        User::create([
            'name' => 'User Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user',  // Rôle user
        ]);
    }
}
