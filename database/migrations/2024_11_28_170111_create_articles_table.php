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
            $table->foreignIdFor(\App\Models\User::class)->constrained()->onDelete('cascade');
            $table->string('titre');
            $table->string('slug')->unique();
            $table->text('auteur')->nullable();
            $table->text('contenu');
            $table->string('image')->nullable();
            $table->string('source')->nullable();
            $table->bigInteger('nb_vues')->default(0);
            $table->string('slogan');
            $table->timestamps();
        });

        // Table pivot pour les likes des articles
        Schema::create('article_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('article_uuid')->references('article_uuid')->on('articles')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_likes');
        Schema::dropIfExists('articles');
    }
};
