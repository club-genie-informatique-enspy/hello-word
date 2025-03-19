'use client';
import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Mail, MapPin, Clock, Send, ChevronRight, AlertCircle, CheckCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

// Définition des interfaces pour les types
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormStatus {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const ContactPage: React.FC = () => {
    // États pour gérer le formulaire
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Email de destination
    const recipientEmail: string = "clubinfoenspy@gmail.com";

    // État pour le statut du formulaire
    const [formStatus, setFormStatus] = useState<FormStatus>({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: ''
    });

    // Référence au formulaire pour EmailJS
    const form = useRef<HTMLFormElement>(null);

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gestion de l'envoi du formulaire avec EmailJS
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setFormStatus({ isSubmitting: true, isSuccess: false, isError: false, message: '' });

        try {
            // Vérifiez que emailjs est disponible
            if (typeof emailjs !== 'undefined' && form.current) {
                // Remplacez ces valeurs par vos identifiants EmailJS
                const serviceID: string = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
                const templateID: string = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
                const userID: string = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

                // Envoi du formulaire via EmailJS
                const result = await emailjs.sendForm(
                    serviceID,
                    templateID,
                    form.current,
                    userID
                );

                if (result.text === 'OK') {
                    setFormStatus({
                        isSubmitting: false,
                        isSuccess: true,
                        isError: false,
                        message: 'Votre message a été envoyé avec succès!'
                    });
                    setFormData({ name: '', email: '', subject: '', message: '' });
                } else {
                    throw new Error('Échec de l\'envoi du message');
                }
            } else {
                throw new Error('EmailJS n\'est pas disponible. Vérifiez que le script est bien chargé.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            setFormStatus({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                message: 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section avec image de fond */}
            <div className="relative bg-gradient-to-r from-black to-blue-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/images/hero3.jpeg"
                        alt="Journal de l'École"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="container mx-auto px-6 py-20 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold mb-4">Hello-World</h1>
                        <p className="text-xl text-white mb-8">Journal du pipo, par le pipo et pour le pipo</p>
                        <div className="flex space-x-4">
                            <a
                                href="#contact-form"
                                className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 flex items-center"
                            >
                                Nous Contacter
                                <ChevronRight size={18} className="ml-2" />
                            </a>
                            <a
                                href="/v2/articles"
                                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition duration-300"
                            >
                                Voir nos articles
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-6">
                {/* En-tête avec effet de soulignement */}
                <div className="text-center mt-16 mb-12">
                    <h1 className="text-4xl font-bold text-[#FF9100] mb-3 relative inline-block group">
                        Contactez-Nous
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF9100] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nous sommes à votre écoute pour toute question, suggestion ou collaboration
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Colonne d'informations */}
                    <div className="space-y-8">
                        {/* Section À Propos avec carte moderne */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center">
                                <span className="w-8 h-1 bg-[#FF9100] mr-3"></span>
                                À Propos de Nous
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Le Journal de l'École est une publication créée par et pour les élèves.
                                Notre mission est de tenir informée la communauté scolaire des événements,
                                actualités et succès de notre établissement tout en offrant une plateforme
                                d'expression aux élèves.
                            </p>
                        </div>

                        {/* Section Mission avec design moderne */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="w-8 h-1 bg-[#FF9100] mr-3"></span>
                                Notre Mission
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    Fournir une information fiable
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    Encourager la créativité
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    Promouvoir le dialogue
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    Développer l'esprit critique
                                </li>
                            </ul>
                        </div>

                        {/* Section Équipe avec effet de profondeur */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="w-8 h-1 bg-[#FF9100] mr-3"></span>
                                Notre Équipe
                            </h2>
                            <p className="leading-relaxed">
                                Notre équipe est composée d'élèves passionnés par le journalisme,
                                l'écriture et la communication. Chaque membre apporte sa perspective
                                unique pour enrichir notre contenu.
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-[#FF9100]">Rédaction</p>
                                    <p className="text-sm text-gray-600">Nos rédacteurs créent du contenu engageant</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-[#FF9100]">Photographie</p>
                                    <p className="text-sm text-gray-600">Nos photographes capturent des moments clés</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-[#FF9100]">Mise en page</p>
                                    <p className="text-sm text-gray-600">Notre équipe design crée des visuels attractifs</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-[#FF9100]">Digital</p>
                                    <p className="text-sm text-gray-600">Notre équipe web gère notre présence en ligne</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonne du formulaire */}
                    <div>
                        <form ref={form} id="contact-form" className="bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {formStatus.isSuccess && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center mb-4">
                                        <CheckCircle size={20} className="mr-2" />
                                        <p>{formStatus.message}</p>
                                    </div>
                                )}

                                {formStatus.isError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center mb-4">
                                        <AlertCircle size={20} className="mr-2" />
                                        <p>{formStatus.message}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                                        Nom et Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="user_name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF9100] focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="user_email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF9100] focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF9100] focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF9100] focus:border-transparent transition duration-200"
                                        required
                                    ></textarea>
                                </div>

                                {/* Champ caché pour l'email de destination */}
                                <input type="hidden" name="to_email" value={recipientEmail} />

                                <button
                                    type="submit"
                                    disabled={formStatus.isSubmitting}
                                    className={`w-full bg-[#FF9100] text-white py-4 px-6 rounded-lg hover:bg-orange-500 transform hover:-translate-y-1 transition duration-200 flex items-center justify-center space-x-2 ${formStatus.isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {formStatus.isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            <span>Envoi en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Envoyer</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Informations de contact avec icônes */}
                        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Autres Moyens de Nous Contacter
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 text-gray-600">
                                    <Mail className="text-[#FF9100] mt-1 flex-shrink-0" size={20} />
                                    <p>clubinfoenspy@gmail.com</p>
                                </div>
                                <div className="flex items-start space-x-3 text-gray-600">
                                    <MapPin className="text-[#FF9100] mt-1 flex-shrink-0" size={20} />
                                    <p>Local du journal : Melen, ENSPY</p>
                                </div>
                                <div className="flex items-start space-x-3 text-gray-600">
                                    <Clock className="text-[#FF9100] mt-1 flex-shrink-0" size={20} />
                                    <p>Sortie des versions Papiers : Toutes les deux semaines</p>
                                </div>
                            </div>

                            {/* Carte pour visualiser l'emplacement
                            <div className="mt-6 rounded-lg overflow-hidden shadow-md">
                                <img
                                    src="/api/placeholder/600/300"
                                    alt="Carte de localisation"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="bg-gray-50 p-3 text-center text-sm text-gray-600">
                                    Vous pouvez nous rendre visite durant les heures d'ouverture de l'école
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16 mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#FF9100] mb-3">
                            Questions Fréquentes
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Trouvez rapidement des réponses aux questions les plus posées
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Comment rejoindre l'équipe du journal?</h3>
                            <p className="text-gray-600">
                                Envoyez-nous un email ou passez directement à notre local. Nous recrutons régulièrement de nouveaux talents dans tous les domaines.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Comment proposer un sujet d'article?</h3>
                            <p className="text-gray-600">
                                Utilisez notre formulaire de contact ou envoyez-nous un email avec votre proposition détaillée.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Peut-on consulter les anciens numéros?</h3>
                            <p className="text-gray-600">
                                Oui, tous nos anciens numéros sont archivés et disponibles à la bibliothèque de l'école ou en version numérique sur notre site.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Comment devenir partenaire du journal?</h3>
                            <p className="text-gray-600">
                                Contactez-nous pour discuter des différentes possibilités de partenariat et de collaboration avec notre équipe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#FF9100] text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Prêt à nous contacter?</h2>
                    <p className="max-w-2xl text-white mx-auto mb-8">
                        N'hésitez pas à nous envoyer un message, nous vous répondrons dans les plus brefs délais.
                    </p>
                    <a
                        href="#contact-form"
                        className="bg-white text-orange-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 inline-flex items-center"
                    >
                        Contacter Maintenant
                        <ChevronRight size={18} className="ml-2" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
