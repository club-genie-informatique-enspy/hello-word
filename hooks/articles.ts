import axios from '@/lib/axios';




const getArticle = async (article_uuid: string): Promise<Article> => {
    try {
      const { data } = await axios.get<Article>(`/article/${article_uuid}`);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
      throw new Error('Impossible de récupérer l\'article. Veuillez réessayer plus tard.');
    }
  };

const getArticles = async (): Promise<Article[]> => {
    try {
      const { data } = await axios.get<Article[]>('/articles');
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw new Error('Impossible de récupérer les articles. Veuillez réessayer plus tard.');
    }
  }