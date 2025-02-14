<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'article_uuid' => $this->article_uuid,
            'user_id' => $this->user_id,
            'titre' => $this->titre,
            'contenu' => $this->contenu,
            'image' => $this->image,
            'source' => $this->source,
            'nb_vues' => $this->nb_vues,
            'likes' => $this->likes,
            'slug' => $this->slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'slogan'=>$this->slogan,
            'rubrique_uuid'=>$this->rubrique->rubrique_uuid

        ];
    }
}
