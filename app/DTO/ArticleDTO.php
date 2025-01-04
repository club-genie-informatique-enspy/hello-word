<?php



namespace App\DTO;

use App\Http\Requests\ArticleRequest;
readonly class ArticleDTO
{

    public function __construct(
        public? string $image,
        public? string $content,
        public? string $auteur,
        public? string $source,
        public? int $nbVue,
        public? int $likes,
        public? string $uuid,

    ) {}

    public static function fromRequest(ArticleRequest $request): self
    {
        return new self(
            image : $request->get('image'),
            content : $request->get('content'),
            auteur : $request->get('auteur'),
            source : $request->get('source'),
            nbVue : $request->get('nbVue'),
            likes : $request->get('likes'),
            uuid : $request->get('uuid'),

        );
    }
}