import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SongList from '@components/Songs/SongList';
import songsReducer from '@store/slices/songsSlice';
import appReducer from '@store/slices/appSlice';

const mockStore = configureStore({
  reducer: {
    songs: songsReducer,
    app: appReducer,
  },
  preloadedState: {
    songs: {
      songs: [
        {
          id: '1',
          title: 'Test Song',
          artist: 'Test Artist',
          album: 'Test Album',
          year: 2023,
          duration: 180,
          genre: 'Rock',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ],
      loading: false,
      error: null,
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
      filters: {
        search: '',
        genre: '',
        sortBy: 'title',
        sortOrder: 'asc',
      },
      genres: ['Rock', 'Pop', 'Jazz'],
    },
    app: {
      theme: 'light',
      sidebarOpen: false,
    },
  },
});

describe('SongList', () => {
  it('renders songs correctly', () => {
    render(
      <Provider store={mockStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('by Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

  it('displays add song button', () => {
    render(
      <Provider store={mockStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByText('Add Song')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for each song', () => {
    render(
      <Provider store={mockStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});