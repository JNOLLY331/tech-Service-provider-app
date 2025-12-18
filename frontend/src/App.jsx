import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// State & Auth 
import { useAuth } from './store/useAuth';

// Layout & Pages
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Product from './pages/Product';
import Dashboard from './pages/admin/Dashboard';
import OrderSuccess from './pages/OrderSuccess';

/**
 * 🛰️ Scroll To Top Helper
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/**
 * 🛡️ Protected Route Logic
 * Fixes the "1-second flash" by validating roles before rendering.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const hasToken = localStorage.getItem('token');

  // 1. If we have a token but Zustand isn't ready yet, show a loader
  if (hasToken && !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-zinc-100 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Authorizing Terminal...</p>
      </div>
    );
  }

  // 2. Not logged in? Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Trying to access Admin area without permissions?
  if (adminOnly && !(user?.is_staff || user?.is_superuser)) {
    console.warn("⛔ ACCESS DENIED: Insufficient Privileges", user);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: { 
            background: '#09090b', 
            color: '#fff', 
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          },
        }} 
      />
      
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="home" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />

          {/* 🛒 Customer Protected Route */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />

          {/* ⚡ Admin Command Center */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}