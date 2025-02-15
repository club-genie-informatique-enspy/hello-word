import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";

type Topic = {
    rubrique_uuid: string;
    titre: string;
    image: string;
    description: string;
};

const topics: Topic[] = [

    { rubrique_uuid: 'b3752de8-c68b-4449-b5f5-a86c24fc5957', 
        description: 'Tout ce qui touche à la vie sur le campus, les événements, les associations et plus.', 
        titre: 'Vie sur le campus', 
        image: '/vie.jpg'}
,
    { rubrique_uuid: '2cc88f73-773e-4314-959c-df7099b7b8bd', 
        description: 'Les actualités sportives, les événements, les résultats et les compétitions.', 
        titre: 'Sport', 
        image: '/sport.jpg'}
,
    {rubrique_uuid: 'c5740c85-535c-40f3-97eb-ad59cb7c5f0e', 
        description: 'Rubrique dédiée aux jeux vidéo, jeux de société et autres loisirs divers.', 
        titre: 'Jeux et divers', 
        image: '/divers.jpg'}

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
                    <div className="flex gap-4  items-center justify-center mt-2">
                        {topics.map((topic, index) => (
                            <div
                                key={topic.rubrique_uuid}
                                className={`relative sm:max-w-xs md:max-w-sm lg:w-40 lg:h-76 rounded-full overflow-hidden transition-all duration-500 ${
                                    index === currentIndex ? 'scale-105' : 'hidden lg:block scale-95 opacity-80'
                                }`}
                            >
                                <Image
                                    src={topic.image}
                                    alt={topic.titre}
                                    className="w-full h-full object-cover"
                                    width={800}
                                    height={600}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-center text-xl font-semibold">
                                        {topic.titre}
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
