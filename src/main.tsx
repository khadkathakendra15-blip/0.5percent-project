import { StrictMode, Suspense, lazy, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import { FloatingGuideAI } from './components/FloatingGuideAI';
import { SiteFooter } from './components/ui/vfy-home-sections';
import './index.css';

const AboutPage        = lazy(() => import('./pages/AboutPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const BlogPage         = lazy(() => import('./pages/BlogPage'));
const BlogPostPage     = lazy(() => import('./pages/BlogPostPage'));
const BookingPage      = lazy(() => import('./pages/BookingPage'));
const AiGuidePage      = lazy(() => import('./pages/AiGuidePage'));
const YatraNepalkoPage = lazy(() => import('./pages/YatraNepalkoPage'));

const PAGE_TITLES: Record<string, string> = {
  '/':             '0.5% Vision — Nepal',
  '/about':        'About — 0.5% Vision',
  '/destinations': 'Destinations — 0.5% Vision',
  '/blog':         'Stories — 0.5% Vision',
  '/booking':      'Plan Your Trip — 0.5% Vision',
  '/ai-guide':     'Guide AI — 0.5% Vision',
  '/yatra':        'Yatra Nepalko — 0.5% Vision',
};

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.title = PAGE_TITLES[pathname] || '0.5% Vision — Nepal';
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh', background: '#FDFAF4',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '34px', height: '34px', margin: '0 auto 16px',
          border: '2px solid rgba(26,19,12,0.10)', borderTopColor: '#BE1538',
          borderRadius: '50%', animation: 'vfy-spin 0.8s linear infinite',
        }} />
        <div style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '9px',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: '#A89A86',
        }}>
          0.5% Vision
        </div>
      </div>
      <style>{`@keyframes vfy-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteEffects />
      <FloatingGuideAI />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"             element={<App />}              />
          <Route path="/about"        element={<AboutPage />}        />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/blog"         element={<BlogPage />}         />
          <Route path="/blog/:slug"   element={<BlogPostPage />}     />
          <Route path="/booking"      element={<BookingPage />}      />
          <Route path="/ai-guide"     element={<AiGuidePage />}      />
          <Route path="/yatra"        element={<YatraNepalkoPage />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </BrowserRouter>
  </StrictMode>
);
