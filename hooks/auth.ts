"use client";
import axios from '@/lib/axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthProps {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface AuthErrors {
    [key: string]: string[];
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Initialiser l'état côté client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            setUser(storedUser ? JSON.parse(storedUser) : null);
            setToken(storedToken ? JSON.parse(storedToken) : null);
        }
    }, []);

    const loginUser = async ({ setErrors, setStatus, ...props }: {
        setErrors: (errors: AuthErrors) => void;
        setStatus: (status: string | null) => void;
    } & DataToLogin) => {
        setErrors({});
        setStatus(null);

        try {
            const response = await axios.post('/login', props);
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }
            setUser(response.data);
            setToken(response.data.token);
            router.push('/');
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred.');
                throw error;
            }
        }
    };

    const registerUser = async ({ setErrors, ...props }: {
        setErrors: (errors: AuthErrors) => void;
    } & UserData) => {
        setErrors({});

        try {
            const response = await axios.post('/register', props);
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }
            setUser(response.data);
            setToken(response.data.token);
            router.push('/');
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred.');
                throw error;
            }
        }
    };

    const logout = useCallback(async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        setUser(null);
        setToken(null);
        router.push('/');
    }, [router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (middleware === 'guest' && redirectIfAuthenticated && user && token) {
                router.push(redirectIfAuthenticated);
            }

            if (middleware === 'auth' && (!user || !token)) {
                router.push('/signin');
            }

            if (middleware === 'auth' && error) {
                logout();
            }
        }
    }, [error, middleware, redirectIfAuthenticated, router, logout, user, token]);

    return {
        loginUser,
        registerUser,
        token,
        user,
        logout,
    };
};