"use client";

import axios from "@/lib/axios";
import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UseAuthProps {
    middleware?: "auth" | "guest";
    redirectIfAuthenticated?: string;
    defaultRedirect?: string;
    loginUrl?: string;
}

interface AuthErrors {
    [key: string]: string[];
}

interface DataToLogin {
    email: string;
    password: string;
}

interface UserData {
    name: string;
    email: string;
    password: string;
    role?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    // ajoutez d'autres propriétés selon votre modèle utilisateur
}

export const useAuth = ({
                            middleware,
                            redirectIfAuthenticated,
                            defaultRedirect = '/',
                            loginUrl = '/login'
                        }: UseAuthProps = {}) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialisation du token depuis localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    // Vérifier si le token est un JSON valide
                    const parsedToken = JSON.parse(storedToken);
                    setToken(parsedToken);
                } catch (e) {
                    // Si ce n'est pas un JSON valide, utiliser la valeur telle quelle
                    setToken(storedToken);
                }
            }
            setIsLoading(false);
        }
    }, []);

    // Configuration de l'en-tête d'authentification pour axios
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const {
        data: user,
        error: swrError,
        mutate,
        isValidating
    } = useSWR<User>(
        token ? "/profile" : null,
        () =>
            axios
                .get("/profile")
                .then((res) => res.data)
                .catch((error) => {
                    if (error.response?.status === 401) {
                        // Token invalide, nettoyage
                        localStorage.removeItem("token");
                        setToken(null);
                    }
                    if (error.response?.status !== 409) throw error;
                    router.push("/verify-email");
                }),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            errorRetryCount: 2
        }
    );

    const handleRedirect = useCallback((path: string) => {
        if (isRedirecting) return;
        setIsRedirecting(true);
        router.push(path);
        setTimeout(() => setIsRedirecting(false), 100);
    }, [router, isRedirecting]);

    const saveIntendedUrl = useCallback(() => {
        if (typeof window !== "undefined" && window.location.pathname !== loginUrl) {
            localStorage.setItem('intendedUrl', window.location.pathname + window.location.search);
        }
    }, [loginUrl]);

    const getAndClearIntendedUrl = useCallback(() => {
        if (typeof window === "undefined") return null;
        const intendedUrl = localStorage.getItem('intendedUrl');
        localStorage.removeItem('intendedUrl');
        return intendedUrl;
    }, []);

    const logout = useCallback(async () => {
        try {
            // Essayer d'appeler l'API de déconnexion si le token est présent
            if (token) {
                await axios.post("/logout");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        } finally {
            // Nettoyage côté client dans tous les cas
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            setToken(null);
            delete axios.defaults.headers.common['Authorization'];
            await mutate(undefined);
            handleRedirect(loginUrl);
        }
    }, [token, loginUrl, mutate, handleRedirect]);

    // Logique de redirection
    useEffect(() => {
        if (typeof window === "undefined" || isLoading || isValidating) return;

        if (middleware === "guest" && redirectIfAuthenticated && user && token) {
            const intendedUrl = getAndClearIntendedUrl();
            handleRedirect(intendedUrl || redirectIfAuthenticated || defaultRedirect);
            return;
        }

        // Pour le middleware auth, on attend d'avoir chargé les données ET d'avoir vérifié que l'utilisateur n'est pas connecté
        if (middleware === "auth") {
            // Si pas de token ou erreur SWR, redirection vers login
            if (!token || swrError) {
                saveIntendedUrl();
                handleRedirect(loginUrl);
                return;
            }

            // Si on a un token mais pas d'utilisateur (après chargement), déconnexion
            if (!user && !isValidating) {
                logout();
                return;
            }
        }
    }, [
        isLoading,
        isValidating,
        swrError,
        middleware,
        redirectIfAuthenticated,
        handleRedirect,
        logout,
        user,
        token,
        loginUrl,
        defaultRedirect,
        saveIntendedUrl,
        getAndClearIntendedUrl
    ]);

    const loginUser = async ({
                                 setErrors,
                                 setStatus,
                                 ...props
                             }: {
        setErrors: (errors: AuthErrors) => void;
        setStatus: (status: string | null) => void;
    } & DataToLogin) => {
        setErrors({});
        setStatus(null);

        // Validations côté client avant d'envoyer la requête
        const validationErrors: AuthErrors = {};
        if (!props.email) {
            validationErrors.email = ["L'email est requis"];
        }
        if (!props.password) {
            validationErrors.password = ["Le mot de passe est requis"];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return false;
        }

        try {
            // Indication de chargement si nécessaire
            setStatus("loading");

            const response = await axios.post("/login", props);

            // Vérification détaillée de la réponse
            if (response.data && response.data.token) {
                // Stockage du token (sans le stringifier - il est déjà sous forme de chaîne)
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", response.data.token);
                }

                // Mise à jour de l'état et des en-têtes
                setToken(response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                // Mise à jour des données utilisateur
                await mutate();

                // Feedback positif si nécessaire
                setStatus("success");

                // Redirection
                const intendedUrl = getAndClearIntendedUrl();
                handleRedirect(intendedUrl || defaultRedirect);
                return true;
            } else if (response.data && response.data.status === "success" && !response.data.token) {
                // Cas où le login réussit mais sans token (rare, mais possible)
                setError("Authentification réussie mais aucun token reçu");
                setErrors({ message: ["Authentification réussie mais impossible de vous connecter. Contactez l'administrateur."] });
                return false;
            } else {
                // Réponse inattendue
                throw new Error("Format de réponse inattendu du serveur");
            }
        } catch (error: any) {
            // Réinitialisation du statut de chargement
            setStatus(null);

            if (error.response) {
                const { status, data } = error.response;

                // Erreurs de validation (formulaire)
                if (status === 422) {
                    setErrors(data.errors || {});
                }
                // Identifiants incorrects (401)
                else if (status === 401) {
                    setErrors({
                        message: [data.message || "Identifiants incorrects. Veuillez vérifier votre email et mot de passe."]
                    });
                }
                // Compte désactivé ou autre problème d'accès (403)
                else if (status === 403) {
                    setErrors({
                        message: [data.message || "Votre compte n'a pas accès à cette application."]
                    });
                }
                // Problème de serveur
                else if (status >= 500) {
                    setErrors({
                        message: ["Le serveur a rencontré un problème. Veuillez réessayer plus tard."]
                    });
                }
                // Autre message d'erreur du serveur
                else if (data?.message) {
                    setErrors({ message: [data.message] });
                }
                // Erreur inconnue
                else {
                    setError("Une erreur inattendue s'est produite.");
                    setErrors({ message: ["Une erreur inattendue s'est produite lors de la connexion."] });
                }
            } else if (error.request) {
                // Aucune réponse reçue du serveur
                setErrors({
                    message: ["Impossible de contacter le serveur. Veuillez vérifier votre connexion internet."]
                });
            } else {
                // Erreur pendant la création de la requête
                setError(error.message || "Une erreur inattendue s'est produite.");
                setErrors({ message: ["Erreur de connexion. Veuillez réessayer."] });
            }

            return false;
        }
    };

    const registerUser = async ({
                                    setErrors,
                                    ...props
                                }: {
        setErrors: (errors: AuthErrors) => void;
    } & UserData) => {
        setErrors({});

        try {
            const response = await axios.post("/register", props);

            if (response.data && response.data.token) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", response.data.token);
                }
                setToken(response.data.token);
                await mutate();

                const intendedUrl = getAndClearIntendedUrl();
                handleRedirect(intendedUrl || defaultRedirect);
                return true;
            } else {
                throw new Error("Token non reçu du serveur");
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else if (error.response?.data?.message) {
                // Gestion des messages d'erreur simples
                setErrors({ message: [error.response.data.message] });
            } else {
                setError("Une erreur inattendue s'est produite.");
                setErrors({ message: ["Une erreur inattendue s'est produite lors de l'inscription."] });
            }
            return false;
        }
    };

    return {
        loginUser,
        registerUser,
        token,
        user,
        logout,
        isLoading: isLoading || isValidating,
        error
    };
};
