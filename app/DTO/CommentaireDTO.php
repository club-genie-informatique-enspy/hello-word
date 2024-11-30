<?php



namespace App\DTO;

use App\Http\Requests\CommentaireRequest;
readonly class CommentaireDTO
{

    public function __construct(
        public? int $article_id,
 public? int $user_id,
 public? string $contenu,

    ) {}

    public static function fromRequest(CommentaireRequest $request): self
    {
        return new self(
            article_id : $request->get('article_id'),
 user_id : $request->get('user_id'),
 contenu : $request->get('contenu'),

        );
    }
}