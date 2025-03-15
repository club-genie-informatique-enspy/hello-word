<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('clicher', function (Blueprint $table) {
        $table->id();
        $table->string('image_path'); // Chemin de l'image stockée
        $table->text('description'); // Description de l'image
        $table->string('author_signature'); // Signature de l'auteur
        $table->string('name'); // Nom (informations complémentaires)
        $table->string('class'); // Classe (informations complémentaires)
        $table->timestamps(); // Colonnes created_at et updated_at
        $table->unsignedBigInteger('likes_count')->default(0); // Compteur de likes
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clicher');
    }
};
