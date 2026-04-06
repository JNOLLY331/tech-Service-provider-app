import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trash2, ShoppingBag, Plus, Minus, ArrowRight,
  CreditCard, User, MapPin, RefreshCw, AlertCircle,
  Smartphone, CheckCircle2, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';

// Step indicators
const STEPS = ['Cart Review', 'Shipping Info', 'Payment'];

export default function Cart() {
  const { cart = [], removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: '',
    email: user?.email || '',
    address: '',
    postal_code: '',
    city: 'Nairobi',
  });

  const [phone, setPhone] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Step 1: Place Order ──────────────────────────────────────────────────
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    const t = toast.loading("Placing order...");

    try {
      const payload = {
        ...formData,
        items_data: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const { data, status } = await api.post('orders/', payload);

      if (status === 201) {
        setOrderId(data.id);
        toast.success("Order placed! Proceed to payment.", { id: t });
        setStep(2); // jump to payment step
      }
    } catch (err) {
      console.error("Order error:", err.response?.data);
      const errData = err.response?.data;
      const msg = typeof errData === 'string'
        ? errData
        : (errData?.detail || Object.values(errData || {}).flat().join(' ') || "Order failed.");
      toast.error(msg, { id: t });
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Step 2: M-Pesa STK Push ──────────────────────────────────────────────
  const handleMpesaPay = async (e) => {
    e.preventDefault();
    if (!phone) { toast.error("Enter your M-Pesa number."); return; }
    if (!orderId) { toast.error("No order found. Please restart."); return; }
    setIsProcessing(true);
    const t = toast.loading("Sending STK Push to your phone...");

    try {
      const { data } = await api.post('payments/stk-push/', {
        order_id: orderId,
        phone_number: phone,
      });
      toast.success("Check your phone for the M-Pesa prompt!", { id: t });
      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      const msg = err.response?.data?.error || "Payment initiation failed.";
      toast.error(msg, { id: t });
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Empty State ──────────────────────────────────────────────────────────
  if (cart.length === 0 && step === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-zinc-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-zinc-100 shadow-inner">
          <ShoppingBag size={40} className="text-zinc-200" />
        </div>
        <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-4">Cart is Empty</h2>
        <p className="text-zinc-400 text-sm mb-10">Add some products from our store to get started.</p>
        <Link to="/" className="bg-zinc-950 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl shadow-zinc-200">
          Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 font-sans">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-100 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
            Checkout<span className="text-blue-600">.</span>
          </h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </p>
        </div>
        {step === 0 && (
          <button
            type="button"
            onClick={() => { clearCart(); toast.success("Cart cleared."); }}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-6 py-3 rounded-xl transition-all border border-red-100"
          >
            <RefreshCw size={14} /> Clear Cart
          </button>
        )}
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center gap-2 mb-14">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-400'
              }`}>
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${i === step ? 'text-zinc-900' : 'text-zinc-300'}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-300' : 'bg-zinc-100'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* ── LEFT CONTENT ── */}
        <div className="lg:col-span-8 space-y-10">

          {/* STEP 0: Cart Items */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-4">Your Items ({cart.length})</p>
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-zinc-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-zinc-100 transition-all">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-3xl object-cover bg-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-zinc-900 text-sm uppercase tracking-tight truncate">{item.name}</h4>
                    <p className="text-xs text-blue-600 font-bold mt-1">
                      KES {parseFloat(item.price).toLocaleString()} × {item.quantity}
                    </p>
                    <p className="text-xs font-black text-zinc-400 mt-1">
                      = KES {(parseFloat(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-zinc-50 rounded-2xl p-1.5 border border-zinc-100">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 text-zinc-400 hover:text-zinc-900 rounded-xl hover:bg-white transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-zinc-900 rounded-xl hover:bg-white transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-200 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 bg-zinc-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
              >
                Continue to Shipping <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 1: Shipping Form */}
          {step === 1 && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-zinc-400">
                  <MapPin size={16} className="text-blue-600" /> Shipping Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">First Name *</label>
                    <input required name="first_name" placeholder="John" value={formData.first_name} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Last Name *</label>
                    <input required name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Email *</label>
                    <input required name="email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Street Address *</label>
                    <input required name="address" placeholder="123 Main St, Apt 4" value={formData.address} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">City *</label>
                    <input required name="city" placeholder="Nairobi" value={formData.city} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">Postal Code *</label>
                    <input required name="postal_code" placeholder="00100" value={formData.postal_code} onChange={handleInputChange}
                      className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(0)} className="px-8 py-5 rounded-2xl border border-zinc-200 font-black text-xs uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition">
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-zinc-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-60"
                >
                  {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <>Place Order <ArrowRight size={18} /></>}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: M-Pesa Payment */}
          {step === 2 && (
            <form onSubmit={handleMpesaPay} className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex items-start gap-4">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-xs text-emerald-700 uppercase tracking-widest">Order Placed!</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">Order #{String(orderId).padStart(5, '0')} created. Now complete your M-Pesa payment.</p>
                </div>
              </div>

              <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-zinc-400">
                  <Smartphone size={16} className="text-blue-600" /> M-Pesa STK Push
                </h3>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-zinc-400 ml-1">M-Pesa Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="0712 345 678 or +254712345678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white p-5 rounded-2xl border border-zinc-200 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                  <p className="text-[9px] text-zinc-400 font-medium ml-1">
                    You'll receive an M-Pesa prompt to pay KES {subtotal.toLocaleString()}.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all disabled:opacity-60 shadow-xl shadow-emerald-100"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : (
                  <><Smartphone size={20} /> Pay KES {subtotal.toLocaleString()} via M-Pesa</>
                )}
              </button>

              <button
                type="button"
                onClick={() => { clearCart(); navigate(`/order-success/${orderId}`); }}
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-600 font-bold py-3 transition-colors"
              >
                Skip payment — I'll pay later
              </button>
            </form>
          )}
        </div>

        {/* ── SUMMARY PANEL ── */}
        <div className="lg:col-span-4 sticky top-32">
          <div className="bg-zinc-950 p-10 rounded-[3.5rem] text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mb-3">Order Summary</p>

            <div className="space-y-3 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-zinc-400 truncate flex-1 mr-4">{item.name} ×{item.quantity}</span>
                  <span className="font-black text-white shrink-0">KES {(parseFloat(item.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total</p>
                <p className="text-3xl font-black tracking-tighter">KES {subtotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[9px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
                Payment via M-Pesa STK push. Stock is reserved upon order creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}