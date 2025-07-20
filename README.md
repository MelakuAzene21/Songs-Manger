# Song Manager - Addis Software Test Project

A modern, full-featured song management application built with React, Redux Toolkit, Redux-Saga, and custom Webpack configuration. This project demonstrates advanced frontend development skills with a focus on production-ready code, state management, and modern tooling.

## 🚀 Features

### Core Functionality
- **Complete CRUD Operations**: Create, read, update, and delete songs with optimistic updates (powered by MirageJS mock API)
- **Advanced Pagination**: Efficient pagination with page indicators and navigation
- **Real-time Search**: Debounced search across song titles, artists, and albums
- **Smart Filtering**: Filter by genre with dynamic options
- **Flexible Sorting**: Sort by title, artist, album, year, or genre in ascending/descending order
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Redux Toolkit + Redux-Saga**: Professional state management with side effects handling
- **Custom Webpack Configuration**: Hand-built Webpack setup with advanced optimizations
- **Emotion/Styled System**: Theming system with dark/light mode support
- **Framer Motion**: Smooth animations and micro-interactions
- **TypeScript**: Full type safety throughout the application
- **Mock API**: Realistic API simulation using MirageJS
- **Testing Setup**: Jest + React Testing Library configuration
- **Production Ready**: MirageJS configured to work in production for demo purposes

## 🛠 Technology Stack

- **Frontend Framework**: React 18 (Functional Components + Hooks)
- **State Management**: Redux Toolkit + Redux-Saga
- **Styling**: Emotion + Styled System
- **Build Tool**: Custom Webpack 5 configuration
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **Mock API**: MirageJS
- **Animations**: Framer Motion
- **Code Quality**: ESLint + Prettier

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd song-manager

# Install frontend dependencies
# Install dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start backend server (in one terminal)
cd backend
npm run dev

# Start frontend development server (in another terminal)
# Start development server
npm start

# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues automatically
```

### Backend Scripts
```bash
cd backend
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm test           # Run backend tests
```

## 🏗 Custom Webpack Configuration

This project features a hand-built Webpack configuration (no Create React App) with advanced optimizations:

### Key Webpack Features
- **Custom File Processing Rules**:
  - SVG handling with @svgr/webpack for React components
  - Image optimization with asset/resource
  - Font loading with proper hashing
  - CSS processing with style-loader and css-loader

- **Environment Variables**:
  - dotenv-webpack integration for environment management
  - Dynamic API_BASE_URL configuration
  - Development/production environment handling

- **Performance Optimizations**:
  - Code splitting with SplitChunks plugin
  - Vendor chunking for better caching
  - React library separation for optimal loading
  - Content hashing for cache busting

- **Development Experience**:
  - Hot Module Replacement (HMR)
  - Source maps for debugging
  - Path aliases for cleaner imports (@components, @store, @utils, @types)
  - Auto-opening browser

### Build Configuration Highlights
```javascript
// webpack.config.js key features:
- Custom rules for SVGs, images, and fonts
- Environment variable injection
- Code splitting optimization
- Path aliases for clean imports
- Development server with HMR
- Production optimizations
```

## 🏛 Architecture & Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # Header, Sidebar, Layout components
│   └── Songs/          # Song-related components
├── store/              # Redux store configuration
│   ├── slices/         # Redux Toolkit slices
│   └── sagas/          # Redux-Saga effects
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and API calls
├── hooks/              # Custom React hooks
├── __tests__/          # Test files
├── App.tsx             # Main App component
├── index.tsx           # Entry point
└── mirage.ts           # Mock API server
```

## 🔄 State Management

### Redux Toolkit + Redux-Saga Implementation

**Store Configuration**:
- Centralized state management with Redux Toolkit
- Saga middleware for handling async operations
- Type-safe selectors and actions

**Song Management Flow**:
1. Component dispatches action (e.g., `fetchSongs`)
2. Saga intercepts action and handles API call
3. Saga dispatches success/failure actions
4. Reducer updates state immutably
5. Components re-render with new data

**Key Sagas**:
- `fetchSongsSaga`: Handles song retrieval with pagination/filtering
- `createSongSaga`: Manages song creation with optimistic updates
- `updateSongSaga`: Handles song modifications
- `deleteSongSaga`: Manages song deletion

## 🎨 Design System & Theming

### Emotion + Styled System Implementation
- **Theme Provider**: Centralized theme configuration
- **Dark/Light Mode**: Complete theme switching capability
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color System**: Comprehensive color palette with semantic naming
- **Typography**: Consistent font weights and sizes
- **Spacing**: 8px grid system for consistent layouts

