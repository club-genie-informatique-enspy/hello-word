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
          if (error.response?.status !== 409) throw error;
          router.push("/verify-email");
        }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  // Initialisation du token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken ? JSON.parse(storedToken) : null);
      setIsLoading(false);
    }
  }, []);

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    await mutate(undefined);
    handleRedirect(loginUrl);
  }, [loginUrl, mutate, handleRedirect]);

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

    try {
      const response = await axios.post("/login", props);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      setToken(response.data.token);
      await mutate();

      const intendedUrl = getAndClearIntendedUrl();
      handleRedirect(intendedUrl || defaultRedirect);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
        throw error;
      }
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
      if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      setToken(response.data.token);
      await mutate();
      
      const intendedUrl = getAndClearIntendedUrl();
      handleRedirect(intendedUrl || defaultRedirect);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
        throw error;
      }
    }
  };


  return {
    loginUser,
    registerUser,
    token,
    user,
    logout,
    isLoading: isLoading || isValidating
  };
};