import { Article } from "@/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


import { fetchAPI } from "./api";         


export async function getAllArticles(): Promise<Article[]> {
  // Route mise à jour pour lister tous les articles
  return fetchAPI('/article');
}




export async function getArticle(uuid: string): Promise<Article> {
  // Route mise à jour pour obtenir un article spécifique par uuid
  return fetchAPI(`/article/${uuid}`);
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article =>
    article.auteur.toLowerCase().trim().split(" ").join("-") === authorSlug
  );
}

export async function getAuthors(): Promise<{ slug: string; name: string; }[]> {
  const articles = await getAllArticles();
  const authorsMap = new Map();

  articles.forEach(article => {
    const slug = article.auteur.toLowerCase().trim().split(" ").join("-");
    authorsMap.set(slug, { slug, name: article.auteur });
  });

  return Array.from(authorsMap.values());
}

export async function createArticle(articleData: Omit<Article, 'article_uuid'>): Promise<Article> {
  // Route pour la création d'un article
  return fetchAPI('/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
  });
}

export async function updateArticle(uuid: string, articleData: Partial<Article>): Promise<Article> {
  // Route mise à jour pour mettre à jour un article
  return fetchAPI(`/article/${uuid}`, {
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify(articleData),
  });
}



export async function deleteArticle(uuid: string): Promise<void> {
  // Route mise à jour pour supprimer un article
  return fetchAPI(`/article/${uuid}`, {
    method: 'DELETE',
  });
}
