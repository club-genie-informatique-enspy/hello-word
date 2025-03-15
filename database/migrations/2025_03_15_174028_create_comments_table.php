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
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('clicher_id'); // Clé étrangère vers la table clicher
        $table->string('author_name'); // Nom de l'auteur du commentaire
        $table->text('content'); // Contenu du commentaire
        $table->timestamps();

        // Clé étrangère
        $table->foreign('clicher_id')->references('id')->on('clicher')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
