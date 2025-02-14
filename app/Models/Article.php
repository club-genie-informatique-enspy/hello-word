<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'article_uuid',
        'user_id',
        'rubrique_uuid', 
        'auteur',
        'titre',
        'contenu',
        'slug',
        'image',
        'source',
        'nb_vues',
        'slogan',
        'created_at',
        'updated_at',
    ];

    protected $primaryKey = 'article_uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    public function commentaires(): HasMany
    {
        return $this->hasMany(Commentaire::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rubrique(): BelongsTo
    {
        return $this->belongsTo(Rubrique::class, 'rubrique_uuid', 'rubrique_uuid');
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'article_likes', 'article_uuid', 'user_id', 'article_uuid', 'id');
    }

    public function toggleLike($userId)
    {
        if (!is_numeric($userId)) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }

        if ($this->likes()->where('user_id', $userId)->exists()) {
            $this->likes()->detach($userId);
            return 'Disliked';
        } else {
            $this->likes()->attach($userId);
            return 'Liked';
        }
    }

    public function incrementViews()
    {
        $this->increment('nb_vues');
    }

    public function getLikesCount()
    {
        return $this->likes()->count();
    }

    public static function findByUuid(string $uuid): ?Article
    {
        return self::where('article_uuid', $uuid)->first();
    }
}
