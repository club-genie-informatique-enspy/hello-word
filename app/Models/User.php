<?php

namespace App\Models;

use App\Notifications\VerifyEmailApi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function articles():HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function commentaires():HasMany
    {
        return $this->hasMany(Commentaire::class);
    }

        public function likedActivities()
    {
        return $this->belongsToMany(Activity::class, 'activity_likes', 'user_id', 'activity_uuid');
    }

    public function likedMessages()
    {
        return $this->belongsToMany(Message::class, 'message_likes', 'user_id', 'message_uuid');
    }


}
