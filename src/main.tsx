import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import AiGuidePage from './pages/AiGuidePage';
import { FloatingGuideAI } from './components/FloatingGuideAI';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FloatingGuideAI />
      <Routes>
        <Route path="/"             element={<App />}              />
        <Route path="/about"        element={<AboutPage />}        />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/blog"         element={<BlogPage />}         />
        <Route path="/booking"      element={<BookingPage />}      />
        <Route path="/ai-guide"     element={<AiGuidePage />}      />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
