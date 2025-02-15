import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";

type Topic = {
    id: number;
    title: string;
    image: string;
    category: string;
};

const topics: Topic[] = [
    {
        id: 1,
        title: 'Technology',
        image: '/images/code.png',
        category: 'Technology'
    },
    {
        id: 2,
        title: 'Environment',
        image: '/images/flore.png',
        category: 'Environment'
    },
    {
        id: 3,
        title: 'Business',
        image: '/images/code.png',
        category: 'Business'
    }
];

const TopicsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === topics.length - 1 ? 0 : prevIndex + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === topics.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? topics.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full bg-white overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF9100] rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
            <div className="absolute top-5 right-20 w-24 h-8 bg-[#FF9100] rounded-full transform rotate-45 opacity-80"></div>
            <div className="absolute bottom-0 left-40 w-20 h-20 bg-[#FF9100] rounded-full opacity-80"></div>
            <div className="absolute bottom-40 left-[400px] w-20 h-20 bg-[#FF9100] rounded-full opacity-80"></div>
            <div className="absolute top-96 right-0 w-32 h-8 bg-[#FF9100] rounded-full transform -rotate-45 opacity-80"></div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center lg:justify-between">
                {/* Header Text */}
                <div className="mb-8 max-w-6xl text-center lg:text-left">
                    <h1 className="text-4xl md:text-7xl font-bold mb-2 text-black">
                        Find Your <br/>
                        Best <br/>
                        <span className="text-[#FF9100]">Article</span> <br/>
                        Topics here
                    </h1>
                </div>

                {/* Carousel */}
                <div className="relative w-full lg:max-w-4xl overflow-hidden">
                    <div className="flex gap-4 items-center justify-center mt-2">
                        {topics.map((topic, index) => (
                            <div
                                key={topic.id}
                                className={`relative w-full sm:max-w-xs md:max-w-sm lg:w-40 lg:h-76 rounded-full overflow-hidden transition-all duration-500 ${
                                    index === currentIndex ? 'scale-105' : 'hidden lg:block scale-95 opacity-80'
                                }`}
                            >
                                <Image
                                    src={topic.image}
                                    alt={topic.title}
                                    className="w-full h-full object-cover"
                                    width={800}
                                    height={600}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-center text-xl font-semibold">
                                        {topic.category}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8 lg:mt-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6"/>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicsCarousel;
