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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->uuid('article_uuid')->unique();
            $table->foreignIdFor(\App\Models\User::class);
            $table->string('titre');
            $table->string('slug')->unique();
            $table->text('auteur')->nullable();
            $table->text('contenu');
            $table->string('image')->nullable();
            $table->string('source')->nullable();
            $table->bigInteger('nb_vues')->nullable();
            $table->bigInteger('likes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
