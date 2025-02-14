interface Author {
    name: string;
    avatar?: string;
  }
  
 interface ArticleStats {
    likes: number;
    comments: number;
  }
  
interface ArticleCardProps {
    title: string;
    excerpt: string;
    author: Author;
    image?: string;
    stats: ArticleStats;
  }
  