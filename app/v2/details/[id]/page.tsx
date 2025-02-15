'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getArticle } from '@/app/lib/article';

export default function BlogPage() {

  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // console.log("PARAMS",params.id);
  const article_uuid = params.id;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    };
  
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  };
  

  useEffect(() => {

    const fetchArticle = async () => {
      try {
        const data = await getArticle(article_uuid);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (article_uuid) {
      fetchArticle();
    }
  }, [article_uuid]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

      console.log(post)

  if (!post) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mt-16 mx-auto p-4">

    {/* Main Content */}
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar */}
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

        {/* Recommended Articles */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div>
                <p className="text-sm font-medium">The market for investment in Central Asia</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>John D.</span>
                  <span className="mx-2">•</span>
                  <span>Read more</span>
                </div>
              </div>
            </div>
          </div>
          {/* More recommended articles... */}
        </div>

        {/* Trending Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Trending</h2>
          <div className="space-y-4">
            {/* Trending items */}
          </div>
        </div>

        {/* Topics */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recommended topics</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Vie campus</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Regard sur le monde</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Future</span>
          </div>
        </div>
      </div>

      {/* Main Article */}
      <article className="col-span-9">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div>
                <p className="font-medium">Joana Marie Jones</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Follow</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Link href="#" className="text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                {/* Add other social media icons */}
              </div>
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {post.titre}
          </h1>
          
          <div className="text-sm text-gray-500 mb-6">
          <p>PUBLISHED {formatDate(post.created_at)} UPDATED {formatDate(post.updated_at)}
          </p>
          </div>

          {/* Main article image */}
          <div className="mb-6">
            <img 
              src={post.image}
              alt="Neuralink logo" 
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              Neuralink logo displayed on a phone screen, a silhouette of a human face and a binary code
              displayed on a screen are seen in this multiple exposure illustration photo taken in Krakow, Poland on December 10, 2021.
            </p>
          </div>

          {/* Article content */}
          <div className="prose max-w-none">
            <p>
              Elon Musk shows off updates to his brain chips and says he's going to install
              one in himself when they are ready. Elon Musk's health tech venture Neuralink
              shared updates to its brain-implant technology during a "show and tell"
              recruitment event Wednesday night. Musk said during the event that he plans
              to get one of the implants himself.
            </p>
            {/* Add more paragraphs */}
          </div>
        </div>
      </article>
    </div>

    {/* Footer */}
    <footer className="mt-12 py-4 text-center text-sm text-gray-500">
      © 2022 RiseBlog. All rights reserved
    </footer>
  </div>
  );
}
