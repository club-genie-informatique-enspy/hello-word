import { Heart, MessageSquare } from 'lucide-react';
import { FC } from 'react';
import Link from 'next/link';

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    image?: string;
    author: { name: string; avatar?: string };
    likes: number;
  };
  comments: number;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, comments }) => {
  return (
    <Link href={`/v2/details/${article.id}`} className="gap-4 p-4 " passHref>
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
        <img
          src={article.image || "/api/placeholder/100/100"}
          alt={article.title}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar || "/api/placeholder/24/24"}
                alt={article.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{article.likes} <Heart className="inline w-4 h-4" /></span>
              <span>{comments} <MessageSquare className="inline w-4 h-4" /></span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
