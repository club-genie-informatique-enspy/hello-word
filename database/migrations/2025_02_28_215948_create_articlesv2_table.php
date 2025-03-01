<?php
// Migration: create_articles_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesv2Table extends Migration
{
    public function up()
    {
        Schema::create('articlesv2', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('cover_image')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
            $table->foreignId('user_id')->constrained();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articlesv2');
    }
}
