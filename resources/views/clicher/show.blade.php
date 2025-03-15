<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliché : {{ $clicher->description }}</title>
</head>
<body>
    <h1>{{ $clicher->description }}</h1>

    <!-- Affichage de l'image -->
    <img src="{{ asset('storage/' . $clicher->image_path) }}" alt="{{ $clicher->description }}" style="max-width: 100%;">

    <!-- Compteur de likes et bouton de like -->
    <div>
        <p>Likes : {{ $clicher->likes_count }}</p>
        <form action="{{ route('clicher.like', $clicher->id) }}" method="POST">
            @csrf
            <button type="submit">Like</button>
        </form>
    </div>

    <!-- Bouton de partage -->
    <div>
        <button onclick="shareOnSocialMedia()">Partager</button>
    </div>

    <!-- Section commentaires -->
    <h2>Commentaires</h2>
    @foreach ($clicher->comments as $comment)
        <div>
            <strong>{{ $comment->author_name }}</strong>
            <p>{{ $comment->content }}</p>
            <small>{{ $comment->created_at->diffForHumans() }}</small>
        </div>
    @endforeach

    <!-- Formulaire pour ajouter un commentaire -->
    <form action="{{ route('clicher.addComment', $clicher->id) }}" method="POST">
        @csrf
        <div>
            <label for="author_name">Votre nom :</label>
            <input type="text" name="author_name" id="author_name" required>
        </div>
        <div>
            <label for="content">Votre commentaire :</label>
            <textarea name="content" id="content" required></textarea>
        </div>
        <button type="submit">Ajouter un commentaire</button>
    </form>

    <!-- Script pour le bouton de partage -->
    <script>
        function shareOnSocialMedia() {
            const url = window.location.href;
            const text = "Regardez ce cliché : {{ $clicher->description }}";
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        }
    </script>
</body>
</html>