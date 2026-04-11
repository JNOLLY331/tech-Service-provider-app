import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  ShoppingCart, LayoutDashboard, LogOut,
  ShieldCheck, Menu, X,
  User, LogIn, Home, Cpu, Sun, Moon,
  Zap, Globe, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useCart } from '../../store/useCart';
import { useTheme } from '../../store/useTheme';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();
  const cart = useCart((state) => state.cart) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { theme, toggleTheme } = useTheme();

  const isAdmin = user?.is_staff || user?.is_superuser;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={16} /> },
    { name: 'Services', path: '/category/services', icon: <Cpu size={16} /> },
    { name: 'Portfolio', path: '/category/portfolio', icon: <Globe size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className="fixed top-0 w-full z-[100] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? `1px solid var(--nav-border)` : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #a78bfa 100%)',
                boxShadow: '0 4px 16px var(--accent-glow)',
              }}
            >
              <ShieldCheck className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-black tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Jnolly<span style={{ color: 'var(--accent-primary)' }}>.</span>
              </span>
              <span
                className="text-[8px] font-bold tracking-[0.25em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                Cyber Works
              </span>
            </div>
          </Link>

          {/* ── CENTER NAV (Desktop) ── */}
          <div
            className="hidden md:flex items-center gap-1 p-1 rounded-2xl"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: isActive(link.path) ? 'var(--accent-subtle)' : 'transparent',
                  color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: isActive(link.path) ? '1px solid rgba(91,91,255,0.2)' : '1px solid transparent',
                }}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark'
                ? <Sun size={17} strokeWidth={2} />
                : <Moon size={17} strokeWidth={2} />
              }
            </button>

            {/* Admin Badge */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(91,91,255,0.2)',
                }}
                title="Admin Dashboard"
              >
                <Zap size={14} />
                <span className="uppercase tracking-wider">Dashboard</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              id="cart-nav-btn"
              className="relative p-2.5 rounded-xl transition-all duration-200 hover:scale-110"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: cartCount > 0 ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              <ShoppingCart size={18} strokeWidth={2} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-[9px] font-black text-white cart-badge-update"
                  style={{ background: 'var(--accent-primary)' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth (Desktop) */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white"
                      style={{ background: 'var(--accent-primary)' }}
                    >
                      {user?.email?.[0]?.toUpperCase() || 'Me'}
                    </div>
                    <span className="text-xs font-bold max-w-[100px] truncate" style={{ color: 'var(--text-secondary)' }}>
                      {user?.first_name || user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    id="logout-btn"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: 'var(--red-bg)',
                      color: 'var(--red)',
                      border: '1px solid rgba(255,77,106,0.2)',
                    }}
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  id="signin-nav-btn"
                  className="btn-primary"
                  style={{ paddingTop: '0.6rem', paddingBottom: '0.6rem' }}
                >
                  <LogIn size={15} />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl transition-all active:scale-95"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[190] lg:hidden transition-all"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-[380px] z-[200] shadow-2xl lg:hidden flex flex-col transition-transform duration-500 ease-in-out"
        style={{
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}
            >
              {isAuthenticated
                ? <span className="text-xs font-black">{user?.email?.[0]?.toUpperCase()}</span>
                : <User size={15} />
              }
            </div>
            <div>
              <p className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>
                {isAuthenticated ? (user?.first_name || user?.email?.split('@')[0]) : 'Guest'}
              </p>
              <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>
                {isAuthenticated ? 'Logged In' : 'Anonymous user'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-xl transition-all hover:text-white"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{
                background: isActive(link.path) ? 'var(--accent-subtle)' : 'transparent',
                color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              {link.icon}
              <span className="font-bold text-sm">{link.name}</span>
            </Link>
          ))}

          {isAuthenticated && isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}
            >
              <Zap size={16} />
              <span className="font-bold text-sm">Admin Dashboard</span>
            </Link>
          )}
        </div>

        {/* Drawer Footer */}
        <div
          className="p-4 space-y-3"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {/* Theme toggle in mobile */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 p-4 rounded-xl font-bold text-sm transition-all"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => { logout(); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all"
              style={{ background: 'var(--red-bg)', color: 'var(--red)' }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary w-full"
              style={{ borderRadius: '0.5rem' }}
            >
              <LogIn size={16} /> Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}