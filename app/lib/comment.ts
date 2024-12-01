import { Commentaire } from '@/type';

export async function getComments(articleUuid: string): Promise<Commentaire[]> {
  return fetchAPI(`/articles/${articleUuid}/commentaires`);
}

export async function createComment(commentData: Omit<Commentaire, 'commentaire_uuid'>): Promise<Commentaire> {
  return fetchAPI('/commentaires', {
    method: 'POST',
    body: JSON.stringify(commentData),
  });
}

export async function updateComment(uuid: string, commentData: Partial<Commentaire>): Promise<Commentaire> {
  return fetchAPI(`/commentaires/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(commentData),
  });
}

export async function deleteComment(uuid: string): Promise<void> {
  return fetchAPI(`/commentaires/${uuid}`, {
    method: 'DELETE',
  });
}