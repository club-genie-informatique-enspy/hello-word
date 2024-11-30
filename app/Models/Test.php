<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    /** @use HasFactory<\Database\Factories\Api\v1\TestFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    protected$primaryKey = 'uuid';

    public static function getTestById($uuid):self {
        try {
            return self::findOrFail($uuid);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
