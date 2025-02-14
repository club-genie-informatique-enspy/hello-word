'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MoreVertical } from 'lucide-react';
import {useParams} from "react-router-dom";

const articles = [
  { id: 1, title: "The overlooked benefits of real Christmas trees", excerpt: "The environmental pros and cons of Christmas trees...", image: "https://source.unsplash.com/400x320/?christmas-tree", author: { name: "Ray", avatar: "https://source.unsplash.com/32x32/?portrait" }, idrubrique: 2, likes: 41, comments: 23 },
  { id: 2, title: "How to reduce your carbon footprint in 2023", excerpt: "Simple changes in your daily life can make a big difference...", image: "https://source.unsplash.com/400x320/?nature", author: { name: "Alice", avatar: "https://source.unsplash.com/32x32/?face" }, idrubrique: 2, likes: 56, comments: 12 },
  { id: 3, title: "The rise of electric vehicles", excerpt: "Electric vehicles are becoming more popular...", image: "https://source.unsplash.com/400x320/?electric-car", author: { name: "John", avatar: "https://source.unsplash.com/32x32/?person" }, idrubrique: 1, likes: 78, comments: 34 },
  { id: 4, title: "Top 5 sustainable fashion brands", excerpt: "Discover the best fashion brands that are making an impact...", image: "https://source.unsplash.com/400x320/?fashion", author: { name: "Emma", avatar: "https://source.unsplash.com/32x32/?woman" }, idrubrique: 3, likes: 92, comments: 45 },
  { id: 5, title: "The future of renewable energy", excerpt: "How solar, wind, and other renewables shape the future...", image: "https://source.unsplash.com/400x320/?solar-panel", author: { name: "Mike", avatar: "https://source.unsplash.com/32x32/?man" }, idrubrique: 4, likes: 103, comments: 67 },
  { id: 6, title: "Why urban gardening is the next big thing", excerpt: "Urban gardening is not just a trend...", image: "https://source.unsplash.com/400x320/?garden", author: { name: "Sophia", avatar: "https://source.unsplash.com/32x32/?girl" }, idrubrique: 5, likes: 64, comments: 29 }
];

export default function BlogPage({params}) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const {id} = params;
  console.log(id);
  useEffect(() => {
    if (id) {
      const foundPost = articles.find((article) => article.id === Number(id));
      setPost(foundPost || null);
    }
  }, [id]);

      console.log(post)

  if (!post) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">For you</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search or share"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <article className="col-span-9">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Follow</span>
                  </div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">{post.excerpt}</p>

            <div className="mb-6">
              <img src={post.image} alt={post.title} className="w-full rounded-lg" />
            </div>

            <div className="prose max-w-none">
              <p>{post.contenu}</p>
            </div>
          </div>
        </article>
      </div>

      <footer className="mt-12 py-4 text-center text-sm text-gray-500">
        © 2024 RiseBlog. All rights reserved.
      </footer>
    </div>
  );
}
