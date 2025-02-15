// app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from "@/components/v2/layout/Footer";
import {Navbar} from "@/components/v2/layout/Navbar";
import TopicsCarousel from "@/components/TopicsCarousel";
import BestArticles from "@/components/v2/BestArticles";
import AnimatedCounter from "@/components/v2/AnimatedCounter"

const articles = [
  {
    title: 'Elon Musk shows off updates to his brain chips',
    image: '/images/code.png',
    likes: 32,
    comments: 12,
    category: 'Technology'
  },
  {
    title: 'The overlooked benefits of real Christmas trees',
      image: '/images/flore.png',
    likes: 41,
    comments: 23,
    category: 'Environment'
  },
  {
    title: 'The law comes for Bankman-Fried',
    image: '/images/code.png',
    likes: 34,
    comments: 24,
    category: 'Business'
  },
  {
    title: 'Bank of England warns UK housing market',
    image: '/images/business.png',
    likes: 22,
    comments: 15,
    category: 'Business'
  },
    {
        title: 'The overlooked benefits of real Christmas trees',
        image: '/images/flore.png',
        likes: 41,
        comments: 23,
        category: 'Environment'
    },
    {
        title: 'The law comes for Bankman-Fried',
        image: '/images/code.png',
        likes: 34,
        comments: 24,
        category: 'Business'
    },
    {
        title: 'Bank of England warns UK housing market',
        image: '/images/business.png',
        likes: 22,
        comments: 15,
        category: 'Business'
    }
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
          <TopicsCarousel />
      </section>

      {/* Best Articles Section */}
        <BestArticles
            articles={articles}
            autoScrollInterval={3000}
        />

        {/* Section Newsletter */}
        <section className="bg-[#FF9100] py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Restez informé</h2>
                <p className="text-white mb-8 max-w-2xl mx-auto">
                    Abonnez-vous à notre newsletter pour recevoir les dernières actualités
                    et ne rien manquer des événements importants.
                </p>
                <form className="max-w-md mx-auto flex gap-4">
                    <input
                        type="email"
                        placeholder="Votre adresse email"
                        className="flex-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-white"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-white text-[#FF9100] rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Inscrire
                    </button>
                </form>
            </div>
        </section>

        <AnimatedCounter
            duration={3000}
            stats={{
                articles: 1500,
                users: 98,
                activities: 5,
                years: 1
            }}
        />

      {/* Footer */}
      <Footer/>
    </div>
  );
}
