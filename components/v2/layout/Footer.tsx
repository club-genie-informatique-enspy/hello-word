import Link from "next/link";
import { Github, Facebook, Instagram, Twitter, Linkedin, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* À propos */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">À propos</h3>
                        <p className="text-gray-300 mb-4">
                            Journal du Polytechnicien dédié aux actualités universitares et aux activités du campus.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://web.facebook.com/ClubGIND/">
                                <Button variant="link" className="text-white hover:text-[#FF9100]">
                                    <Facebook />
                                </Button>
                            </Link>
                            <Link href="https://x.com/club_info_enspy">
                                <Button variant="link" className="text-white hover:text-[#FF9100]">
                                    <Twitter />
                                </Button>
                            </Link>
                            <Link href="https://www.instagram.com/club_info_enspy/">
                                <Button variant="link" className="text-white hover:text-[#FF9100]">
                                    <Instagram />
                                </Button>
                            </Link>
                            <Link href="https://cm.linkedin.com/in/club-gi-enspy-1a919b29b">
                                <Button variant="link" className="text-white hover:text-[#FF9100]">
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
                                <Link href="/articles" className="text-gray-300 hover:text-[#FF9100]">
                                    Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-[#FF9100]">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-[#FF9100]">
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
                                <Link href="/v2" className="text-gray-300 hover:text-[#FF9100]">
                                    Technologie
                                </Link>
                            </li>
                            <li>
                                <Link href="/v2" className="text-gray-300 hover:text-[#FF9100]">
                                    Environnement
                                </Link>
                            </li>
                            <li>
                                <Link href="/v2" className="text-gray-300 hover:text-[#FF9100]">
                                    Business
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt w-5"></i>
                                <span>ENSPY, Yaoundé I</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone w-5"></i>
                                <span>+237 697 186 897</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope w-5"></i>
                                <span>clubinfoenspy@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bas de page */}
                <div className="flex flex-col md:flex-row md:justify-between border-t border-gray-700 mt-8 pt-8 w-full text-center gap-2">
                    <h6 className="text-gray-400">
                        © {new Date().getFullYear()} Journal Universitaire
                    </h6>
                    <h6 className="text-[#FF9100]">Hello-World. Le journal du pipo.</h6>
                    <h6 className="text-gray-400">
                        ClubGI. Tous droits réservés.
                    </h6>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
