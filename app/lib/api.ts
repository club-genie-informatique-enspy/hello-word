const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function fetchAPI(endpoint: string, options: RequestInit = {}) {

  const token = localStorage.getItem("authToken");


  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}`
      , } : {}),
      
    },
  });

  const fullURL = `${API_BASE_URL}${endpoint}`;
  console.log("URL API:", fullURL);
  

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
