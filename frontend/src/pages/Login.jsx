import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { ChevronRight, Mail, Lock, User, Phone, Loader2, ArrowLeftRight, ShieldCheck } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', first_name: '', phone_number: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to the page the user was trying to reach
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Django returns { access: '...', refresh: '...' }
        const { data } = await api.post('users/login/', {
          email: formData.email,
          password: formData.password,
        });

        login(data.access, data.refresh); // ← pass both tokens
        toast.success('Welcome back!');
        navigate(from, { replace: true });

      } else {
        // Registration: only needs email, password, first_name, phone_number
        await api.post('users/register/', {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          phone_number: formData.phone_number || undefined,
        });
        toast.success('Account created! Please sign in.');
        setIsLogin(true);
        setFormData(prev => ({ ...prev, first_name: '', phone_number: '' }));
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 401) {
        toast.error('Invalid email or password.');
      } else if (status === 400) {
        // Surface field-level validation errors from DRF
        const msgs = Object.values(data || {}).flat().join(' ');
        toast.error(msgs || 'Invalid input.');
      } else if (status === 403) {
        toast.error('Forbidden — check CORS/CSRF settings.');
      } else {
        toast.error('Network error. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div
        className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden relative"
        data-aos="zoom-in"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500" />

        {/* Logo mark */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-blue-400" size={28} />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black tracking-tighter">
            {isLogin ? 'Sign In' : 'Join Jnolly'}
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {isLogin ? 'Access your Cyber Works account' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium"
                  onChange={handleInputChange}
                  value={formData.first_name}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="phone_number"
                  type="tel"
                  placeholder="Phone (optional)"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium"
                  onChange={handleInputChange}
                  value={formData.phone_number}
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={8}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 shadow-xl shadow-zinc-100"
          >
            {loading
              ? <Loader2 className="animate-spin" size={20} />
              : <><span>{isLogin ? 'Sign In' : 'Create Account'}</span><ChevronRight size={18} /></>
            }
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-8 w-full text-center text-sm font-bold text-gray-400 flex items-center justify-center gap-2 hover:text-blue-600 transition-colors"
        >
          <ArrowLeftRight size={14} />
          {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}