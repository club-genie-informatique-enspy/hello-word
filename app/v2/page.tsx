// app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft, ArrowRight, Search } from 'lucide-react';

const topics = [
  {
    title: 'Technology',
    image: '/api/placeholder/400/600',
    color: 'bg-blue-900'
  },
  {
    title: 'Environment',
    image: '/api/placeholder/400/600',
    color: 'bg-green-700'
  },
  {
    title: 'Business',
    image: '/api/placeholder/400/600',
    color: 'bg-gray-800'
  }
];

const articles = [
  {
    title: 'Elon Musk shows off updates to his brain chips',
    image: '/api/placeholder/400/400',
    likes: 32,
    comments: 12,
    category: 'Technology'
  },
  {
    title: 'The overlooked benefits of real Christmas trees',
    image: '/api/placeholder/400/400',
    likes: 41,
    comments: 23,
    category: 'Environment'
  },
  {
    title: 'The law comes for Bankman-Fried',
    image: '/api/placeholder/400/400',
    likes: 34,
    comments: 24,
    category: 'Business'
  },
  {
    title: 'Bank of England warns UK housing market',
    image: '/api/placeholder/400/400',
    likes: 22,
    comments: 15,
    category: 'Business'
  }
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="px-8 py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold leading-tight mb-8">
            Find Your<br />
            Best<br />
            <span className="text-blue-600">Article</span><br />
            Topics here
          </h1>

          {/* Topic Cards */}
          <div className="flex gap-6 mb-8">
            {topics.map((topic, index) => (
              <div key={index} className="relative w-72 h-96 rounded-3xl overflow-hidden group">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className={`absolute inset-0 opacity-60 ${topic.color}`} />
                <div className="absolute bottom-6 left-6 text-white text-xl font-semibold">
                  {topic.title}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button className="p-2 border rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </button>
            <button className="p-2 border rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20" />
      </section>

      {/* Best Articles Section */}
      <section className="bg-blue-600 px-8 py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">
              Best<br />
              Article<br />
              Today
            </h2>
            <Link 
              href="/articles" 
              className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              See All Articles
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8">
            {articles.map((article, index) => (
              <div 
                key={index}
                className="min-w-[300px] bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-4">{article.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex gap-4">
                      <span>{article.likes} ❤️</span>
                      <span>{article.comments} 💬</span>
                    </div>
                    <button className="text-blue-600">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-40 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute bottom-40 right-60 w-60 h-60 border-4 border-white rounded-full" />
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="px-8 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Subscribe</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and get upto 40% off on our exclusive service.
            </p>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 px-6 py-3 rounded-l-full border focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="px-8 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Decorative Shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 border-8 border-blue-600 rounded-full opacity-10" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-8 border-blue-600 rounded-full opacity-10" />
        </div>
      </section>
    </div>
  );
}