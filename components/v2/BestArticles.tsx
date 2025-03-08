import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import { redirect } from "next/navigation";
import Link from 'next/link';


interface BestArticlesProps {
    articles: Article[];
    autoScrollInterval?: number; // Durée en ms entre chaque défilement
}

const BestArticles: React.FC<BestArticlesProps> = ({
                                                       articles,
                                                       autoScrollInterval = 3000 // Valeur par défaut: 3 secondes
                                                   }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

    const checkScroll = (): void => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scroll = (direction: 'left' | 'right'): void => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -300 : 300;

            // Si on atteint la fin, retour au début
            if (direction === 'right' && scrollLeft + clientWidth + scrollAmount > scrollWidth) {
                scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else if (direction === 'left' && scrollLeft + scrollAmount < 0) {
                scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Configuration du défilement automatique
    const startAutoScroll = () => {
        if (autoScrollTimerRef.current) {
            clearInterval(autoScrollTimerRef.current);
        }

        autoScrollTimerRef.current = setInterval(() => {
            if (!isPaused) {
                scroll('right');
            }
        }, autoScrollInterval);
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            checkScroll();

            startAutoScroll();

            return () => {
                currentRef.removeEventListener('scroll', checkScroll);
                if (autoScrollTimerRef.current) {
                    clearInterval(autoScrollTimerRef.current);
                }
            };
        }
    }, [isPaused, autoScrollInterval]);

    const getCategoryColor = (category: string): string => {
        const colors: { [key: string]: string } = {
            "9450301b-0408-480e-8fd3-14e03f22003d" : 'bg-purple-100 text-purple-700',
            "0554fc53-4acf-42ac-bb9b-82c801c7b606": 'bg-green-100 text-green-700',
            "f12bae66-f1d7-4c40-b1d3-017ce4de1713": 'bg-blue-100 text-blue-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
        <section className="bg-gray-100 px-4 sm:px-8 py-8 sm:py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
                        Best Article Today
                    </h2>
                    <button
                        className="px-6 py-3 bg-white text-orange-500 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
                        onClick={() => redirect('/v2/articles')}
                    >
                        See All Articles
                    </button>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-orange-500" />
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {articles.map((article, index) => (
                            <article
                                key={index}
                                className="min-w-[280px] sm:min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.titre}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.rubrique_uuid)}`}>
                                            Inedit
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="font-semibold text-lg mb-4 text-gray-800 line-clamp-2 hover:line-clamp-none transition-all">
                                        {article.titre}
                                    </h3>
                                    <div className="flex justify-between justify-self-bottom items-center text-sm">
                                        <div className="flex gap-4 text-gray-500">
                                            <span className="flex items-center gap-1.5 group">
                                                <Heart className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                                                {article.likes}
                                            </span>
                                            <span className="flex items-center gap-1.5 group">
                                                <MessageCircle className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                                                {0}
                                            </span>
                                        </div>
                                        <Link href={`/v2/details/${article.article_uuid}`}>
                                            <button className="text-orange-500 hover:text-blue-700 font-medium focus:outline-none focus:underline">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {showRightArrow && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-orange-500" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BestArticles;
