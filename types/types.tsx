interface Author {
    name: string;
    avatar?: string;
  }

 interface ArticleStats {
    likes: number;
    comments: number;
  }

interface ArticleCardProps {
    title: string;
    excerpt: string;
    author: Author;
    image?: string;
    stats: ArticleStats;
  }

  interface Article {
    article_uuid: string;
    user_id: number;
    titre: string;
    contenu: string;
    image: string;
    source: string;
    nb_vues: number;
    likes: number;
    slug: string;
    created_at: string;
    updated_at: string;
    slogan: string;
    auteur:string;
    // rubrique_uuid: string;
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  interface UserData {
    name: string;
    email: string;
    password: string;
    role: string;
  }

  interface DataToLogin {
    email: string;
    password: string;
  }
