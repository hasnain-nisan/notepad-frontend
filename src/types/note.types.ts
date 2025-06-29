export interface Note {
  id: string; // UUID
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  isFavorite: boolean;
  color: string;
}
