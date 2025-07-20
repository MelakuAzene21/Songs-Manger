import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { createSong, updateSong, fetchGenres } from '@store/slices/songsSlice';
import { Song, CreateSongRequest } from '@types/index';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const FormContainer = styled(motion.div)<{ theme: any }>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 32px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const FormTitle = styled.h2<{ theme: any }>`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 24px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label<{ theme: any }>`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const Input = styled.input<{ theme: any; error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Select = styled.select<{ theme: any; error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div<{ theme: any }>`
  color: ${props => props.theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const Button = styled(motion.button)<{ theme: any; variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primaryHover});
    color: white;
  ` : `
    background-color: ${props.theme.colors.secondary};
    color: ${props.theme.colors.text};
  `}
`;

interface SongFormProps {
  song?: Song | null;
  onClose: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ song, onClose }) => {
  const dispatch = useDispatch();
  const { loading, genres } = useTypedSelector(state => state.songs);
  
  const [formData, setFormData] = useState<CreateSongRequest>({
    title: song?.title || '',
    artist: song?.artist || '',
    album: song?.album || '',
    year: song?.year || new Date().getFullYear(),
    duration: song?.duration || 180,
    genre: song?.genre || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.album.trim()) {
      newErrors.album = 'Album is required';
    }

    if (formData.year < 1000 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }

    if (formData.duration < 1 || formData.duration > 3600) {
      newErrors.duration = 'Duration must be between 1 and 3600 seconds';
    }

    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (song) {
      dispatch(updateSong({ ...formData, id: song.id }));
    } else {
      dispatch(createSong(formData));
    }
    
    onClose();
  };

  const handleChange = (field: keyof CreateSongRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDurationInput = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const parseDurationInput = (value: string): number => {
    const parts = value.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    }
    return parseInt(value) || 0;
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <FormContainer
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FormTitle>{song ? 'Edit Song' : 'Add New Song'}</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title *</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter song title"
              error={!!errors.title}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Artist *</Label>
            <Input
              type="text"
              value={formData.artist}
              onChange={(e) => handleChange('artist', e.target.value)}
              placeholder="Enter artist name"
              error={!!errors.artist}
            />
            {errors.artist && <ErrorMessage>{errors.artist}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Album *</Label>
            <Input
              type="text"
              value={formData.album}
              onChange={(e) => handleChange('album', e.target.value)}
              placeholder="Enter album name"
              error={!!errors.album}
            />
            {errors.album && <ErrorMessage>{errors.album}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Year *</Label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
              placeholder="Enter release year"
              min="1000"
              max={new Date().getFullYear() + 1}
              error={!!errors.year}
            />
            {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Duration (MM:SS) *</Label>
            <Input
              type="text"
              value={formatDurationInput(formData.duration)}
              onChange={(e) => handleChange('duration', parseDurationInput(e.target.value))}
              placeholder="3:45"
              error={!!errors.duration}
            />
            {errors.duration && <ErrorMessage>{errors.duration}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Genre *</Label>
            <Select
              value={formData.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
              error={!!errors.genre}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </Select>
            {errors.genre && <ErrorMessage>{errors.genre}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Saving...' : song ? 'Update Song' : 'Add Song'}
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Overlay>
  );
};

export default SongForm;