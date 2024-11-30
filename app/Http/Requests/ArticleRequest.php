<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'image' => 'required|string|max:255',
            'contenu' => 'required|string',
            'titre' => 'required|string',
            'slug' => 'required|string',
            'user_id' => 'required|integer',
            'auteur' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'nb_vues' => 'required|integer',
            'likes' => 'required|integer',
            'article_uuid' => 'required|uuid|max:255',

        ];
    }
}
