import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, LayoutDashboard, LogOut, 
  ShieldCheck, Menu, X, ChevronRight,
  User, LogIn, Settings, ShieldAlert, Home, Zap
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useCart } from '../../store/useCart';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const { isAuthenticated, user, logout } = useAuth();
  const cart = useCart((state) => state.cart) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Logic to show admin icon: Checks decoded JWT claims
  const isAdmin = user?.is_staff || user?.is_superuser;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18}/> },
    { name: 'Software', path: '/category/software', icon: <Settings size={18}/> },
    { name: 'Cyber Ops', path: '/category/cyber', icon: <ShieldAlert size={18}/> },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] shadow-xl transition-all duration-500 border-b ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-gray-500 py-3 shadow-sm' 
        : 'bg-white border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-lg shadow-zinc-200">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none uppercase">
              Jnolly<span className="text-blue-600">.</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase">Cyber Works</span>
          </div>
        </Link>

        {/* --- CENTER NAVIGATION (Desktop) --- */}
        <div className="hidden md:flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                location.pathname === link.path 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Admin Dashboard Icon (Strict Role Check) */}
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-700 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-zinc-200"
              title="Admin Console"
            >
              <Zap size={16} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase py-3 tracking-widest">Dashboard</span>
            </Link>
          )}

          {/* Cart Hub */}
          <Link to="/cart" className="relative p-2.5 text-zinc-600 hover:text-blue-600 transition-all">
            <ShoppingCart size={21} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Button (Desktop) */}
          <div className="hidden lg:block ml-2">
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="px-5 py-3 hover:bg-blue-400 border text-700 border-zinc-200 text-white rounded-xl text-[16px] font-black bg-blue-600  hover:bg--50 transition-all flex items-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-7 py-4 border text-700 border-zinc-200 text-white rounded-xl text-[16px] font-black bg-blue-500  hover:bg--50 transition-all flex items-center gap-2"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2.5 bg-zinc-950 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            <Menu size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* --- SIDEBAR (Mobile) --- */}
      <div 
        className={`fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[190] transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside 
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[200] shadow-2xl transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-8 flex justify-between items-center border-b border-zinc-50">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">
              {isAuthenticated ? user?.email : 'Guest user'} <span className="lowercase text-[10px] ml-15  text-green-500">welcome back</span>
            </h3>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">System Portal</p>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-zinc-100 rounded-xl transition-all">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 p-6 space-x-20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 p-5 rounded-2xl hover:bg-zinc-50 group transition-all"
            >
              <span className="text-zinc-400 group-hover:text-blue-600">{link.icon}</span>
              <span className="font-black text-sm uppercase tracking-tight">{link.name}</span>
            </Link>
          ))}
          
          {/* Mobile Admin Link */}
          <div className="flex space-x-5 mt-25 p-5">
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-0 px-5 py-0 rounded-2xl bg-zinc-900 text-white shadow-xl"
            >
              <Zap size={18} className="text-blue-400" />
              <span className="font-black text-sm ">Dashboard</span>
            </Link>
          )}

          {
            isAuthenticated?(
              <button onClick={logout} className="w-full text-white py-5 bg-blue-800  rounded-2xl font-black flex items-center justify-center gap-2">
              <LogOut size={18} /> Sign out
            </button>
            ):(
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-center block uppercase tracking-widest shadow-xl shadow-blue-100">
              sign in
            </Link>
          )
            }
        </div>
        </div>
      </aside>
    </nav>
  );
}