import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Collections from './pages/Collections';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:collectionId" element={<Collections />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;