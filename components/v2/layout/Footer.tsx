import Link from "next/link";
import { Github, Facebook, Instagram, Twitter, Linkedin, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* À propos */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">À propos</h3>
                        <p className="text-gray-600 mb-4">
                            Journal universitaire dédié aux actualités universitaires et aux activités du campus.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://web.facebook.com/ClubGIND/">
                                <Button variant="link">
                                    <Facebook />
                                </Button>
                            </Link>
                            <Link href="https://x.com/club_info_enspy">
                                <Button variant="link">
                                    <Twitter />
                                </Button>
                            </Link>
                            <Link href="https://www.instagram.com/club_info_enspy/">
                                <Button variant="link">
                                    <Instagram />
                                </Button>
                            </Link>
                            <Link href="https://cm.linkedin.com/in/club-gi-enspy-1a919b29b">
                                <Button variant="link">
                                    <Linkedin />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/articles" className="text-gray-600 hover:text-[#FF9100]">
                                    Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 hover:text-[#FF9100]">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-[#FF9100]">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-[#FF9100]">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Catégories */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Catégories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/articles?category=technology" className="text-gray-600 hover:text-[#FF9100]">
                                    Technologie
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles?category=environment" className="text-gray-600 hover:text-[#FF9100]">
                                    Environnement
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles?category=business" className="text-gray-600 hover:text-[#FF9100]">
                                    Business
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt w-5"></i>
                                <span>ENSPY, Yaoundé I</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone w-5"></i>
                                <span>+237 696 696 696</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope w-5"></i>
                                <span>clubgi@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bas de page */}
                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <h6 className="text-gray-600">
                        © {new Date().getFullYear()} Journal Universitaire <p className="text-[#FF9100]">Hello-World</p>. Tous droits réservés.
                    </h6>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
