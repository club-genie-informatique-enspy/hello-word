<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Commentaire extends Model
{
    /** @use HasFactory<\Database\Factories\CommentaireFactory> */
    use HasFactory;
    protected $fillable =[
        'article_uuid',
        'commentaire_uuid',
        'user_id',
        'contenu'
    ];
    protected  $primaryKey = 'commentaire_uuid';
    protected $keyType = 'string';
    public $incrementing = false;
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function article() :BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public static function findByUuid(string $uuid): ?Commentaire
    {
        return self::where('commentaire_uuid', $uuid)->first();
    }

}
