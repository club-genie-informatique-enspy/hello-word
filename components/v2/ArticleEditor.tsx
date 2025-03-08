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

axios.defaults.baseURL = 'http://127.0.0.1:8000';

interface ArticleData {
  id?: number;
  title: string;
  content: string;
  coverImage?: File | null;
  status: 'draft' | 'published';
}

const ArticleEditor: React.FC = () => {
  const [article, setArticle] = useState<ArticleData>({
    title: '',
    content: '',
    status: 'draft'
  });
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().setImage({ src: result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const saveArticle = async (status: 'draft' | 'published' = 'draft') => {
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('content', article.content);
      formData.append('status', status);
      
      if (article.coverImage) {
        formData.append('coverImage', article.coverImage);
      }
      
      // Pour une mise à jour
      if (article.id) {
        formData.append('_method', 'PUT');
        await axios.post(`/api/articles/${article.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Pour une création
        await axios.post('/api/articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      alert(status === 'published' ? 'Article publié avec succès!' : 'Brouillon enregistré!');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setIsSaving(false);
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
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => saveArticle('draft')}
              disabled={isSaving}
            >
              Enregistrer le brouillon
            </Button>
            <Button 
              type="button"
              onClick={() => saveArticle('published')}
              disabled={isSaving}
            >
              Publier
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