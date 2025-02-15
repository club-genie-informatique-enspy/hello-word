import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { redirect } from "next/navigation";
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const { data: session } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isProfileOpen) setIsProfileOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/v2" className="flex-shrink-0">
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
                        <Link href="/v2" className="text-gray-700 hover:text-[#FF9100] transition-colors">
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
                        

                        {/* Profile/Sign in Button - Desktop */}
                        {session ? (
                            <div className="relative">
                                <button
                                    onClick={toggleProfileMenu}
                                    className="flex items-center gap-2 focus:outline-none"
                                >
                                    <Image
                                        src={session.user?.image || '/placeholder-avatar.png'}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                                        <Link
                                            href="/v2/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => redirect('/register')}
                                className="bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                            >
                                Sign in
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
                            <Link
                                href="/v2/articles"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/v2/activities"
                                className="text-gray-700 hover:text-[#FF9100] py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Activités
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

                            {/* Profile/Sign in Button - Mobile */}
                            {session ? (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-3 px-2 py-2">
                                        <Image
                                            src={session.user?.image || '/placeholder-avatar.png'}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full"
                                            width={32}
                                            height={32}
                                        />
                                        <span className="text-gray-700">{session.user?.name}</span>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="block px-2 py-2 text-gray-700 hover:text-[#FF9100] transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-2 py-2 text-gray-700 hover:text-[#FF9100] transition-colors"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        redirect('/register');
                                    }}
                                    className="w-full bg-[#FF9100] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
