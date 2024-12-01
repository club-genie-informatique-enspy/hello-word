import Image from "next/image"
import Link from "next/link";
import type { Article } from "@/type";
import {
  Card as CardBox,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Card({ item }: { item: Article }) {

  return (
    <Link className="text-lg" href={`/article/${item.slug}`}>
    <CardBox className="mt-10 rounded-sm">
      {/* <CardHeader>
        {
          item.image && (
            <div className="relative h-44">
              <Image
                alt={item.titre}
                src={item.image}
                fill
                loading='lazy'
                style={{
                  objectFit: 'cover', // cover, contain, none
                }}
              />
            </div>
          )
        }
      </CardHeader> */}

      <CardContent>
        {/* <div className="flex mb-3">
          <p className="text-sm text-primary">{`Publié le ${item.created_at }`}</p>
        </div> */}
        
          <CardTitle className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl"><p className="text-sm text-primary">{item.titre}</p></CardTitle>
        
        <CardDescription className="mt-4 text-muted-foreground md:mb-4 lg:mt-6 truncate">{item.contenu.substring(0, 150)}...</CardDescription>
      </CardContent>
    </CardBox>
    </Link>
  )
}
