"use client";
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from '@/lib/axios';
import {useAuth} from '@/hooks/auth';

interface Rubrique {
  rubrique_uuid: string;
  titre: string;
}

interface ArticleData {
  article_uuid?: string;
  titre: string;
  user_id: number;
  contenu: string;
  rubrique_uuid: string;
  auteur?: string;
  source?: string;
  slogan?: string;
  image?: File | null;
}

interface ArticleEditorProps {
  initialArticle?: ArticleData;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ initialArticle }) => {
  const {user} = useAuth();
  const [article, setArticle] = useState<ArticleData>({
    titre: initialArticle?.titre || '',
    user_id: user?.id || 0,
    contenu: initialArticle?.contenu || '',
    rubrique_uuid: initialArticle?.rubrique_uuid || '',
    auteur: initialArticle?.auteur || '',
    source: initialArticle?.source || '',
    slogan: initialArticle?.slogan || '',
    image: null,
  });

  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchRubriques = async () => {
      try {
        const response = await axios.get('/rubriques');
        setRubriques(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des rubriques:', error);
      }
    };
  
    fetchRubriques();
  }, []);
  // Si un article existant est chargé avec une image, afficher l'aperçu
  useEffect(() => {
    if (initialArticle?.image) {
      setImagePreview(`/storage/${initialArticle.image}`);
    }
  }, [initialArticle]);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Commencez à rédiger votre article...',
      }),
    ],
    content: article.contenu,
    onUpdate: ({ editor }) => {
      setArticle(prev => ({ ...prev, contenu: editor.getHTML() }));
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleRubriqueChange = (value: string) => {
    setArticle(prev => ({ ...prev, rubrique_uuid: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArticle(prev => ({ ...prev, image: file }));
      
      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    const url = window.prompt('URL de l\'image');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const uploadLocalImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editor) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().setImage({ src: result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const saveArticle = async () => {
    if (!article.rubrique_uuid) {
      alert('Veuillez sélectionner une rubrique');
      return;
    }
    
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('titre', article.titre);
      formData.append('contenu', article.contenu);
      formData.append('rubrique_uuid', article.rubrique_uuid);
      
      if (article.auteur) {
        formData.append('auteur', article.auteur);
      }
      
      if (article.source) {
        formData.append('source', article.source);
      }
      
      if (article.slogan) {
        formData.append('slogan', article.slogan);
      }
      
      if (article.image) {
        formData.append('image', article.image);
      }
      formData.append('user_id', String(user?.id || 0));
      let response;
      
      // Pour une mise à jour
      console.log("Datas envoyé vers l'api",formData);
      if (article.article_uuid) {
        formData.append('_method', 'PUT');
        response = await axios.post(`/articles/${article.article_uuid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Pour une création
        response = await axios.post('/articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      // Mettre à jour l'article avec les données retournées par l'API
      setArticle(prev => ({ 
        ...prev, 
        article_uuid: response.data.article_uuid
      }));
      
      alert('Article enregistré avec succès!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {article.article_uuid ? 'Modifier l\'article' : 'Nouvel article'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Titre */}
            <div>
              <Label htmlFor="titre">Titre de l'article</Label>
              <Input
                id="titre"
                name="titre"
                type="text"
                placeholder="Titre de l'article"
                className="text-xl mt-1"
                value={article.titre}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {/* Rubrique */}
            <div>
              <Label htmlFor="rubrique">Rubrique</Label>
              <Select 
                value={article.rubrique_uuid} 
                onValueChange={handleRubriqueChange}
              >
                <SelectTrigger id="rubrique" className="mt-1">
                  <SelectValue placeholder="Sélectionner une rubrique" />
                </SelectTrigger>
                <SelectContent>
                  {rubriques.map((rubrique) => (
                    <SelectItem key={rubrique.rubrique_uuid} value={rubrique.rubrique_uuid}>
                      {rubrique.titre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Slogan */}
            <div>
              <Label htmlFor="slogan">Slogan (court résumé)</Label>
              <Textarea
                id="slogan"
                name="slogan"
                placeholder="Slogan ou court résumé de l'article"
                className="mt-1"
                value={article.slogan || ''}
                onChange={handleInputChange}
              />
            </div>
            
            {/* Image */}
            <div>
              <Label htmlFor="image">Image principale</Label>
              {imagePreview && (
                <div className="mt-2 mb-4">
                  <img 
                    src={imagePreview} 
                    alt="Aperçu" 
                    className="max-h-60 rounded-md object-cover"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 cursor-pointer"
              />
            </div>
            
            {/* Contenu */}
            <div>
              <Label>Contenu de l'article</Label>
              {editor && (
                <div className="mt-1 border rounded-md">
                  <div className="bg-gray-50 p-2 border-b flex flex-wrap gap-2">
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={editor.isActive('bold') ? 'bg-blue-200' : ''}
                    >
                      Gras
                    </Button>
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={editor.isActive('italic') ? 'bg-blue-200' : ''}
                    >
                      Italique
                    </Button>
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : ''}
                    >
                      Titre
                    </Button>
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={editor.isActive('bulletList') ? 'bg-blue-200' : ''}
                    >
                      Liste
                    </Button>
                    <div className="flex items-center">
                      <Button 
                        type="button" 
                        size="sm"
                        onClick={addImage}
                      >
                        Image URL
                      </Button>
                      <span className="mx-1">ou</span>
                      <label className="cursor-pointer">
                        <Input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={uploadLocalImage}
                        />
                        <span className="px-3 py-1 bg-gray-200 rounded text-sm">Importer</span>
                      </label>
                    </div>
                  </div>
                  <EditorContent editor={editor} className="prose max-w-none p-4 min-h-[300px]" />
                </div>
              )}
            </div>
            
            {/* Informations supplémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="auteur">Auteur</Label>
                <Input
                  id="auteur"
                  name="auteur"
                  type="text"
                  placeholder="Nom de l'auteur"
                  className="mt-1"
                  value={article.auteur || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  type="text"
                  placeholder="Source de l'article"
                  className="mt-1"
                  value={article.source || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            {/* Boutons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Annuler
              </Button>
              <Button 
                type="button"
                onClick={saveArticle}
                disabled={isSaving}
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              {article.article_uuid && (
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={() => window.open(`/v2/admin/articles/preview/${article.article_uuid}`, '_blank')}
                >
                  Prévisualiser
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleEditor;