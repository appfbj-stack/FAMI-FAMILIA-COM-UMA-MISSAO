
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ChurchPage from './pages/ChurchPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/church/:id" element={<ChurchPage />} />
      </Routes>
    </div>
  );
}

export default App;
