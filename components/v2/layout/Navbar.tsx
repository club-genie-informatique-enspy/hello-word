import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { redirect, usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {user, logout, isLoading} = useAuth();
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (!isLoading) {
            setIsMobileMenuOpen(false);
        }
    }, [user, isLoading]);

    // Fonction pour rediriger vers la page de connexion
    const handleSignIn = () => {
        redirect('/login');
    };

    // Fonction pour gérer la déconnexion
    const handleLogout = async () => {
        await logout();
        redirect('/');
    };

    // Fonction pour générer les initiales de l'utilisateur
    const getUserInitials = () => {
        if (!user || !user.name) return '?';
        const nameParts = user.name.split(' ');
        if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    };

    // Fonction pour obtenir une couleur de fond basée sur le nom d'utilisateur
    const getAvatarBgColor = () => {
        if (!user || !user.name) return 'bg-gray-400';

        // Liste de couleurs pour les avatars
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500',
            'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500',
            'bg-red-500', 'bg-teal-500'
        ];

        // Utiliser la somme des codes de caractères du nom pour sélectionner une couleur
        const charSum = user.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return colors[charSum % colors.length];
    };

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }

        // Cas spécial pour les articles
        if (path === '/v2/articles') {
            return pathname === '/v2/articles' || pathname.startsWith('/v2/details');
        }

        // Pour les autres liens
        return pathname.startsWith(path);
    };

    // Classe CSS pour les liens actifs
    const activeLinkClass = "text-[#FF9100] font-medium";
    const normalLinkClass = "text-gray-700 hover:text-[#FF9100] transition-colors";

    return (
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="relative w-32 h-12 md:w-40 md:h-16">
                            <Image
                                alt="Logo"
                                src="/images/logo-light-2.png"
                                fill
                                priority
                                className="object-contain transform scale-110"
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={isLinkActive('/') ? activeLinkClass : normalLinkClass}>
                            Accueil
                        </Link>
                        <Link href="/v2/articles" className={isLinkActive('/v2/articles') ? activeLinkClass : normalLinkClass}>
                            Articles
                        </Link>
                        <Link href="/v2/cliches" className={isLinkActive('/v2/cliches') ? activeLinkClass : normalLinkClass}>
                            Cliches
                        </Link>
                        <Link href="/v2/about" className={isLinkActive('/v2/about') ? activeLinkClass : normalLinkClass}>
                            À propos
                        </Link>

                        {/* Afficher l'avatar ou le bouton de connexion selon l'état d'authentification */}
                        {isLoading ? (
                            // État de chargement
                            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                        ) : user ? (
                            // Utilisateur connecté - Afficher l'avatar avec menu déroulant
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <div className={`w-10 h-10 ${getAvatarBgColor()} rounded-full flex items-center justify-center text-white font-medium cursor-pointer`}>
                                        {getUserInitials()}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="p-2 text-sm font-medium text-gray-700">
                                        Bonjour, {user.name}
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => redirect('/v2/profile')} className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Déconnexion</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            // Utilisateur non connecté - Afficher le bouton de connexion
                            <button
                                onClick={handleSignIn}
                                className="bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                            >
                                Se connecter
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white py-4 border-t">
                        <div className="flex flex-col space-y-4 px-4">
                            {/* Si l'utilisateur est connecté, afficher ses informations en haut du menu mobile */}
                            {!isLoading && user && (
                                <Link href="/v2/profile">
                                    <div className="flex items-center space-x-3 py-3 border-b">
                                        <div className={`w-10 h-10 ${getAvatarBgColor()} rounded-full flex items-center justify-center text-white font-medium`}>
                                            {getUserInitials()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <Link
                                href="/"
                                className={`py-2 transition-colors ${isLinkActive('/') ? activeLinkClass : normalLinkClass}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/v2/articles"
                                className={`py-2 transition-colors ${isLinkActive('/v2/articles') ? activeLinkClass : normalLinkClass}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/v2/cliches"
                                className={`py-2 transition-colors ${isLinkActive('/v2/cliches') ? activeLinkClass : normalLinkClass}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Cliches
                            </Link>
                            <Link
                                href="/v2/about"
                                className={`py-2 transition-colors ${isLinkActive('/v2/about') ? activeLinkClass : normalLinkClass}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                À propos
                            </Link>

                            {/* Bouton de connexion ou déconnexion selon l'état d'authentification */}
                            {!isLoading && user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Déconnexion</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleSignIn}
                                    className="w-full bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    Se connecter
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
