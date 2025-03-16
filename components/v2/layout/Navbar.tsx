import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import { redirect } from "next/navigation";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {user, logout, isLoading} = useAuth();

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
                        <Link href="/" className="text-gray-700 hover:text-[#FF9100] transition-colors">
                            Accueil
                        </Link>
                        <Link href="/v2/articles" className="text-gray-700 hover:text-[#FF9100] transition-colors">
                            Articles
                        </Link>
                        <Link href="/v2/messages" className="text-gray-700 hover:text-[#FF9100] transition-colors">
                            Crush Anonymes
                        </Link>
                        <Link href="/v2/about" className="text-gray-700 hover:text-[#FF9100] transition-colors">
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
                                href="/v2/articles"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/v2/messages"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Crush Anonymes
                            </Link>
                            <Link
                                href="/v2/about"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                À propos
                            </Link>
                            <Link
                                href="/v2/contact"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
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
