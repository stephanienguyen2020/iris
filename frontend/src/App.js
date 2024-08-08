import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DetectPage from './pages/DetectPage';
import ReviewPage from './pages/ReviewPage';
import PublishPage from './pages/PublishPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
  <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/publish" element={<PublishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
