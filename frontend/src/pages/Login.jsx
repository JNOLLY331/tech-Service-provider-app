import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import {
  ChevronRight, Mail, Lock, User, Phone,
  Loader2, ArrowLeftRight, ShieldCheck, Eye, EyeOff, Zap
} from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PERKS = [
  "Order tech services online, pay via M-Pesa",
  "Track your service requests in real-time",
  "Exclusive deals for registered clients",
  "First access to new services & offerings",
];

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', first_name: '', phone_number: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await api.post('users/login/', {
          email: formData.email,
          password: formData.password,
        });
        login(data.access, data.refresh);
        toast.success('Welcome back! 👋');
        navigate(from, { replace: true });
      } else {
        await api.post('users/register/', {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          phone_number: formData.phone_number || undefined,
        });
        toast.success('Account created! Please sign in. 🎉');
        setIsLogin(true);
        setFormData((p) => ({ ...p, first_name: '', phone_number: '' }));
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 401) toast.error('Invalid email or password.');
      else if (status === 400) toast.error(Object.values(data || {}).flat().join(' ') || 'Invalid input.');
      else if (status === 403) toast.error('Forbidden — check CORS settings.');
      else toast.error('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center p-6"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
        style={{ boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)' }}
      >
        {/* ── LEFT PANEL (decorative, desktop only) ── */}
        <div
          className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 50%, #a78bfa 100%)',
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <div>
                <p className="font-black text-white text-base leading-none">
                  Jnolly<span className="text-white/60">.</span>
                </p>
                <p className="text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase">
                  Cyber Works
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white leading-tight mb-4">
              {isLogin ? 'Welcome\nBack.' : 'Join the\nTeam.'}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-10">
              {isLogin
                ? 'Sign in to access your Jnolly Cyber Works account and manage your services.'
                : 'Create a free account and start ordering professional tech services instantly.'
              }
            </p>

            <ul className="space-y-3">
              {PERKS.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap size={10} className="text-white" />
                  </div>
                  <span className="text-white/80 text-xs leading-relaxed font-medium">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <p className="text-white/40 text-xs">
              © 2026 Jnolly Cyber Works, Eldoret Kenya
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL (form) ── */}
        <div
          className="flex flex-col justify-center p-10 lg:p-12"
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="mb-8">
            <h2
              className="text-3xl font-black tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isLogin
                ? 'Enter your credentials to continue.'
                : 'Fill in your details to get started.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    size={17}
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    name="first_name"
                    type="text"
                    placeholder="Your first name"
                    required
                    className="form-input pl-11"
                    onChange={handleInputChange}
                    value={formData.first_name}
                  />
                </div>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    size={17}
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    name="phone_number"
                    type="tel"
                    placeholder="Phone number (optional)"
                    className="form-input pl-11"
                    onChange={handleInputChange}
                    value={formData.phone_number}
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={17}
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="form-input pl-11"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={17}
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                minLength={8}
                className="form-input pl-11 pr-12"
                onChange={handleInputChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs font-bold transition-colors"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="auth-submit-btn"
              className="btn-primary w-full py-4"
              style={{ borderRadius: '0.875rem', marginTop: '0.5rem' }}
            >
              {loading
                ? <Loader2 className="animate-spin" size={20} />
                : <><span>{isLogin ? 'Sign In' : 'Create Account'}</span><ChevronRight size={18} /></>
              }
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 w-full text-center text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeftRight size={14} />
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
              {isLogin ? 'Register' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}