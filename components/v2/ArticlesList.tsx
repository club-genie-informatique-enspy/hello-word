'use client';
import ArticleCard from "@/components/v2/ArticleCard";

const ArticlesList = ({ selectedRubriqueId }: { selectedRubriqueId: number | null }) => {
  const articles = [
    { id: 1, title: "The overlooked benefits of real Christmas trees", excerpt: "The environmental pros and cons of Christmas trees...", image: "https://source.unsplash.com/400x320/?christmas-tree", author: { name: "Ray", avatar: "https://source.unsplash.com/32x32/?portrait" }, idrubrique: 2, likes: 41, comments: 23 },
    { id: 2, title: "How to reduce your carbon footprint in 2023", excerpt: "Simple changes in your daily life can make a big difference...", image: "https://source.unsplash.com/400x320/?nature", author: { name: "Alice", avatar: "https://source.unsplash.com/32x32/?face" }, idrubrique: 2, likes: 56, comments: 12 },
    { id: 3, title: "The rise of electric vehicles", excerpt: "Electric vehicles are becoming more popular...", image: "https://source.unsplash.com/400x320/?electric-car", author: { name: "John", avatar: "https://source.unsplash.com/32x32/?person" }, idrubrique: 1, likes: 78, comments: 34 },
    { id: 4, title: "Top 5 sustainable fashion brands", excerpt: "Discover the best fashion brands that are making an impact...", image: "https://source.unsplash.com/400x320/?fashion", author: { name: "Emma", avatar: "https://source.unsplash.com/32x32/?woman" }, idrubrique: 3, likes: 92, comments: 45 },
    { id: 5, title: "The future of renewable energy", excerpt: "How solar, wind, and other renewables shape the future...", image: "https://source.unsplash.com/400x320/?solar-panel", author: { name: "Mike", avatar: "https://source.unsplash.com/32x32/?man" }, idrubrique: 4, likes: 103, comments: 67 },
    { id: 6, title: "Why urban gardening is the next big thing", excerpt: "Urban gardening is not just a trend...", image: "https://source.unsplash.com/400x320/?garden", author: { name: "Sophia", avatar: "https://source.unsplash.com/32x32/?girl" }, idrubrique: 5, likes: 64, comments: 29 }
  ];

  const filteredArticles = selectedRubriqueId
    ? articles.filter(article => article.idrubrique === selectedRubriqueId)
    : articles;

  return (
    <div className="space-y-4">
      {filteredArticles.map(article => (
        <ArticleCard
          key={article.id}
          article = {article}
          comments ={article.comments}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
