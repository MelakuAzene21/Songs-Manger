import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { setSidebarOpen } from '@store/slices/appSlice';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarOverlay = styled(motion.div)<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarContainer = styled(motion.aside)<{ theme: any }>`
  position: fixed;
  top: 80px;
  left: 0;
  width: 280px;
  height: calc(100vh - 80px);
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 24px;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    top: 70px;
    height: calc(100vh - 70px);
    transform: translateX(-100%);
  }
`;

const SidebarSection = styled.div<{ theme: any }>`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3<{ theme: any }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NavItem = styled(motion.div)<{ theme: any; active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  margin-bottom: 4px;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#ffffff' : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primaryHover : props.theme.colors.secondary};
  }
`;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useTypedSelector(state => state.app.sidebarOpen);

  const closeSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <SidebarOverlay
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeSidebar}
          />
          <SidebarContainer
            variants={sidebarVariants}
            initial={{ x: 0 }}
            animate={{ x: sidebarOpen ? 0 : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <SidebarSection>
              <SectionTitle>Navigation</SectionTitle>
              <NavItem active whileHover={{ x: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                All Songs
              </NavItem>
              <NavItem whileHover={{ x: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4"/>
                  <polyline points="9,11 12,4 15,11"/>
                </svg>
                Favorites
              </NavItem>
              <NavItem whileHover={{ x: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                Recently Played
              </NavItem>
            </SidebarSection>

            <SidebarSection>
              <SectionTitle>Playlists</SectionTitle>
              <NavItem whileHover={{ x: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Playlist
              </NavItem>
            </SidebarSection>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;