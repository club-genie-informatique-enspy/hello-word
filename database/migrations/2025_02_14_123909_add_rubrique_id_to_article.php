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
        Schema::table('articles', function (Blueprint $table) {
            // Ajouter d'abord la colonne rubrique_uuid
            $table->uuid('rubrique_uuid')->nullable()->after('article_uuid'); 

            // Ajouter la contrainte de clé étrangère
            $table->foreign('rubrique_uuid')
                ->references('rubrique_uuid')
                ->on('rubriques')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            // Supprimer d'abord la clé étrangère
            $table->dropForeign(['rubrique_uuid']);

            // Ensuite, supprimer la colonne
            $table->dropColumn('rubrique_uuid');
        });
    }
};
