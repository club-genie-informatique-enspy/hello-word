import Image from "next/image"
import Link from "next/link";
import { Heart, HeartIcon, Eye } from "lucide-react";
import { updateArticle } from "@/app/lib/article";
import type { Article } from "@/type";
import { useState } from "react";
import {
  Card as CardBox,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps {
  item: Article
}

export function Card({ item }: CardProps) {
  const [likes, setLikes] = useState<number>(item.likes || 0);
  const [views, setViews] = useState<number>(item.nb_vues || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const newLikes = isLiked ? likes - 1 : likes + 1;

    setIsLiked(!isLiked);
    setLikes(newLikes);

    const updatedArticle = { ...item, likes: newLikes };

    // await updateArticle(item.article_uuid , updatedArticle);


  };

  const handleCardClick = async () => {

    setViews((prevViews) => prevViews + 1);
    
  };

  return (
    <Link className="text-lg" href={`/article/${item.article_uuid}`} onClick={handleCardClick}>
    <CardBox className="mt-10 rounded-sm">

      <CardHeader>
        {

          item.image 
          
          && 
          
          (
            <div className="relative h-44">
              <Image
                alt={item.titre}
                src={item.image || "/images/default.jpg"}
                fill
                loading='lazy'
                style={{
                  objectFit: 'cover', // cover, contain, none
                }}
              />
            </div>
          )

        }

      </CardHeader>

      <CardContent>

        <div className="flex mb-3">
          <p className="text-sm text-primary">{`Source : ${item.source }`}</p>
        </div>
        
          <CardTitle className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl"><p className="text-sm text-primary">{item.titre}</p></CardTitle>


        
        <CardDescription className="mt-4 text-muted-foreground md:mb-4 lg:mt-6 truncate">{item.contenu.substring(0, 150)}...</CardDescription>



        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground" onClick={handleLikeClick}>
            {isLiked ? (
                <HeartIcon className="w-4 h-4 text-red-500" />
              ) : (
                <Heart className="w-4 h-4" />
              )}
              <span>{likes}</span>
            </div>


            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
          </div>

      </CardContent>
    </CardBox>
    </Link>
  )
}
