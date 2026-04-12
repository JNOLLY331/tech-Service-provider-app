import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// State & Auth
import { useAuth } from './store/useAuth';
import { useTheme } from './store/useTheme';

// Layout & Pages
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/admin/Dashboard';
import OrderSuccess from './pages/OrderSuccess';
import List from   './components/shop/List'

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/**
 * Protected route — redirects to /login if not authenticated.
 * Supports adminOnly guard.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const hasToken = localStorage.getItem('token');

  // Token present but Zustand not yet hydrated — show spinner
  if (hasToken && !user) {
    return (
      <div
        className="h-screen w-full flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="spinner" />
        <p
          className="text-[10px] font-black uppercase tracking-[0.3em]"
          style={{ color: 'var(--text-muted)' }}
        >
          Authorizing...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !(user?.is_staff || user?.is_superuser)) {
    console.warn('⛔ ACCESS DENIED: Insufficient Privileges', user);
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * Toaster styles that follow the current theme
 */
function ThemedToaster() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: isDark ? '#16161f' : '#ffffff',
          color: isDark ? '#f0f0ff' : '#0d0d1a',
          borderRadius: '14px',
          fontSize: '13px',
          fontWeight: '600',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)',
        },
        success: { iconTheme: { primary: '#10d99a', secondary: '#fff' } },
        error: { iconTheme: { primary: '#ff4d6a', secondary: '#fff' } },
      }}
    />
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ThemedToaster />
     

      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path='/list' element={<List /> }/>

          {/* Customer Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}