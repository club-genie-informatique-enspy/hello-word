'use client';
import ArticleCard from "@/components/v2/ArticleCard";
import { useState, useEffect } from "react";
import { getAllArticles } from "@/app/lib/article";

const ArticlesList = ({ selectedRubriqueId }: { selectedRubriqueId: string | null }) => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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



  const filteredArticles = selectedRubriqueId
    ? articles.filter(article => article.rubrique_uuid === selectedRubriqueId)
    : articles;

  return (
    <div className="space-y-4">
      {filteredArticles.map(article => (
        <ArticleCard
          key={article.article_uuid}
          article = {article}
          comments ={0}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
