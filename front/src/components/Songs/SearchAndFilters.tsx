import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchSongs, setFilters } from '@store/slices/songsSlice';
import { motion } from 'framer-motion';

const FilterContainer = styled.div<{ theme: any }>`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SearchGroup = styled.div`
  position: relative;
`;

const SearchInput = styled.input<{ theme: any }>`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid ${props => props.theme.colors.border};
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

const SearchIcon = styled.div<{ theme: any }>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
`;

const Select = styled.select<{ theme: any }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  transition: border-color 0.2s ease;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ClearButton = styled(motion.button)<{ theme: any }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ResultsInfo = styled.div<{ theme: any }>`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const SearchAndFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, total, page, limit, genres } = useTypedSelector(state => state.songs);
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.search) {
        dispatch(setFilters({ search: searchTerm }));
        dispatch(fetchSongs({ page: 1, limit, ...filters, search: searchTerm }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch, filters, limit]);

  const handleGenreChange = (genre: string) => {
    const newFilters = { ...filters, genre };
    dispatch(setFilters(newFilters));
    dispatch(fetchSongs({ page: 1, limit, ...newFilters }));
  };

  const handleSortChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    dispatch(setFilters(newFilters));
    dispatch(fetchSongs({ page, limit, ...newFilters }));
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      search: '',
      genre: '',
      sortBy: 'title' as const,
      sortOrder: 'asc' as const,
    };
    setSearchTerm('');
    dispatch(setFilters(defaultFilters));
    dispatch(fetchSongs({ page: 1, limit, ...defaultFilters }));
  };

  const hasActiveFilters = filters.search || filters.genre || filters.sortBy !== 'title' || filters.sortOrder !== 'asc';

  return (
    <FilterContainer>
      <FilterGrid>
        <SearchGroup>
          <SearchIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchGroup>

        <Select
          value={filters.genre}
          onChange={(e) => handleGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Select>

        <Select
          value={filters.sortBy}
          onChange={(e) => handleSortChange('sortBy', e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
          <option value="year">Sort by Year</option>
          <option value="genre">Sort by Genre</option>
        </Select>

        <Select
          value={filters.sortOrder}
          onChange={(e) => handleSortChange('sortOrder', e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>

        {hasActiveFilters && (
          <ClearButton
            onClick={handleClearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Filters
          </ClearButton>
        )}
      </FilterGrid>

      <ResultsInfo>
        Showing {Math.min(limit, total)} of {total} songs
        {filters.search && ` matching "${filters.search}"`}
        {filters.genre && ` in ${filters.genre}`}
      </ResultsInfo>
    </FilterContainer>
  );
};

export default SearchAndFilters;