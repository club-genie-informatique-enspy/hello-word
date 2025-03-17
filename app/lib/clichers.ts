import { Photo } from "@/types/photo";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getAllClichers(): Promise<Photo[]> {
  const response = await fetch(`${API_BASE_URL}/clichers`);
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}
