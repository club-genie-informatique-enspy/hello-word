import { Heart, MessageSquare } from 'lucide-react';
import { FC } from 'react';
import Link from 'next/link';
import { Article } from '@/type';

interface ArticleCardProps {
  article: Article;
  comments: number;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, comments }) => {
  return (
    <Link href={`/v2/details/${article.article_uuid}`} className="gap-4 p-4 " passHref>
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
        <img
          src={article.image || "/api/placeholder/100/100"}
          alt={article.titre}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{article.titre}</h3>
          <p className="text-gray-600 text-sm mb-2">{article.source}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={"/api/placeholder/24/24"}
                alt="Nom"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">Auteur</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{article.likes} <Heart className="inline w-4 h-4" /></span>
              <span>Comments <MessageSquare className="inline w-4 h-4" />{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
