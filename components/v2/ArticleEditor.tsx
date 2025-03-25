// ArticleEditor.tsx
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';


interface ArticleData {
  id?: number;
  title: string;
  content: string;
  coverImage?: File | null;
  status: 'draft' | 'published';
}

// Fonction utilitaire pour extraire et uploader les images
const preprocessContent = async (content: string): Promise<string> => {
  // Recherche des images en base64 dans le contenu
  const base64Pattern = /<img[^>]*src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
  let match;
  let processedContent = content;
  const matches: {fullTag: string, type: string, data: string}[] = [];
  
  // Collecter tous les matches
  while ((match = base64Pattern.exec(content)) !== null) {
    matches.push({
      fullTag: match[0],
      type: match[1], // png, jpeg, etc.
      data: match[2]  // Données base64
    });
  }
  
  if (matches.length === 0) {
    return content; // Pas d'images base64, retourner le contenu tel quel
  }
  
  // Pour chaque image en base64
  for (const { fullTag, type, data } of matches) {
    try {
      // Créer un fichier à partir des données base64
      const byteCharacters = atob(data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, { type: `image/${type}` });
      const file = new File([blob], `image.${type}`, { type: `image/${type}` });
      
      // Créer un FormData pour l'upload
      const formData = new FormData();
      formData.append('image', file);
      
      // Uploader l'image
      const response = await axios.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Remplacer l'image base64 par l'URL
      const imageUrl = response.data.url;
      const newImgTag = fullTag.replace(
        `src="data:image/${type};base64,${data}"`,
        `src="${imageUrl}"`
      );
      
      processedContent = processedContent.replace(fullTag, newImgTag);
    } catch (error) {
      console.error('Erreur lors de l\'upload d\'image:', error);
      // Continuer avec les autres images
    }
  }
  
  return processedContent;
};

const ArticleEditor: React.FC = () => {
  const [article, setArticle] = useState<ArticleData>({
    title: '',
    content: '',
    status: 'draft'
  });
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [processedImages, setProcessedImages] = useState(0);
  
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
    content: article.content,
    onUpdate: ({ editor }) => {
      setArticle(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle(prev => ({ ...prev, title: e.target.value }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArticle(prev => ({ ...prev, coverImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
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
      
      try {
        // Upload immédiat de l'image au lieu de l'insérer en base64
        const formData = new FormData();
        formData.append('image', file);
        
        // Afficher une indication visuelle que l'upload est en cours
        editor.chain().focus().setImage({ 
          src: URL.createObjectURL(file),
          alt: 'Chargement...'
        }).run();
        
        const response = await axios.post('/api/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        // Remplacer l'image temporaire par l'URL définitive
        const imageUrl = response.data.url;
        
        // Trouver la dernière image insérée et la remplacer
        // Note: cette approche simplifiée suppose que la dernière image est celle qu'on vient d'insérer
        const content = editor.getHTML();
        const lastImgIndex = content.lastIndexOf('<img');
        
        if (lastImgIndex !== -1) {
          const imgEndIndex = content.indexOf('>', lastImgIndex) + 1;
          const imgTag = content.substring(lastImgIndex, imgEndIndex);
          
          const newImgTag = imgTag.replace(
            /src="[^"]*"/,
            `src="${imageUrl}"`
          ).replace(
            /alt="[^"]*"/,
            'alt="Image article"'
          );
          
          const newContent = content.substring(0, lastImgIndex) + 
                             newImgTag + 
                             content.substring(imgEndIndex);
          
          editor.commands.setContent(newContent);
        }
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        alert('Erreur lors de l\'upload de l\'image. Veuillez réessayer.');
        
        // Fallback à l'ancienne méthode en cas d'erreur
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          editor.chain().focus().setImage({ src: result }).run();
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  // Version optimisée qui utilise notre fonction de prétraitement
  const saveArticle = async (status: 'draft' | 'published' = 'draft') => {
    if (!article.title.trim()) {
      alert('Veuillez saisir un titre pour l\'article');
      return;
    }
    
    setIsSaving(true);
    setProgress(0);
    
    try {
      // Compter les images en base64
      const base64Count = (article.content.match(/src="data:image\//g) || []).length;
      setTotalImages(base64Count);
      
      let processedContent = article.content;
      
      // Si des images en base64 sont présentes, les prétraiter
      if (base64Count > 0) {
        // Utiliser notre fonction de prétraitement
        processedContent = await preprocessContent(article.content);
        setProgress(100); // Mise à jour de la progression
      }
      
      // Préparer les données à envoyer
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('content', processedContent);
      formData.append('status', status);
      
      if (article.coverImage) {
        formData.append('coverImage', article.coverImage);
      }
      
      // Configuration axios pour surveillance de la progression
      const axiosConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          if (base64Count === 0) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        }
      };
      
      // Envoi à l'API
      let response;
      if (article.id) {
        formData.append('_method', 'PUT');
        response = await axios.post(`/api/articles/${article.id}`, formData, axiosConfig);
      } else {
        response = await axios.post('/api/articles', formData, axiosConfig);
      }
      
      // Mise à jour avec l'ID retourné
      setArticle(prev => ({ 
        ...prev, 
        id: response.data.id || prev.id
      }));
      
      alert(status === 'published' ? 'Article publié avec succès!' : 'Brouillon enregistré!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          alert('La requête a pris trop de temps. Essayez de réduire la taille du contenu ou des images.');
        } else if (error.response) {
          alert(`Erreur (${error.response.status}): ${error.response.data.message || 'Une erreur est survenue.'}`);
        } else {
          alert('Erreur réseau. Vérifiez votre connexion et réessayez.');
        }
      } else {
        alert('Une erreur est survenue lors de la sauvegarde.');
      }
    } finally {
      setIsSaving(false);
      setProgress(0);
      setTotalImages(0);
      setProcessedImages(0);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            <Input
              type="text"
              placeholder="Titre de l'article"
              className="text-2xl font-bold border-none focus:ring-0 w-full"
              value={article.title}
              onChange={handleTitleChange}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="mb-2 text-gray-700">Image de couverture</div>
            {coverImagePreview && (
              <div className="mb-2">
                <img 
                  src={coverImagePreview} 
                  alt="Aperçu" 
                  className="max-h-60 rounded-md object-cover"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="cursor-pointer"
            />
          </div>
          
          {editor && (
            <div className="border rounded-md">
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
          
          {isSaving && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {totalImages > 0 
                  ? `Traitement des images: ${progress}%` 
                  : `Enregistrement: ${progress}%`}
              </p>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => saveArticle('draft')}
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer le brouillon'}
            </Button>
            <Button 
              type="button"
              onClick={() => saveArticle('published')}
              disabled={isSaving}
            >
              {isSaving ? 'Publication...' : 'Publier'}
            </Button>
            {article.id && (
              <Button 
                type="button"
                variant="secondary"
                onClick={() => window.open(`/admin/articles/preview/${article.id}`, '_blank')}
              >
                Prévisualiser
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleEditor;