import Cookies from 'js-cookie'
import { Article } from "@/type";
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

export async function fetchArticlesAPI(endpoint: string, options: RequestInit = {}): Promise<Article[]> {
    if (!API_BASE_URL) {
        console.error('API_BASE_URL is not defined. Check your environment variables.');
        throw new Error('API configuration error: Base URL is missing');
    }

    // Assurez-vous que l'endpoint commence par /
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    let allArticles: Article[] = [];
    let currentPage = 1;
    let hasMorePages = true;

    try {
        while (hasMorePages) {
            // Construction de l'URL avec pagination
            const token = Cookies.get("authToken");
            const paginatedEndpoint = `${formattedEndpoint}?page=${currentPage}`;
            const fullURL = `${API_BASE_URL}${paginatedEndpoint}`;

            console.log(`Fetching from: ${fullURL}`);

            // Faire la requête
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

            // Vérifier si la requête a réussi
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Endpoint not found: ${paginatedEndpoint}`);
                }
                throw new Error(`API call failed: ${response.status} ${response.statusText}`);
            }

            // Récupérer et analyser les données JSON
            const result = await response.json();

            // Vérifier si nous avons des données
            if (result && result.data && Array.isArray(result.data)) {
                // Ajouter les articles de cette page
                allArticles = [...allArticles, ...result.data];

                // Vérifier s'il y a une page suivante
                if (result.next_page_url) {
                    currentPage++;
                } else {
                    hasMorePages = false;
                }
            } else {
                // Pas de données ou format inattendu
                hasMorePages = false;
            }
        }

        return allArticles;
    } catch (error) {
        console.error(`Error fetching articles from ${endpoint}:`, error);
        throw error;
    }
}
