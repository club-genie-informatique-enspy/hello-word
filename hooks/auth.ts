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
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [error, setError] = useState<string | null>(null);

    const loginUser = async ({ setErrors, setStatus, ...props }: {
        setErrors: (errors: AuthErrors) => void;
        setStatus: (status: string | null) => void;
    } & DataToLogin) => {
        setErrors({});
        setStatus(null);

        try {
            const response = await axios.post('/login', props);
            console.log(response.data); // 
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('token', JSON.stringify(response.data.token));
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
            console.log(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        router.push('/');
    }, [router]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user && token) {
            router.push(redirectIfAuthenticated);
        }

        if (middleware === 'auth' && (!user || !token)) {
            router.push('/signin');
        }

        if (middleware === 'auth' && error) {
            logout();
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
