import { Newsletter } from "@/components/Newsletter";
import { ChevronLeft, Tag, UserRoundPen, ThumbsUp, Eye } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { getArticle } from "@/app/lib/article";
import { getComments } from "@/app/lib/comment";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { Commentaire } from "@/type";
import { useAuth } from "@/app/provider/auth-provider";
import { useState, useEffect } from "react";

async function CommentsSection({ articleUuid }: { articleUuid: string }) {
  const comments = await getComments(articleUuid);

  return (
    <section className="container mx-auto my-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Commentaires</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aucun commentaire pour le moment.</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.commentaire_uuid} className="border-l-4 border-gray-200 pl-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Utilisateur #{comment.user_id}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.contenu}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  console.log(article);
  
  if (!article) {
    notFound();
  }

  return { title: article.titre };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto w-full">
        <div className="container my-8 flex items-center justify-between">
          <Link className="text-xl flex flex-row items-center no-underline" href={`/`}>
            <Button variant="link"> <ChevronLeft /> Retour </Button>
          </Link>
        </div>

        {/* <div className="relative mt-16 h-[28rem]">
          <Image
            alt={article.titre}
            src={article.image}
            fill={true}
            style={{
              objectFit: 'cover'
            }}
          />
        </div> */}
      </section>

      <article className="container mx-auto my-12 w-full max-w-4xl prose lg:prose-xl prose-stone dark:prose-invert">
        <h1 className="mb-4 text-3xl font-extrabold lg:mb-6 lg:text-4xl">
          {article.titre}
        </h1>

        <div className="not-prose flex flex-wrap items-center justify-between mb-6">
          <Link href={`/author/${article.auteur.toLowerCase().trim().split(" ").join("-")}`}>
            <Button className="text-xl -px-2" variant="link">
              <UserRoundPen className="mr-2" /> {article.auteur}
            </Button>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {article.nb_vues}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" /> {article.likes}
            </span>
          </div>
        </div>

        <div className="prose-lg" dangerouslySetInnerHTML={{ __html: article.contenu }} />
        
        {article.source && (
          <div className="mt-8 text-sm text-gray-500">
            Source: <a href={article.source} target="_blank" rel="noopener noreferrer">{article.source}</a>
          </div>
        )}
      </article>

      <CommentsSection articleUuid={article.article_uuid} />
      <Newsletter />
    </>
  );
}