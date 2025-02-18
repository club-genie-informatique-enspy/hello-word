import { crushMessage as Message } from "@/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { fetchAPI } from "./api";

export async function getAllMessages(activity_uuid: string): Promise<Message[]> {
  return fetchAPI(`/messages/${activity_uuid}`);
}

export async function createMessage(messageData: Omit<Message, 'message_uuid'>): Promise<Message> {
  return fetchAPI("/message", {
    method: "POST",
    body: JSON.stringify(messageData),
  });
}

export async function likeMessage(uuid: string): Promise<void> {
  return fetchAPI(`/message/${uuid}/like`, {
    method: "POST",
  });
}

export async function toggleLikeMessage(uuid: string): Promise<void> {
  return fetchAPI(`/message/${uuid}/toggle-like`, {
    method: "POST",
  });
}

export async function incrementMessageViews(uuid: string): Promise<void> {
  return fetchAPI(`/message/${uuid}/increment-views`, {
    method: "POST",
  });
}

export async function getMessageLikesCount(uuid: string): Promise<number> {
  const response = await fetchAPI(`/message/${uuid}/likes`);
  return response.likes;
}

export async function getMessageViewsCount(uuid: string): Promise<number> {
  const response = await fetchAPI(`/message/${uuid}/views`);
  return response.views;
}

export async function updateMessage(uuid: string, messageData: Partial<Message>): Promise<Message> {
  return fetchAPI(`/message/${uuid}`, {
    method: "PUT",
    body: JSON.stringify(messageData),
  });
}

export async function deleteMessage(uuid: string): Promise<void> {
  return fetchAPI(`/message/${uuid}`, {
    method: "DELETE",
  });
}
