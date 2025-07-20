import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@types/index';

interface AppState {
  theme: Theme;
  sidebarOpen: boolean;
}

const initialState: AppState = {
  theme: (localStorage.getItem('theme') as Theme) || 'light',
  sidebarOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setTheme, toggleTheme, setSidebarOpen, toggleSidebar } = appSlice.actions;
export default appSlice.reducer;