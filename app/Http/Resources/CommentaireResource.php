<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentaireResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'commentaire_uuid' => $this->commentaire_uuid,
            'article_uuid' => $this->article_uuid,
            'user_id' => $this->user_id,
            'contenu' => $this->contenu,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
