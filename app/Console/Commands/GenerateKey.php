<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateKey extends Command
{
    protected $signature = 'key:generate-custom';
    protected $description = 'Génère une clé aléatoire de 64 caractères';

    public function handle()
    {
        $key = Str::random(64);
        $this->info('Votre clé générée :');
        $this->line($key);

        return Command::SUCCESS;
    }
}
