<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clicher extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'description',
        'author_signature',
        'name',
        'class',
        'likes_count',
    ];

    // Relation avec les commentaires
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Méthode pour incrémenter le compteur de likes
    public function incrementLikes()
    {
        $this->increment('likes_count');
    }
}