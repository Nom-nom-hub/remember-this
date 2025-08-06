// Shared types for the Memory feature

export type MemoryCategory = 'Person' | 'Place' | 'Thing' | 'Moment' | 'Picture';

export interface Memory {
  id: string;
  title: string;
  category: MemoryCategory;
  description: string;
  tags: string[];
  imageUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoryFormData {
  title: string;
  category: MemoryCategory;
  description: string;
  tags: string[];
  image: File | null;
}

export interface MemoryFilters {
  category?: MemoryCategory;
  tags?: string[];
  userId?: string;
  searchQuery?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface CreateMemoryInput {
  title: string;
  category: MemoryCategory;
  description: string;
  tags: string[];
  imageUrl?: string;
  userId: string;
}

export interface UpdateMemoryInput {
  title?: string;
  category?: MemoryCategory;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}
