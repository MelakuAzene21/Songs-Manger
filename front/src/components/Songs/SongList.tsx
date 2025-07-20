import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchSongs, deleteSong, clearError } from '@store/slices/songsSlice';
import { Song } from '@types/index';
import { formatDuration } from '@utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';
import SongForm from './SongForm';
import SearchAndFilters from './SearchAndFilters';
import Pagination from './Pagination';

const Container = styled.div<{ theme: any }>`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1<{ theme: any }>`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const AddButton = styled(motion.button)<{ theme: any }>`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SongCard = styled(motion.div)<{ theme: any }>`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 20px;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const SongTitle = styled.h3<{ theme: any }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const SongArtist = styled.p<{ theme: any }>`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 12px 0;
`;

const SongDetails = styled.div<{ theme: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  color: ${props => props.theme.colors.textSecondary};
`;

const DetailItem = styled.div<{ theme: any }>`
  display: flex;
  justify-content: space-between;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(motion.button)<{ theme: any; variant?: 'primary' | 'danger' }>`
  padding: 8px 12px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'danger' ? `
    background-color: ${props.theme.colors.error};
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
  ` : `
    background-color: ${props.theme.colors.secondary};
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      color: white;
    }
  `}
`;

const LoadingState = styled.div<{ theme: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorState = styled.div<{ theme: any }>`
  background-color: ${props => props.theme.colors.error}20;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 16px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.error};
`;

const EmptyState = styled.div<{ theme: any }>`
  text-align: center;
  padding: 48px 24px;
  color: ${props => props.theme.colors.textSecondary};
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, total, page, limit, totalPages, filters } = useTypedSelector(state => state.songs);
  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongs({ page, limit, ...filters }));
  }, [dispatch, page, limit, filters]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(id));
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSong(null);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchSongs({ page: newPage, limit, ...filters }));
  };

  if (error) {
    return (
      <Container>
        <ErrorState>
          Error: {error}
          <button onClick={() => dispatch(clearError())}>Dismiss</button>
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Music Library</Title>
        <AddButton
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Song
        </AddButton>
      </Header>

      <SearchAndFilters />

      {loading && (
        <LoadingState>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </motion.div>
        </LoadingState>
      )}

      <AnimatePresence>
        {!loading && songs.length === 0 ? (
          <EmptyState>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 16px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10,8 16,12 10,16 10,8"></polygon>
            </svg>
            <p>No songs found. Add your first song to get started!</p>
          </EmptyState>
        ) : (
          <SongGrid>
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                layoutId={song.id}
              >
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>by {song.artist}</SongArtist>
                <SongDetails>
                  <DetailItem>
                    <span>Album:</span>
                    <span>{song.album}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>Year:</span>
                    <span>{song.year}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>Genre:</span>
                    <span>{song.genre}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>Duration:</span>
                    <span>{formatDuration(song.duration)}</span>
                  </DetailItem>
                </SongDetails>
                <ActionButtons>
                  <ActionButton
                    onClick={() => handleEdit(song)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => handleDelete(song.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </ActionButton>
                </ActionButtons>
              </SongCard>
            ))}
          </SongGrid>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <AnimatePresence>
        {showForm && (
          <SongForm
            song={editingSong}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default SongList;