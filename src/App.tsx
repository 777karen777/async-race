import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GaragePage from './pages/GaragePage';
import WinnersPage from './pages/WinnersPage';

const App: React.FC = () => {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          gap: '10px',
          padding: '10px',
          background: '#eee',
        }}
      >
        <Link to="/">Garage</Link>
        <Link to="/winners">Winners</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GaragePage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
    </div>
  );
};

export default App;
