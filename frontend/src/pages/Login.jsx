import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { ChevronRight, Mail, Lock, User, Phone, Loader2, ArrowLeftRight } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', first_name: '', phone_number: '' });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 THE REDIRECT LOGIC
  // If user was redirected here from /cart, 'from' will be /cart. Otherwise, /
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Hits your Django Custom User endpoint
        const { data } = await api.post('users/login/', { 
          email: formData.email, 
          password: formData.password 
        });

        login(data.access); // Save to Zustand + LocalStorage
        toast.success("Authentication successful!");

        // 🚀 PERFORM REDIRECT
        // replace: true prevents the user from clicking "Back" into the login form
        navigate(from, { replace: true });

      } else {
        await api.post('users/register/', formData);
        toast.success("Account created! Please sign in.");
        setIsLogin(true);
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) toast.error("Invalid credentials.");
      else if (status === 403) toast.error("Forbidden: Check Django CSRF/CORS settings.");
      else toast.error("Network error. Is the Django server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden relative" data-aos="zoom-in">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
        
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black tracking-tighter">{isLogin ? 'Sign In' : 'Join Jnolly'}</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Cyber Works Portal Access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="first_name" type="text" placeholder="Name" required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={handleInputChange} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="phone_number" type="text" placeholder="Phone" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={handleInputChange} />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input name="email" type="email" placeholder="Email" required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={handleInputChange} />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input name="password" type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={handleInputChange} />
          </div>

          <button disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <><span>{isLogin ? 'Enter' : 'Create'}</span><ChevronRight size={20}/></>}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="mt-8 w-full text-center text-sm font-bold text-gray-400 flex items-center justify-center gap-2 hover:text-blue-600 transition-colors">
          <ArrowLeftRight size={14} /> {isLogin ? "Need an account? Register" : "Already a member? Login"}
        </button>
      </div>
    </div>
  );
}