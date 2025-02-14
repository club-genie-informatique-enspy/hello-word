'use client'
import ArticleCard  from "@/components/v2/ArticleCard";
const ArticlesList = () => {
const articles = [
  {
    id: 1,
    title: "The overlooked benefits of real Christmas trees",
    excerpt: "The environmental pros and cons of Christmas trees go far beyond the...",
    image: "https://source.unsplash.com/400x320/?christmas-tree",
    author: {
      name: "Ray",
      avatar: "https://source.unsplash.com/32x32/?portrait"
    },
    tags: ["Environment"],
    likes: 41,
    comments: 23
  },
  {
    id: 2,
    title: "How to reduce your carbon footprint in 2023",
    excerpt: "Simple changes in your daily life can make a big difference for the planet...",
    image: "https://source.unsplash.com/400x320/?nature",
    author: {
      name: "Alice",
      avatar: "https://source.unsplash.com/32x32/?face"
    },
    tags: ["Environment", "Sustainability"],
    likes: 56,
    comments: 12
  },
  {
    id: 3,
    title: "The rise of electric vehicles: What you need to know",
    excerpt: "Electric vehicles are becoming more popular, but are they really better for the environment?",
    image: "https://source.unsplash.com/400x320/?electric-car",
    author: {
      name: "John",
      avatar: "https://source.unsplash.com/32x32/?person"
    },
    tags: ["Technology", "Environment"],
    likes: 78,
    comments: 34
  },
  {
    id: 4,
    title: "Top 5 sustainable fashion brands in 2023",
    excerpt: "Discover the best fashion brands that are making a positive impact on the environment...",
    image: "https://source.unsplash.com/400x320/?fashion",
    author: {
      name: "Emma",
      avatar: "https://source.unsplash.com/32x32/?woman"
    },
    tags: ["Fashion", "Sustainability"],
    likes: 92,
    comments: 45
  },
  {
    id: 5,
    title: "The future of renewable energy",
    excerpt: "How solar, wind, and other renewable energy sources are shaping the future...",
    image: "https://source.unsplash.com/400x320/?solar-panel",
    author: {
      name: "Mike",
      avatar: "https://source.unsplash.com/32x32/?man"
    },
    tags: ["Energy", "Environment"],
    likes: 103,
    comments: 67
  },
  {
    id: 6,
    title: "Why urban gardening is the next big thing",
    excerpt: "Urban gardening is not just a trend; it's a way to reconnect with nature...",
    image: "https://source.unsplash.com/400x320/?garden",
    author: {
      name: "Sophia",
      avatar: "https://source.unsplash.com/32x32/?girl"
    },
    tags: ["Gardening", "Lifestyle"],
    likes: 64,
    comments: 29
  }
];
  
    return (
      <div className="space-y-4">
        {articles.map(article => (
          <ArticleCard 
          key={article.id} 
          title={article.title} 
          excerpt={article.excerpt} 
          author={article.author} 
          image={article.image} 
          stats={{ likes: article.likes, comments: article.comments }} 
        />
        ))}
      </div>
    );
  };

export default ArticlesList;