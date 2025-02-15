import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Users, FileText, Activity, Calendar } from 'lucide-react';

interface StatItem {
    label: string;
    value: number;
    icon: React.ReactNode;
    suffix?: string;
}

interface AnimatedCounterProps {
    duration?: number; // Durée de l'animation en ms
    stats?: {
        articles: number;
        users: number;
        activities: number;
        years: number;
    };
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
                                                             duration = 2000,
                                                             stats = {
                                                                 articles: 1500,
                                                                 users: 25000,
                                                                 activities: 3200,
                                                                 years: 5
                                                             }
                                                         }) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const [counts, setCounts] = useState({
        articles: 0,
        users: 0,
        activities: 0,
        years: 0
    });

    const animationFrameRef = useRef<number>();
    const startTimeRef = useRef<number>();

    const statItems: StatItem[] = [
        {
            label: "Articles publiés",
            value: stats.articles,
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            suffix: "+"
        },
        {
            label: "Utilisateurs actifs",
            value: stats.users,
            icon: <Users className="w-8 h-8 text-green-500" />,
            suffix: "+"
        },
        {
            label: "Activités créées",
            value: stats.activities,
            icon: <Activity className="w-8 h-8 text-purple-500" />,
            suffix: "+"
        },
        {
            label: "Années d'expérience",
            value: stats.years,
            icon: <Calendar className="w-8 h-8 text-orange-500" />,
            suffix: "ans"
        }
    ];

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const progress = timestamp - startTimeRef.current;
        const percentage = Math.min(progress / duration, 1);

        // Fonction d'easing pour une animation plus naturelle
        const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
        const easeValue = easeOutQuart(percentage);

        setCounts({
            articles: Math.floor(easeValue * stats.articles),
            users: Math.floor(easeValue * stats.users),
            activities: Math.floor(easeValue * stats.activities),
            years: Math.floor(easeValue * stats.years)
        });

        if (progress < duration) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (inView) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [inView]);

    return (
        <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Nos chiffres clés
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Découvrez l'impact de notre plateforme à travers nos statistiques
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                 style={{ color: ['#3B82F6', '#22C55E', '#A855F7', '#F97316'][index] }}
                            />

                            <div className="flex flex-col items-center">
                                <div className="mb-4 p-3 rounded-full bg-gray-50 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>

                                <div className="relative text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tabular-nums">
                                    {formatNumber(counts[Object.keys(counts)[index] as keyof typeof counts])}
                                    <span className="text-gray-500 ml-1">{item.suffix}</span>
                                </div>

                                <p className="text-gray-600 text-center font-medium">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnimatedCounter;
