import { Commentaire } from "@/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


import { fetchAPI } from "./api";

export async function getAllComments(): Promise<Commentaire[]> {
  
  return fetchAPI('/commentaire');
}


export async function getCommentsFromArticle(articleuuid: string): Promise<Commentaire[]> {
  
  const all = await getAllComments();
  
  const commentsForArticle = all.filter(comment => comment.article_uuid === articleuuid);

  return commentsForArticle;
  
}


export async function deleteComment(commentUuid: string): Promise<void> {
  return fetchAPI(`/commentaire/${commentUuid}`, {
    method: 'DELETE',
  });
}