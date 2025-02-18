import Cookies from 'js-cookie'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function fetchAPI(endpoint: string, options: RequestInit = {}) {

  const token = Cookies.get("authToken");


  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'X-API-KEY': 'HfJcYj7AGYPHqS9x5eRub5XRK9zJFpEthdBl5ShvyJyBEStJnsGTFmEFyInY76G7',
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}`, } : {}),
      
    },
  });

  const fullURL = `${API_BASE_URL}${endpoint}`;
  

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
