"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Article } from "@/type";
import Loading from "@/app/loading";
import { Commentaire } from "@/type";
import { getCommentsFromArticle } from "@/app/lib/comment";
import { User } from "@/type";


interface CommentsProps {
  articleuuid  : string;
}

export default function Comments({ articleuuid }: CommentsProps) {
  const [comments, setComments] = useState<Commentaire[] | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {

    async function ActivateComments() {

      try {
        
        setIsLoading(true);

        
        const data = await getCommentsFromArticle(articleuuid);


        setComments(data);

      } catch (err) {
        setError("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    }


    ActivateComments();

  }, [articleuuid]);



  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    // setIsSubmitting(true);
    // try {
    //   const response = await fetch(`http://localhost:8000/api/commentaire/${articleuuid}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ contenu: newComment }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to post comment");
    //   }

    //   const newCommentData: Comment = await response.json();
    //   setComments((prev) => (prev ? [newCommentData, ...prev] : [newCommentData]));
    //   setNewComment("");
    // } catch (err) {
    //   setError("Failed to post comment");
    // } finally {
    //   setIsSubmitting(false);
    // }

  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="container mx-auto my-12 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Commentaires ({comments ? comments.length : 0})
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="mb-6 space-y-4">
            <Textarea
              placeholder="Partager vos pensees..."
              value={newComment}
              onChange={handleTextareaChange}
              className="min-h-[100px] resize-y"
              disabled={isSubmitting}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting || !newComment.trim()}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>

          {comments && comments.length > 0 ? 

          (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.commentaire_uuid} className="bg-muted">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserRound className="h-6 w-6" />

                      {/* <span className="font-medium">{comment.auteur}</span> */}

                      <span className="text-sm text-muted-foreground">
                        • {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mt-2 whitespace-pre-wrap">{comment.contenu}</p>
                    <div className="flex items-center gap-4 mt-4">

                      {/* <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <span role="img" aria-label="thumbs up">👍</span>
                        {comment.likes}
                      </Button> */}

                      <Button variant="ghost" size="sm">
                        Reponse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
              
              )}
            </div>
          ) : (

            <p className="text-gray-500">No comments yet.</p>

          )}
        </CardContent>
      </Card>
    </section>
  );
}
