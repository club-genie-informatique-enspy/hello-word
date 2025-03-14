'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getArticle } from '@/app/lib/article';
import ShareArticle from '@/components/ShareArticle';
import { Toaster } from 'react-hot-toast'; // Pour les notifications
import SidebarDetails from '@/components/SidebarDetails';


export default function BlogPage() {

  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        const data :Article = await getArticle(article_uuid as string);
        setPost(data);
      } catch (err:any) {
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


  if (!post) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mt-8 md:mt-16 mx-auto px-4 sm:px-6">
      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Main Content */}
      <div className="md:mt-0 mt-20 flex flex-col lg:flex-row gap-8">
        {/* Article section - full width on mobile, 9/12 on desktop */}
        <article className="w-full lg:w-3/4 order-1 lg:order-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                  <p className="font-medium">{post.auteur}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Follow</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Composant de partage */}
                <ShareArticle article={post} />
                <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {post.titre}
            </h1>
            
            <div className="text-xs sm:text-sm text-gray-500 mb-6">
              <p>PUBLISHED {formatDate(post.created_at)} UPDATED {formatDate(post.updated_at)}</p>
            </div>

            {/* Main article image */}
            <div className="mb-6">
              <img 
                src={post.image}
                alt={post.titre} 
                className="w-full max-w-full rounded-lg"
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {post.slogan}
              </p>
            </div>

            {/* Article content */}
            <div 
              className="prose prose-base sm:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contenu }}
            />
          </div>
          
          {/* Ajout d'une section de partage en bas de l'article */}
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-medium mb-3">Vous avez aimé cet article ? Partagez-le !</p>
              <div className="flex space-x-4">
                <ShareArticle article={post} />
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar - pleine largeur sur mobile, 1/4 sur desktop, réorganisée au début sur mobile */}
        <aside className="w-full lg:w-1/4 order-2 lg:order-1">
          <SidebarDetails />
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-sm text-gray-500">
        © 2025 Hello World. All rights reserved.
      </footer>
    </div>
  );
}