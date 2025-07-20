import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, PaginationParams, PaginatedResponse, CreateSongRequest, UpdateSongRequest } from '@types/index';

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: {
    search: string;
    genre: string;
    sortBy: keyof Song;
    sortOrder: 'asc' | 'desc';
  };
  genres: string[];
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filters: {
    search: '',
    genre: '',
    sortBy: 'title',
    sortOrder: 'asc',
  },
  genres: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch songs
    fetchSongs: (state, action: PayloadAction<PaginationParams>) => {
      state.loading = true;
      state.error = null;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      if (action.payload.search !== undefined) state.filters.search = action.payload.search;
      if (action.payload.genre !== undefined) state.filters.genre = action.payload.genre;
      if (action.payload.sortBy) state.filters.sortBy = action.payload.sortBy;
      if (action.payload.sortOrder) state.filters.sortOrder = action.payload.sortOrder;
    },
    fetchSongsSuccess: (state, action: PayloadAction<PaginatedResponse<Song>>) => {
      state.loading = false;
      state.songs = action.payload.data;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create song
    createSong: (state, action: PayloadAction<CreateSongRequest>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      // Optimistically add to the list if on first page
      if (state.page === 1) {
        state.songs.unshift(action.payload);
        if (state.songs.length > state.limit) {
          state.songs.pop();
        }
      }
      state.total += 1;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update song
    updateSong: (state, action: PayloadAction<UpdateSongRequest>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete song
    deleteSong: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.songs = state.songs.filter(song => song.id !== action.payload);
      state.total -= 1;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch genres
    fetchGenres: (state) => {
      // Loading handled by fetchGenresSuccess
    },
    fetchGenresSuccess: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set filters
    setFilters: (state, action: PayloadAction<Partial<SongsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  fetchGenres,
  fetchGenresSuccess,
  clearError,
  setFilters,
} = songsSlice.actions;

export default songsSlice.reducer;