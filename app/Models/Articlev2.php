<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articlev2 extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'cover_image',
        'status',
        'user_id'
    ];
    protected $table = 'articlesv2';
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
