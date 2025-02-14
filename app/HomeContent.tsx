"use client"

import { Card } from "@/components/Card"
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination"
import { getAllArticles } from "@/app/lib/article";
import type { Article } from "@/type";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Loading from "./loading";
import CrushActivityHeader from "@/components/CrushActivityHeader";

const ITEMS_PER_PAGE = 8;

export default function HomeContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getAllArticles(); 
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

 

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);


  return (
    <>
      {isLoading ? <Loading /> : 

      <>

      <Hero />
      <section className="container">
        <h1 className="text-3xl font-extrabold lg:text-6xl text-center">Bonne fete des amoureux</h1>
      </section>

      <section className="container flex justify-center items-center w-full">
        <CrushActivityHeader/>
      </section>

      <section className="container mt-12">
        <h1 className="text-3xl font-extrabold lg:text-6xl">Lisez nos articles les plus récents</h1>
      </section>
      
      <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {currentArticles.map((article: Article) => (
          <Card key={article.article_uuid} item={article} />
        ))}
      </main>

      <Pagination totalItems={articles.length} itemsPerPage={ITEMS_PER_PAGE} />

      </>
}
    </>
  );
}
