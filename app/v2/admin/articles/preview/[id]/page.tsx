'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';

// Configuration de l'URL de base de l'API
axios.defaults.baseURL =  process.env.NEXT_PUBLIC_API_BASE_URL;
import Image from 'next/image';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface ArticleData {
  id: number;
  title: string;
  contenu: string;
  image: string | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
}

const ArticlePreviewPage: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      fetchArticle(id as string);
    }
  }, [id]);
  
  const fetchArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/articles/${articleId}`);
      setArticle(response.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement de l\'article:', err);
      setError('Impossible de charger l\'article. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const publishArticle = async () => {
    if (!article) return;
    
    try {
      await axios.put(`/articles/${article.id}`, {
        ...article,
        status: 'published'
      });
      
      // Rafraîchir l'article pour mettre à jour son statut
      fetchArticle(article.id.toString());
      
      // Afficher une notification de réussite
      alert('Article publié avec succès!');
    } catch (err) {
      console.error('Erreur lors de la publication:', err);
      alert('Erreur lors de la publication de l\'article');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Article non trouvé"}
        </div>
      </div>
    );
  }

  // Formater la date de publication
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <>
      <Head>
        <title>{article.title} - Prévisualisation</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <div className="container mx-auto py-8 px-4 mt-16 max-w-4xl">
        {/* Barre d'actions administratives */}
        <Card className="mb-8 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Mode prévisualisation</h2>
                <p className="text-sm text-gray-500">
                  Statut: <span className={`px-2 py-1 text-xs rounded-full ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Link href={`/v2/admin/articles/${article.article_uuid}/edit`}>
                  <Button variant="outline">Modifier</Button>
                </Link>
                
                {article.status === 'draft' && (
                  <Button onClick={publishArticle}>Publier</Button>
                )}
                
                <Link href="/v2/admin/articles">
                  <Button variant="ghost">Retour à la liste</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Contenu de l'article */}
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="text-gray-600 mb-4">
              Dernière modification: {formatDate(article.updated_at)}
            </div>

            {article.image && (
              <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
                <img 
                  src={`${article.image}`}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contenu }}
          />
        </article>
        
        {/* Affichage en version mobile vs desktop */}
        <div className="mt-12 border-t pt-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => {
              // Simuler une vue mobile en ouvrant une fenêtre plus petite
              window.open(
                window.location.href,
                'preview_mobile',
                'width=375,height=667,resizable=yes,scrollbars=yes'
              );
            }}>
              Aperçu mobile
            </Button>
            
            <Button variant="outline" onClick={() => {
              // Simuler une vue tablette
              window.open(
                window.location.href,
                'preview_tablet',
                'width=768,height=1024,resizable=yes,scrollbars=yes'
              );
            }}>
              Aperçu tablette
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePreviewPage;