export interface Photo {
    id: string;
    image_path: string;
    description: string;
    author_signature: string;
    likesCount: number;
    name?: string; // Non affiché
    aclass?: string; // Non affiché
  }