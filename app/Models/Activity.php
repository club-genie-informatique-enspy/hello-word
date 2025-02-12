<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = ['activity_uuid', 'type', 'title', 'description', 'nb_vues'];

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'activity_uuid', 'activity_uuid');
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'activity_likes', 'activity_uuid', 'user_id');
    }

 
        public function toggleLike($userId)
    {
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

}
