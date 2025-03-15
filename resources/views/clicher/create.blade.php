<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un cliché</title>
</head>
<body>
    <h1>Ajouter un cliché</h1>

    @if (session('success'))
        <div style="color: green;">{{ session('success') }}</div>
    @endif

    <form action="{{ route('clicher.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div>
            <label for="image">Image (JPG, PNG, WEBP - max 4 Mo) :</label>
            <input type="file" name="image" id="image" required>
        </div>

        <div>
            <label for="description">Description :</label>
            <textarea name="description" id="description" required></textarea>
        </div>

        <div>
            <label for="author_signature">Signature de l'auteur :</label>
            <input type="text" name="author_signature" id="author_signature" required>
        </div>

        <div>
            <label for="name">Nom :</label>
            <input type="text" name="name" id="name" required>
        </div>

        <div>
            <label for="class">Classe :</label>
            <input type="text" name="class" id="class" required>
        </div>

        <button type="submit">Enregistrer</button>
    </form>
</body>
</html>