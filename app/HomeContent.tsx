"use client"

import { Card } from "@/components/Card"
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination"
import { getAllArticles } from "@/app/lib/article";
import type { Article } from "@/type";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4; // Nombre d'articles par page

export default function HomeContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  
  // État pour stocker les articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getAllArticles(); // Récupération des articles depuis la fonction
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Calculer les articles à afficher pour la page courante
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Chargement des articles...</div>
  }

  return (
    <>
      <Hero />
      <section className="container">
        <h1 className="text-3xl font-extrabold lg:text-6xl">Lisez nos articles les plus récents</h1>
      </section>

      <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {currentArticles.map((article: Article) => (
          <Card key={article.article_uuid} item={article} />
        ))}
      </main>

      <Pagination totalItems={articles.length} itemsPerPage={ITEMS_PER_PAGE} />
    </>
  );
}
