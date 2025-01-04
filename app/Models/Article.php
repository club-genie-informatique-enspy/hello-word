<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'article_uuid',
        'user_id',
        'auteur',
        'titre',
        'contenu',
        'slug',
        'image',
        'source',
        'nb_vues',
        'likes',
        'created_at',
        'updated_at',
    ];
    protected  $primaryKey = 'article_uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    public function commentaires():HasMany
    {
        return $this->hasMany(Commentaire::class);
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public static function findByUuid(string $uuid): ?Article
    {
        return self::where('article_uuid', $uuid)->first();
    }
}
