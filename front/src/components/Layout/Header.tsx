import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { toggleTheme, toggleSidebar } from '@store/slices/appSlice';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    height: 70px;
    padding: 0 16px;
  }
`;

const Logo = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled(motion.button)<{ theme: any }>`
  width: 44px;
  height: 44px;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const MobileMenuButton = styled(IconButton)<{ theme: any }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTypedSelector(state => state.app.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <MobileMenuButton
          onClick={handleSidebarToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MobileMenuButton>
        <Logo>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          Song Manager
        </Logo>
      </div>
      <HeaderActions>
        <IconButton
          onClick={handleThemeToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </IconButton>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;