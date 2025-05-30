import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Discover = React.lazy(() => import('./pages/Discover'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Collections = React.lazy(() => import('./pages/Collections'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:collectionId" element={<Collections />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;