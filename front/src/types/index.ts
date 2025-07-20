export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: number; // in seconds
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSongRequest {
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: number;
  genre: string;
}

export interface UpdateSongRequest extends Partial<CreateSongRequest> {
  id: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: keyof Song;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  genre?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
}

export type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
}