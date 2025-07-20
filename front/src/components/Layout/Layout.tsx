import React from 'react';
import styled from '@emotion/styled';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from '@utils/theme';
import Header from './Header';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div<{ theme: any }>`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 70px;
    min-height: calc(100vh - 70px);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTypedSelector(state => state.app.theme);
  const sidebarOpen = useTypedSelector(state => state.app.sidebarOpen);
  
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <LayoutContainer>
        <Header />
        <Sidebar />
        <MainContent sidebarOpen={sidebarOpen}>
          {children}
        </MainContent>
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;