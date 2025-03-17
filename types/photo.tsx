export interface Photo {
    id: string;
    image_path: string;
    description: string;
    author_signature: string;
    likes_count: number;
    name?: string; // Non affiché
    aclass?: string; // Non affiché
  }