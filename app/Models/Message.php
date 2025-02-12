<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message_uuid', 'activity_uuid', 'sender', 'contenu', 'receiver', 'nb_vues'];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class, 'activity_uuid', 'activity_uuid');
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_likes', 'message_uuid', 'user_id');
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
