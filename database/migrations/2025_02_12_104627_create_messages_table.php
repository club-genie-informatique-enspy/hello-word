<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->uuid("message_uuid")->unique();
            $table->uuid('activity_uuid');
            $table->string('sender'); // Anonyme ou nom de utilisateur
            $table->text('contenu');
            $table->string('receiver'); // Optionnel
            $table->bigInteger('nb_vues')->default(0);
            $table->timestamps();

            $table->foreign('activity_uuid')->references('activity_uuid')->on('activities')->onDelete('cascade');
        });

        // Table pivot pour les likes des messages
        Schema::create('message_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('message_uuid')->references('message_uuid')->on('messages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_likes');
        Schema::dropIfExists('messages');
    }
};
