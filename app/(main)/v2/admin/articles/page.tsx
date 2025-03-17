"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import Head from 'next/head';
import { Button } from '@/components/ui/button';

interface Article {
  id: number;
  article_uuid?: string;
  titre: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

const ArticlesListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchArticles();
  }, []);
  
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get( process.env.NEXT_PUBLIC_API_BASE_URL+'/articles/my');
      setArticles(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteArticle = async (article_uuid: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await axios.delete( process.env.NEXT_PUBLIC_API_BASE_URL+`/articles/${article_uuid}`);
        fetchArticles();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Gestion des articles</title>
      </Head>
      
      <div className="container mx-auto py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes articles</h1>
          <Link href="/v2/admin/articles/editor/new">
            <Button>Nouvel article</Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {articles.map((article) => (
                <li key={article.article_uuid}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{article.titre}</h3>
                      <div className="mt-1 flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          article.status === 'published' 
                          ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800' 
                        }`}>
                          {article.status === 'published' ? 'Brouillon' : 'Publié'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          Modifié le {new Date(article.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                    <Link href={`/v2/admin/articles/editor/${article.article_uuid}`}>
                        <Button variant="outline" size="sm">Modifier</Button>
                    </Link>
                    <Link href={`/v2/admin/articles/preview/${article.article_uuid}`}>
                        <Button variant="secondary" size="sm">Visualiser</Button>
                    </Link>
                    <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteArticle(article.article_uuid||'')}
                    >
                        Supprimer
                    </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white p-6 text-center rounded-md shadow">
            <p className="text-gray-500">Vous n'avez pas encore d'articles.</p>
            <Link href="/v2/admin/articles/editor/new" className="mt-4 inline-block">
              <Button>Créer votre premier article</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlesListPage;