import { Heart, MessageSquare } from 'lucide-react';
import { FC } from 'react';

const ArticleCard: FC<ArticleCardProps> = ({ title, excerpt, author, image, stats }) => {
    return (
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
        <img 
          src={image || "/api/placeholder/100/100"} 
          alt={title}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={author.avatar || "/api/placeholder/24/24"} 
                alt={author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{author.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{stats.likes} likes</span>
              <span>{stats.comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default ArticleCard;
