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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->uuid("activity_uuid")->unique();
            $table->string('type'); // ex: "crush"
            $table->string('title');
            $table->text('description');
            $table->bigInteger('nb_vues')->default(0);
            $table->timestamps();
        });

        // Table pivot pour les likes
        Schema::create('activity_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('activity_uuid')->references('activity_uuid')->on('activities')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_likes');
        Schema::dropIfExists('activities');
    }
};
