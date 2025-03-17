import Cookies from 'js-cookie'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    if (!API_BASE_URL) {
        console.error('API_BASE_URL is not defined. Check your environment variables.');
        throw new Error('API configuration error: Base URL is missing');
    }

    const token = Cookies.get("authToken");
    const fullURL = `${API_BASE_URL}${endpoint}`;

    console.log(`Fetching from: ${fullURL}`);

    try {
        const response = await fetch(fullURL, {
            ...options,
            headers: {
                'X-API-KEY': 'HfJcYj7AGYPHqS9x5eRub5XRK9zJFpEthdBl5ShvyJyBEStJnsGTFmEFyInY76G7',
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });

        console.log(`Response status: ${response.status} - ${response.statusText}`);

        if (!response.ok) {
            // Pour 404, ajoutez un message plus spécifique
            if (response.status === 404) {
                throw new Error(`Endpoint not found: ${endpoint}`);
            }
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`API Error for ${fullURL}:`, error);
        throw error;
    }
}
