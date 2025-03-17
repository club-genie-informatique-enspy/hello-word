'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, MessageCircle, Mail } from 'lucide-react';
import { getAllArticles } from '../lib/article';
import { Article } from "@/type"


const HomePage = () => {
    // État pour les articles
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [email, setEmail] = useState('');

    // État pour le carousel d'images du hero
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroImages = [
        '/images/hero1.jpeg',
        '/images/hero2.jpeg',
        '/images/hero3.jpeg',
        '/images/hero4.jpeg'
    ];

    // Référence pour le délai du carousel
    const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Rubriques populaires
    const topics = [
        {
            rubrique_uuid: 'b3752de8-c68b-4449-b5f5-a86c24fc5957',
            description: 'Tout ce qui touche à la vie sur le campus, les événements, les associations et plus.',
            titre: 'Vie sur le campus',
            image: '/vie.jpg'
        },
        {
            rubrique_uuid: '2cc88f73-773e-4314-959c-df7099b7b8bd',
            description: 'Les actualités sportives, les événements, les résultats et les compétitions.',
            titre: 'Sport',
            image: '/sport.jpg'
        },
        {
            rubrique_uuid: 'c5740c85-535c-40f3-97eb-ad59cb7c5f0e',
            description: 'Rubrique dédiée aux jeux vidéo, jeux de société et autres loisirs divers.',
            titre: 'Jeux et divers',
            image: '/divers.jpg'
        }
    ];

    // Récupération des articles
    useEffect(() => {
        async function fetchArticles() {
            try {
                const fetchedArticles = await getAllArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Erreur lors du chargement des articles:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticles();
    }, []);

    // Fonction pour le carousel du hero
    useEffect(() => {
        const startCarousel = () => {
            carouselTimerRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % heroImages.length);
            }, 5000);
        };

        startCarousel();

        return () => {
            if (carouselTimerRef.current) {
                clearInterval(carouselTimerRef.current);
            }
        };
    }, [heroImages.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        // Réinitialiser le minuteur
        if (carouselTimerRef.current) {
            clearInterval(carouselTimerRef.current);
        }
        carouselTimerRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroImages.length);
        }, 5000);
    };

    const getCategoryColor = (category: string): string => {
        const colors: { [key: string]: string } = {
            "9450301b-0408-480e-8fd3-14e03f22003d": 'bg-purple-100 text-purple-700',
            "0554fc53-4acf-42ac-bb9b-82c801c7b606": 'bg-green-100 text-green-700',
            "f12bae66-f1d7-4c40-b1d3-017ce4de1713": 'bg-blue-100 text-blue-700',
            "b3752de8-c68b-4449-b5f5-a86c24fc5957": 'bg-orange-100 text-orange-700',
            "2cc88f73-773e-4314-959c-df7099b7b8bd": 'bg-red-100 text-red-700',
            "c5740c85-535c-40f3-97eb-ad59cb7c5f0e": 'bg-indigo-100 text-indigo-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'abonnement à la newsletter
        alert(`Merci de vous être inscrit avec l'email: ${email}`);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section avec carousel d'images */}
            <section className="relative h-screen">
                {/* Carousel d'images en arrière plan */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${image})` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contenu du hero */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            L'information qui <span className="text-[#FF9100]">compte</span> pour vous
                        </h1>
                        <p className="text-xl text-white mb-8">
                            Votre source d'informations fiables et actuelles sur tous les sujets qui façonnent notre monde.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/v2/articles"
                                className="px-6 py-3 bg-[#FF9100] text-white rounded-md hover:bg-[orange-500] transition-colors inline-flex items-center justify-center font-medium"
                            >
                                Découvrir nos articles
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="#topics"
                                className="px-6 py-3 bg-white text-orange-600 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center font-medium"
                            >
                                Explorer les thématiques
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Indicateurs de slide */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                                index === currentSlide ? 'bg-[#FF9100]' : 'bg-white bg-opacity-50'
                            }`}
                            aria-label={`Aller à la diapositive ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Section À Propos / Présentation */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue sur le site du Hello-World</h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nous vous proposons une couverture complète de l'actualité du campus et celle du monde avec des analyses approfondies et des perspectives diverses.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Actualités Filtrées</h3>
                            <p className="text-gray-600">
                                Nous sélectionnons rigoureusement les informations pour vous offrir un contenu pertinent et vérifié.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Analyses Approfondies</h3>
                            <p className="text-gray-600">
                                Nos journalistes experts décryptent les événements pour vous donner les clés de compréhension essentielles.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Contenu Réactif</h3>
                            <p className="text-gray-600">
                                Restez informé en temps réel grâce à notre couverture des événements majeurs et des sujets d'actualité au sein de notre établissement et en dehors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des Thématiques/Rubriques */}
            <section id="topics" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos Thématiques</h2>
                            <div className="w-20 h-1 bg-orange-500 mb-4"></div>
                            <p className="text-gray-600 max-w-2xl">
                                Explorez nos différentes rubriques et découvrez des contenus adaptés à vos centres d'intérêt.
                            </p>
                        </div>
                        <Link
                            href="#"
                            className="mt-4 md:mt-0 inline-flex items-center text-[#FF9100] hover:text-orange-700 font-medium"
                        >
                            Voir toutes les rubriques
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topics.map((topic, index) => (
                            <div key={topic.rubrique_uuid} className="group">
                                <div className="relative overflow-hidden rounded-lg mb-4">
                                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all z-10"></div>
                                    <img
                                        src={topic.image}
                                        alt={topic.titre}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(topic.rubrique_uuid)}`}>
                                          Populaire
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-2">{topic.titre}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600">{topic.description}</p>
                                <Link
                                    href={`/rubrique/${topic.rubrique_uuid}`}
                                    className="inline-flex items-center mt-3 text-[#FF9100] hover:text-orange-700 font-medium"
                                >
                                    Explorer cette rubrique
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section des Articles Populaires */}
            <section id="articles" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Articles Populaires</h2>
                            <div className="w-20 h-1 bg-orange-500 mb-4"></div>
                            <p className="text-gray-600 max-w-2xl">
                                Découvrez nos articles les plus lus et commentés du moment.
                            </p>
                        </div>
                        <Link
                            href="/v2/articles"
                            className="mt-4 md:mt-0 px-6 py-3 bg-[#FF9100] text-white rounded-md hover:bg-orange-700 transition-colors inline-flex items-center justify-center font-medium"
                        >
                            Tous les articles
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Chargement des articles...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(() => {
                                // Limiter à 5 articles maximum
                                return articles.slice(0,5).map((article, index) => (
                                    <article
                                        key={article.article_uuid || index}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={article.image}
                                                alt={article.titre}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.rubrique_uuid)}`}>
                                                    Tendance
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-semibold text-lg mb-3 text-gray-800 hover:text-orange-600 transition-colors">
                                                <Link href={`/v2/details/${article.article_uuid}`}>
                                                    {article.titre}
                                                </Link>
                                            </h3>
                                            <div className="flex justify-between items-center text-sm">
                                                <div className="flex gap-4 text-gray-500">
                                                    <span className="flex items-center gap-1.5 group">
                                                      <Heart className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                                                        {article.likes}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 group">
                                                        <MessageCircle className="w-4 h-4 group-hover:text-blue-500 transition-colors" />{0}
                                                    </span>
                                                </div>
                                                <Link href={`/v2/details/${article.article_uuid}`}>
                                                    <span className="text-[#FF9100] hover:text-[orange-500] font-medium cursor-pointer">
                                                      Lire plus
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ));
                            })()}
                        </div>
                    )}
                </div>
            </section>

            {/* Section Statistiques */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Impact</h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Des chiffres qui parlent d'eux-mêmes et témoignent de la confiance que nos lecteurs nous accordent.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <p className="text-4xl font-bold text-gray-900 mb-2">1500+</p>
                                <p className="text-gray-600 text-center">Articles publiés</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <p className="text-4xl font-bold text-gray-900 mb-2">98+</p>
                                <p className="text-gray-600 text-center">Utilisateurs actifs</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-4xl font-bold text-gray-900 mb-2">5+</p>
                                <p className="text-gray-600 text-center">Activités créées</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-4xl font-bold text-gray-900 mb-2">1 an</p>
                                <p className="text-gray-600 text-center">D'expérience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Newsletter */}
            <section className="py-20 bg-[#FF9100]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Restez informé</h2>
                        <p className="text-white text-lg mb-8">
                            Abonnez-vous à notre newsletter pour recevoir les dernières actualités et ne rien manquer des événements importants.
                        </p>
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Votre adresse email"
                                    className="w-full pl-10 pr-4 py-3 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-orange-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                            >
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
