<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rubrique extends Model
{
    use HasFactory;

    protected $fillable = [
        'rubrique_uuid',
        'titre',
        'description',
        'image',
    ];

    protected $primaryKey = 'rubrique_uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    public function articles()
{
    return $this->hasMany(Article::class, 'rubrique_uuid', 'rubrique_uuid');
}

    public static function findByUuid(string $uuid): ?Rubrique
    {
        return self::where('rubrique_uuid', $uuid)->first();
    }
}
