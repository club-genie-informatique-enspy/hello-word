export interface Photo {
    id: string;
    imageUrl: string;
    description: string;
    signature: string;
    likesCount: number;
    createdAt: string;
    authorName?: string; // Non affiché
    authorClass?: string; // Non affiché
  }