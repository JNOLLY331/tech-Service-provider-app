import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Trash2, ShoppingBag, Plus, Minus, ArrowRight, 
  CreditCard, User, MapPin, Database, RefreshCw, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useCart } from '../store/useCart';

export default function Cart() {
  const { cart = [], removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    postal_code: '',
    city: 'Nairobi'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    
    setIsProcessing(true);
    const loadingToast = toast.loading("VERIFYING PRODUCT DATABASE...");

    try {
      const orderPayload = {
        ...formData,
        items_data: cart.map(item => ({
          // 🎯 Sending the ID stored in LocalStorage
          product_id: item.id,
          quantity: item.quantity
        })),
        total_price: subtotal 
      };

      const response = await api.post('orders/', orderPayload);

      if (response.status === 201) {
        toast.success("ORDER VERIFIED & DEPLOYED", { id: loadingToast });
        clearCart();
        navigate(`/order-success/${response.data.id}`);
      }
    } catch (err) {
      console.error("API_SYNC_ERROR:", err.response?.data);
      
      // Specifically catching the 404 "No Product matches" error
      const errorMsg = err.response?.status === 404 
        ? "SYNC ERROR: SOME PRODUCTS DO NOT EXIST IN DATABASE" 
        : "TRANSACTION REJECTED";
      
      toast.error(errorMsg.toUpperCase(), { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-zinc-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-zinc-100 shadow-inner">
          <ShoppingBag size={40} className="text-zinc-200" />
        </div>
        <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-10 italic">Empty Repository</h2>
        <Link to="/" className="bg-zinc-950 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200">
          Sync New Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 font-sans">
      <div className="mb-16 border-b border-zinc-100 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 uppercase italic leading-none">Checkout<span className="text-blue-600">.</span></h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4">System: Order Serialization Protocol</p>
        </div>
        <button 
          type="button"
          onClick={() => { clearCart(); toast.success("LOCAL STORAGE PURGED"); }}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-6 py-3 rounded-xl transition-all border border-red-100 shadow-sm"
        >
          <RefreshCw size={14} /> Reset Cart Sync
        </button>
      </div>

      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- SHIPPING & DATA --- */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3 text-zinc-400">
              <User size={16} className="text-blue-600" /> Destination Logistics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input required name="first_name" placeholder="FIRST NAME" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
              <input required name="last_name" placeholder="LAST NAME" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
              <input required name="email" type="email" placeholder="AUTH_EMAIL@SERVER.COM" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold md:col-span-2 outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
              <input required name="address" placeholder="STREET ADDRESS / APARTMENT" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold md:col-span-2 outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
              <input required name="city" placeholder="CITY" defaultValue="Nairobi" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
              <input required name="postal_code" placeholder="POSTAL_CODE" onChange={handleInputChange} className="bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">Active Item Manifest</p>
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-zinc-100 flex items-center gap-8 group hover:shadow-xl hover:shadow-zinc-100 transition-all">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-3xl object-cover bg-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex-1">
                  <h4 className="font-black text-zinc-900 uppercase text-[12px] tracking-tight">{item.name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <Database size={12} className="text-blue-500" />
                    <span className="text-[10px] font-mono font-black text-zinc-400 uppercase">SYS_UID: {item.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="flex items-center bg-zinc-50 rounded-2xl p-2 border border-zinc-100">
                      <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2 text-zinc-400 hover:text-zinc-900"><Minus size={12} /></button>
                      <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-zinc-400 hover:text-zinc-900"><Plus size={12} /></button>
                   </div>
                   <button type="button" onClick={() => removeFromCart(item.id)} className="text-zinc-200 hover:text-red-500 transition-colors p-2"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SUMMARY PANEL --- */}
        <div className="lg:col-span-4 sticky top-32">
          <div className="bg-zinc-950 p-12 rounded-[3.5rem] text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="mb-12">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mb-3">Payload Value</p>
              <div className="text-5xl font-black tracking-tighter">KES {subtotal.toLocaleString()}</div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing} 
              className="w-full py-6 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-zinc-950 transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-blue-900/20"
            >
              {isProcessing ? "EXECUTING..." : <><CreditCard size={20} /> Deploy Order <ArrowRight size={20} /></>}
            </button>
            
            <div className="mt-10 pt-10 border-t border-white/5 flex gap-4 items-start">
               <AlertCircle size={18} className="text-amber-500 shrink-0" />
               <p className="text-[9px] text-zinc-500 font-bold uppercase leading-relaxed tracking-widest">
                 Critical: Any <span className="text-white">SYS_UID</span> not found in the master database will trigger a 404 abort. Reset cart if sync fails.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}