### Animation & Interactions
- **Framer Motion**: Page transitions, card animations, button interactions
- **Micro-interactions**: Hover states, loading spinners, form feedback
- **Layout Animations**: Smooth transitions when adding/removing items

## 📡 API & Data Management

### MirageJS Mock Server
The application uses MirageJS to simulate a realistic backend API:

**Available Endpoints**:
```
GET    /api/songs          # Fetch paginated songs with filters
GET    /api/songs/:id      # Fetch single song
POST   /api/songs          # Create new song
PUT    /api/songs/:id      # Update existing song
DELETE /api/songs/:id      # Delete song
GET    /api/genres         # Fetch available genres
```

**Features**:
- Realistic pagination with total counts
- Search functionality across multiple fields
- Genre filtering
- Sorting by multiple criteria
- Proper HTTP status codes and error handling

### API Integration
- **Error Handling**: Comprehensive error management with user feedback
- **Loading States**: Visual feedback during API operations
- **Optimistic Updates**: Immediate UI updates for better UX
- **Debounced Search**: Efficient search with 500ms delay

## 🧪 Testing

### Test Setup
- **Jest**: Test runner with custom configuration
- **React Testing Library**: Component testing with best practices
- **jsdom**: Browser environment simulation
- **Coverage**: Code coverage reporting

### Test Examples
```typescript
// Component testing with Redux
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SongList from '@components/Songs/SongList';

// Tests include:
- Component rendering
- User interactions
- Redux state integration
- API call simulation
```

## 🚀 Performance Optimizations

### Bundle Optimization
- **Node.js Express Backend**: Professional REST API with comprehensive features
- **In-Memory Database**: 50+ sample songs for demonstration
- **Complete CRUD Operations**: Create, read, update, delete with validation
- **Advanced Features**: Pagination, search, filtering, sorting
- **Security**: CORS, rate limiting, input validation, helmet security headers
- **Error Handling**: Comprehensive error management and logging

### Runtime Performance
- **React.memo**: Preventing unnecessary re-renders
- **Debounced Search**: Reducing API calls
- **Optimistic Updates**: Immediate UI feedback
- **Efficient Selectors**: Memoized state selections

## 🔧 Development Workflow

### Code Quality
- **ESLint**: Code linting with React and TypeScript rules
- **TypeScript**: Full type safety with strict configuration
- **Git Hooks**: Pre-commit linting and formatting
- **Path Aliases**: Clean import statements

### Development Features
- **Hot Module Replacement**: Instant code updates
- **Source Maps**: Debugging support
- **Error Boundaries**: Graceful error handling
- **DevTools**: Redux DevTools integration

## 🌐 Deployment

### Build Process
```bash
npm run build
```
Creates optimized production build in `dist/` directory with:
- Minified JavaScript and CSS
- Asset optimization and compression
- Source maps for debugging
- Cache-friendly file naming

### Deployment Targets
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect GitHub repository for auto-deployment
- **Traditional Hosting**: Upload `dist/` contents to web server

## 🎯 AI Tool Usage Disclosure

**AI Assistance Used**: This project was developed with assistance from Claude AI for:
- Initial project structure and Webpack configuration
- Redux-Saga boilerplate and best practices
- Component architecture recommendations
- TypeScript type definitions

**Manual Implementation**: All core business logic, state management flow, and component interactions were implemented manually with full understanding of the codebase.

**Verification Process**:
1. **Code Review**: Every AI-generated piece was reviewed and understood
2. **Testing**: Comprehensive testing ensures all functionality works as expected
3. **Customization**: Significant customization and optimization beyond initial AI suggestions
4. **Documentation**: Complete understanding demonstrated through detailed documentation

## 🔮 Future Enhancements

### Planned Features
- [ ] Advanced playlist management
- [ ] Audio playback integration
- [ ] Song file upload functionality
- [ ] Social features (sharing, favorites)
- [ ] Advanced analytics dashboard
- [ ] Bulk operations (import/export)

### Technical Improvements
- [ ] Service Worker for offline functionality
- [ ] GraphQL API integration
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] A11y compliance improvements

## 📄 License

MIT License - Feel free to use this project for learning and development purposes.

---

**Project Status**: ✅ Production Ready

This application demonstrates professional-grade frontend development with modern tools, best practices, and production-ready architecture. The codebase is fully documented, tested, and optimized for performance and maintainability.