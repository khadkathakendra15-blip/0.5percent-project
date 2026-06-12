import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import AiGuidePage from './pages/AiGuidePage';
import YatraNepalkoPage from './pages/YatraNepalkoPage';
import { FloatingGuideAI } from './components/FloatingGuideAI';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <FloatingGuideAI />
      <Routes>
        <Route path="/"             element={<App />}              />
        <Route path="/about"        element={<AboutPage />}        />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/blog"         element={<BlogPage />}         />
        <Route path="/booking"      element={<BookingPage />}      />
        <Route path="/ai-guide"     element={<AiGuidePage />}      />
        <Route path="/yatra"        element={<YatraNepalkoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
