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
    email_verified_at?: string | null;
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

    // Initialisation du token depuis localStorage - SIMPLIFIÉ
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // Pas de tentative de parsing JSON
                setToken(storedToken);
            }
            setIsLoading(false);
        }
    }, []);

    // Configuration de l'en-tête d'authentification pour axios
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Token configuré dans les headers:', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            console.log('Headers d\'autorisation supprimés');
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

    const resendEmailVerification = async ({ setStatus }: { setStatus: (status: string | null) => void }) => {
        setStatus('loading');
        
        try {
            await axios.post('/email/verification-notification');
            setStatus('success');
            return true;
        } catch (error: any) {
            console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
            setStatus('error');
            return false;
        }
    };
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
            // Indication de chargement
            setStatus("Connexion en cours...");

            console.log('Envoi de la requête de connexion:', {
                email: props.email,
                password: '***********' // Ne jamais logger les vrais mots de passe
            });

            const response = await axios.post("/login", props);
            console.log('Réponse de la requête de connexion:', response.data);

            // Vérification détaillée de la réponse
            if (response.data && response.data.token) {
                // Stockage du token sans JSON.stringify
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", response.data.token);
                }

                // Mise à jour de l'état et des en-têtes
                setToken(response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                // Mise à jour des données utilisateur
                await mutate();

                // Feedback positif
                setStatus("Connexion réussie");

                if (response.data.user && !response.data.user.email_verified_at) {
                    handleRedirect('/verify-email');
                    return true;
                }

                // Redirection après un court délai pour permettre de voir le message
                setTimeout(() => {
                    const intendedUrl = getAndClearIntendedUrl();
                    handleRedirect(intendedUrl || defaultRedirect);
                }, 2000);

                return true;
            } else if (response.data && response.data.status === "success" && !response.data.token) {
                setError("Authentification réussie mais aucun token reçu");
                setErrors({ message: ["Authentification réussie mais impossible de vous connecter. Contactez l'administrateur."] });
                return false;
            } else {
                throw new Error("Format de réponse inattendu du serveur");
            }
        } catch (error: any) {
            console.error('Erreur lors de la connexion:', error);

            // Réinitialisation du statut de chargement
            setStatus(null);

            if (error.response) {
                const { status, data } = error.response;
                console.log(`Erreur de connexion (${status}):`, data);

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
            // Cela évite tout traitement particulier du token
            const response = await axios({
                method: 'post',
                url: '/register',
                data: props,
                headers: {
                    'X-API-KEY': 'HfJcYj7AGYPHqS9x5eRub5XRK9zJFpEthdBl5ShvyJyBEStJnsGTFmEFyInY76G7',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Réponse de la requête d\'inscription:', response.data);

            if (response.data && response.data.token) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", response.data.token);
                }
                setToken(response.data.token);
                await mutate();

                handleRedirect('/verify-email');
                return true;
            } else {
                if (response.status === 200 || response.status === 201) {
                    return true;
                }
                throw new Error("Échec de l'inscription");
            }
        } catch (error: any) {
            console.error('Erreur lors de l\'inscription:', error);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else if (error.response?.data?.message) {
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
        resendEmailVerification,
        logout,
        isLoading: isLoading || isValidating,
        error
    };
};
