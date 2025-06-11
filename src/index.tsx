import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import './styles/globals.css';

// Components
import Layout from './components/Layout/Layout';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const CommissionedWorks = React.lazy(() => import('./pages/CommissionedWorks'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const OtherWorks = React.lazy(() => import('./pages/OtherWorks'));
const Prints = React.lazy(() => import('./pages/Prints'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/commissioned-works" element={<CommissionedWorks />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/other-works" element={<OtherWorks />} />
              <Route path="/prints" element={<Prints />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#00ff88',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

// Initialize app
const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

const root = createRoot(container);

root.render(<App />); 