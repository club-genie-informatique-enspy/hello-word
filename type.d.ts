export interface Posts {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string[];
  image: string;
  author: string;
  slug : string;
}


interface Article {
  article_uuid: string;
  user_id: number;
  titre: string;
  contenu: string;
  image: string;
  source: string;
  nb_vues: number;
  likes: string; // Si `likes` est un nombre, remplacez `string` par `number`
  slug: string;
  created_at: string; 
  updated_at: string; 
  slogan: string;
  auteur:string;
  rubrique_uuid: string;
}

  export interface Commentaire {
    commentaire_uuid: string;
    article_uuid: string;
    user_id: number;
    contenu: string;
    created_at: Date;
    updated_at: Date;
  }

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface DataToLogin {
  email: string;
  password: string;
}

export interface Activity{
  activity_uuid: string;
  type: string;
  title: string;
  description: string;
  nb_vues: number;
  likes:number;

}
export interface crushMessage{
  
  message_uuid: string;
  activity_uuid: string;
  sender: string;
  contenu: string;
  receiver: string;
  nb_vues: number;
  likes: number;

}

export interface Rubrique{
  rubrique_uuid: string;
  titre: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

