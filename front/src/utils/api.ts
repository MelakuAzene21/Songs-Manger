import { Song, PaginationParams, PaginatedResponse, CreateSongRequest, UpdateSongRequest } from '@types/index';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://songs-manger.onrender.com/api'  // Replace with your deployed backend URL
  : 'http://localhost:5000/api';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(error.message || 'Request failed', response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchSongs(params: PaginationParams): Promise<PaginatedResponse<Song>> {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  if (params.search) searchParams.append('search', params.search);
  if (params.genre) searchParams.append('genre', params.genre);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  return fetchWithErrorHandling(`${API_BASE_URL}/songs?${searchParams}`);
}

export async function createSong(song: CreateSongRequest): Promise<Song> {
  return fetchWithErrorHandling(`${API_BASE_URL}/songs`, {
    method: 'POST',
    body: JSON.stringify(song),
  });
}

export async function updateSong(song: UpdateSongRequest): Promise<Song> {
  return fetchWithErrorHandling(`${API_BASE_URL}/songs/${song.id}`, {
    method: 'PUT',
    body: JSON.stringify(song),
  });
}

export async function deleteSong(id: string): Promise<void> {
  return fetchWithErrorHandling(`${API_BASE_URL}/songs/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchGenres(): Promise<string[]> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}/genres`);
  return response.genres;
}