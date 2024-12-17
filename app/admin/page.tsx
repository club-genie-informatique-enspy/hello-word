"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "@/app/lib/article";
import { Commentaire , Article } from "@/type";
import { deleteComment } from "../lib/comment";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  PencilIcon, 
  TrashIcon, 
  MessageSquareIcon, 
  EyeIcon,
  PlusCircleIcon
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles")
  const [articles, setArticles] = useState<Article[]>([])
  const [commentaires, setCommentaires] = useState<Commentaire[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    titre: "",
    contenu: "",
    image: "",
    slug: "",
    user_id: 0,
    auteur: "",
    source: "",
    nb_vues: 0,
    likes: 0,
  })


  useEffect(() => {
    const fetchArticles = async () => {
      const articlesData = await getAllArticles();
      setArticles(articlesData);
    };
    fetchArticles();
  }, []);








  // Simulation des fonctions de gestion (à remplacer par vos vraies API calls)
  const handleCreateArticle = async (e: React.FormEvent) => {
    // e.preventDefault()
    // try {
    //   const slugified = newArticle.titre?.toLowerCase().replace(/ /g, '-')
    //     .replace(/[^\w-]+/g, '')

    //     type NewArticleData = Omit<Partial<Article>, 'article_uuid'>;

    //     const newArticleData: NewArticleData = {
    //       ...newArticle,
    //       slug: slugified,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     };
  
    // //   const createdArticle = await createArticle(newArticleData);
    //   setArticles([...articles, createdArticle]);
      
    //   // Réinitialisation du formulaire avec tous les champs
    //   setNewArticle({
    //     titre: "",
    //     contenu: "",
    //     image: "",
    //     slug: "",
    //     user_id: 0,
    //     auteur: "",
    //     source: "",
    //     nb_vues: 0,
    //     likes: 0,
    //   });
    // } catch (error) {
    //   console.error("Error creating article:", error);
    // }
  };
  
  

const handleUpdateArticle = async (articleId: string) => {
    try {
      const updatedArticleData = {
        titre: selectedArticle?.titre,
        contenu: selectedArticle?.contenu,
        image: selectedArticle?.image,
      };
      const updatedArticle = await updateArticle(articleId, updatedArticleData);
      setArticles(articles.map(article => article.article_uuid === articleId ? updatedArticle : article));
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };
  

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      setArticles(articles.filter(article => article.article_uuid !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  
  const handleDeleteComment = async (commentId: string) => {
    try {
      // Exemple de suppression de commentaire via une fonction deleteComment
      await deleteComment(commentId); // Remplacez 'deleteComment' par votre fonction API appropriée
      setCommentaires(commentaires.filter(comment => comment.commentaire_uuid !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard Administrateur</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="new">Nouvel Article</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Auteur</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.article_uuid}>
                        <TableCell>{article.titre}</TableCell>
                        <TableCell>{article.auteur}</TableCell>
                        <TableCell>{article.nb_vues}</TableCell>
                        <TableCell>{article.likes}</TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteArticle(article.article_uuid)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="new">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre</Label>
                  <Input
                    id="titre"
                    value={newArticle.titre}
                    onChange={(e) => setNewArticle({...newArticle, titre: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({...newArticle, image: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    value={newArticle.source}
                    onChange={(e) => setNewArticle({...newArticle, source: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contenu">Contenu</Label>
                  <Textarea
                    id="contenu"
                    rows={10}
                    value={newArticle.contenu}
                    onChange={(e) => setNewArticle({...newArticle, contenu: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  onClick={handleCreateArticle}
                  className="w-full"
                >
                  Publier l'article
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="comments">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Contenu</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commentaires.map((comment) => (
                      <TableRow key={comment.commentaire_uuid}>
                        <TableCell>
                          {articles.find(a => a.article_uuid === comment.article_uuid)?.titre}
                        </TableCell>
                        <TableCell>{comment.contenu}</TableCell>
                        <TableCell>
                          {new Date(comment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteComment(comment.commentaire_uuid)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Modifier l'article</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-titre">Titre</Label>
                  <Input
                    id="edit-titre"
                    value={selectedArticle.titre}
                    onChange={(e) => setSelectedArticle({
                      ...selectedArticle,
                      titre: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL de l'image</Label>
                  <Input
                    id="edit-image"
                    value={selectedArticle.image}
                    onChange={(e) => setSelectedArticle({
                      ...selectedArticle,
                      image: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-contenu">Contenu</Label>
                  <Textarea
                    id="edit-contenu"
                    rows={10}
                    value={selectedArticle.contenu}
                    onChange={(e) => setSelectedArticle({
                      ...selectedArticle,
                      contenu: e.target.value
                    })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedArticle(null)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleUpdateArticle(selectedArticle.article_uuid)}
                  >
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}