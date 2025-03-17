import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import { redirect, usePathname } from "next/navigation";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

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

    const handleSignIn = () => {
        redirect('/login');
    }

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

                        {/* Toujours afficher le bouton Sign in, même si l'utilisateur est connecté */}
                        <button
                            onClick={handleSignIn}
                            className="bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            Sign in
                        </button>
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
                            <Link
                                href="/v2/contact"
                                className={`py-2 transition-colors ${isLinkActive('/v2/contact') ? activeLinkClass : normalLinkClass}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>

                            {/* Toujours afficher le bouton Sign in dans le menu mobile */}
                            <button
                                onClick={handleSignIn}
                                className="w-full bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
