export const lightTheme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#5855eb',
    secondary: '#f1f5f9',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

export const darkTheme = {
  colors: {
    primary: '#818cf8',
    primaryHover: '#6366f1',
    secondary: '#1e293b',
    accent: '#fbbf24',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

export type ThemeType = typeof lightTheme;