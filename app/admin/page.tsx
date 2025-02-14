"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "@/app/lib/article"
import { getAllActivities, createActivity, updateActivity, deleteActivity } from "../lib/activity"
import { getAllMessages, createMessage, updateMessage, deleteMessage } from "../lib/crush-messages"
import { Commentaire, Article, Activity, crushMessage } from "@/type"
import { deleteComment } from "../lib/comment"
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
  const [activities, setActivities] = useState<Activity[]>([])
  const [messages, setMessages] = useState<crushMessage[]>([])
  const [commentaires, setCommentaires] = useState<Commentaire[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<crushMessage | null>(null)
  const [crushActivity, setCrushActivity]=useState< Activity | null>(null)

  // États pour les nouveaux éléments
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

  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    activity_uuid: "",
    type: "",
    title: "",
    description: "",
    nb_vues: 0,
    likes: 0,
  })

  const [newMessage, setNewMessage] = useState<Partial<crushMessage>>({
    message_uuid: "",
    activity_uuid: "",
    sender: "",
    contenu: "",
    receiver: "",
    nb_vues: 0,
    likes: 0,
  })

  // Effets pour charger les données
  useEffect(() => {
    const fetchArticles = async () => {
      const articlesData = await getAllArticles()
      setArticles(articlesData)
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesData = await getAllActivities();
      setActivities(activitiesData);
      setCrushActivity(activitiesData[0]);
    };
    fetchActivities();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      if(!crushActivity) return;
      const MessagesData = await getAllMessages(crushActivity.activity_uuid);
      setMessages(MessagesData);
    };
    fetchMessages();
  }, []);

  //gestion des articles et commentaires
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

  // Gestionnaires pour les activités
  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const createdActivity = await createActivity(newActivity)
      setActivities([...activities, createdActivity])
      setNewActivity({
        type: "",
        title: "",
        description: "",
        nb_vues: 0,
        likes: 0,
      })
    } catch (error) {
      console.error("Error creating activity:", error)
    }
  }

  const handleUpdateActivity = async (activityId: string) => {
    try {
      const updatedActivityData = {
        type: selectedActivity?.type,
        title: selectedActivity?.title,
        description: selectedActivity?.description,
      }
      const updatedActivity = await updateActivity(activityId, updatedActivityData)
      setActivities(activities.map(activity => 
        activity.activity_uuid === activityId ? updatedActivity : activity
      ))
      setSelectedActivity(null)
    } catch (error) {
      console.error("Error updating activity:", error)
    }
  }

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId)
      setActivities(activities.filter(activity => activity.activity_uuid !== activityId))
    } catch (error) {
      console.error("Error deleting activity:", error)
    }
  }

  // Gestionnaires pour les messages
  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newMessageData = {
        ...newMessage,
        created_at: new Date(),
        updated_at: new Date(),
      }
      const createdMessage = await createMessage(newMessageData)
      setMessages([...messages, createdMessage])
      setNewMessage({
        activity_uuid: "",
        sender: "",
        contenu: "",
        receiver: "",
        nb_vues: 0,
        likes: 0,
      })
    } catch (error) {
      console.error("Error creating message:", error)
    }
  }

  const handleUpdateMessage = async (messageId: string) => {
    try {
      const updatedMessageData = {
        sender: selectedMessage?.sender,
        contenu: selectedMessage?.contenu,
        receiver: selectedMessage?.receiver,
      }
      const updatedMessage = await updateMessage(messageId, updatedMessageData)
      setMessages(messages.map(message => 
        message.message_uuid === messageId ? updatedMessage : message
      ))
      setSelectedMessage(null)
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId)
      setMessages(messages.filter(message => message.message_uuid !== messageId))
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

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
              <TabsTrigger value="new-article">Nouvel Article</TabsTrigger>
              <TabsTrigger value="activities">Activités</TabsTrigger>
              <TabsTrigger value="new-activity">Nouvelle Activité</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="new-message">Nouveau Message</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>

            {/* Contenu existant pour les articles et commentaires */}
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
              <TabsContent value="new-article">
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


            
            {/* Nouvelle section pour les activités */}
            <TabsContent value="activities">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.activity_uuid}>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{activity.title}</TableCell>
                        <TableCell>{activity.nb_vues}</TableCell>
                        <TableCell>{activity.likes}</TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteActivity(activity.activity_uuid)}
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

            {/* Nouvelle section pour créer une activité */}
            <TabsContent value="new-activity">
              <form className="space-y-4" onSubmit={handleCreateActivity}>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Créer l'activité
                </Button>
              </form>
            </TabsContent>

            {/* Nouvelle section pour les messages */}
            <TabsContent value="messages">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expéditeur</TableHead>
                      <TableHead>Destinataire</TableHead>
                      <TableHead>Contenu</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.message_uuid}>
                        <TableCell>{message.sender}</TableCell>
                        <TableCell>{message.receiver}</TableCell>
                        <TableCell>{message.contenu}</TableCell>
                        <TableCell>{message.nb_vues}</TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteMessage(message.message_uuid)}
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

            {/* Nouvelle section pour créer un message */}
            <TabsContent value="new-message">
              <form className="space-y-4" onSubmit={handleCreateMessage}>
                <div className="space-y-2">
                  <Label htmlFor="activity">Activité associée</Label>
                  <select
                    id="activity"
                    className="w-full p-2 border rounded-md"
                    value={newMessage.activity_uuid}
                    onChange={(e) => setNewMessage({...newMessage, activity_uuid: e.target.value})}
                  >
                    <option value="">Sélectionner une activité</option>
                    {activities.map((activity) => (
                      <option key={activity.activity_uuid} value={activity.activity_uuid}>
                        {activity.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender">Expéditeur</Label>
                  <Input
                    id="sender"
                    value={newMessage.sender}
                    onChange={(e) => setNewMessage({...newMessage, sender: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receiver">Destinataire</Label>
                  <Input
                    id="receiver"
                    value={newMessage.receiver}
                    onChange={(e) => setNewMessage({...newMessage, receiver: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    rows={5}
                    value={newMessage.contenu}
                    onChange={(e) => setNewMessage({...newMessage, contenu: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* modal pour editer un article */}
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


      {/* Modal pour éditer une activité */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Modifier l'activité</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Input
                    id="edit-type"
                    value={selectedActivity.type}
                    onChange={(e) => setSelectedActivity({
                      ...selectedActivity,
                      type: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-title">Titre</Label>
                  <Input
                    id="edit-title"
                    value={selectedActivity.title}
                    onChange={(e) => setSelectedActivity({
                      ...selectedActivity,
                      title: e.target.value
                    })}
                    />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    rows={5}
                    value={selectedActivity.description}
                    onChange={(e) => setSelectedActivity({
                      ...selectedActivity,
                      description: e.target.value
                    })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedActivity(null)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleUpdateActivity(selectedActivity.activity_uuid)}
                  >
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal pour éditer un message */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Modifier le message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sender">Expéditeur</Label>
                  <Input
                    id="edit-sender"
                    value={selectedMessage.sender}
                    onChange={(e) => setSelectedMessage({
                      ...selectedMessage,
                      sender: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-receiver">Destinataire</Label>
                  <Input
                    id="edit-receiver"
                    value={selectedMessage.receiver}
                    onChange={(e) => setSelectedMessage({
                      ...selectedMessage,
                      receiver: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-content">Message</Label>
                  <Textarea
                    id="edit-content"
                    rows={5}
                    value={selectedMessage.contenu}
                    onChange={(e) => setSelectedMessage({
                      ...selectedMessage,
                      contenu: e.target.value
                    })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => handleUpdateMessage(selectedMessage.message_uuid)}
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