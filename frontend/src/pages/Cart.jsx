import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trash2, ShoppingBag, Plus, Minus, ArrowRight,
  MapPin, RefreshCw, AlertCircle,
  Smartphone, CheckCircle2, Loader2, Package,
  ShieldCheck, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';

const STEPS = [
  { label: 'Cart', icon: <ShoppingBag size={14} /> },
  { label: 'Shipping', icon: <MapPin size={14} /> },
  { label: 'Payment', icon: <Smartphone size={14} /> },
];

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

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ── Place Order ── */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    const t = toast.loading('Placing your order...');
    try {
      const payload = {
        ...formData,
        items_data: cart.map((item) => ({ product_id: item.id, quantity: item.quantity })),
      };
      const { data, status } = await api.post('orders/', payload);
      if (status === 201) {
        setOrderId(data.id);
        toast.success('Order placed! Proceed to payment.', { id: t });
        setStep(2);
      }
    } catch (err) {
      const errData = err.response?.data;
      const msg =
        typeof errData === 'string'
          ? errData
          : errData?.detail || Object.values(errData || {}).flat().join(' ') || 'Order failed.';
      toast.error(msg, { id: t });
    } finally {
      setIsProcessing(false);
    }
  };

  /* ── M-Pesa ── */
  const handleMpesaPay = async (e) => {
    e.preventDefault();
    if (!phone) { toast.error('Enter your M-Pesa number.'); return; }
    if (!orderId) { toast.error('No order found. Please restart.'); return; }
    setIsProcessing(true);
    const t = toast.loading('Sending STK Push...');
    try {
      await api.post('payments/stk-push/', { order_id: orderId, phone_number: phone });
      toast.success('Check your phone for the M-Pesa prompt!', { id: t });
      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Payment failed.', { id: t });
    } finally {
      setIsProcessing(false);
    }
  };

  /* ── Empty State ── */
  if (cart.length === 0 && step === 0) {
    return (
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <Package size={44} style={{ color: 'var(--text-muted)' }} />
        </div>
        <h2
          className="text-3xl font-black mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Cart is Empty
        </h2>
        <p className="text-sm mb-10 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
          Browse our services and add what you need to get started.
        </p>
        <Link to="/" className="btn-primary">
          <ShoppingBag size={16} /> Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">

        {/* ── HEADER ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-2">Checkout</p>
            <h1
              className="text-5xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Your Cart<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </h1>
          </div>
          {step === 0 && cart.length > 0 && (
            <button
              onClick={() => { clearCart(); toast.success('Cart cleared.'); }}
              className="btn-danger self-start"
            >
              <RefreshCw size={14} /> Clear Cart
            </button>
          )}
        </div>

        {/* ── STEP PROGRESS ── */}
        <div className="flex items-center gap-3 mb-12">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all"
                style={
                  i < step
                    ? { background: 'var(--emerald-bg)', color: 'var(--emerald)', border: '1px solid rgba(16,217,154,0.3)' }
                    : i === step
                      ? { background: 'var(--accent-primary)', color: '#fff', boxShadow: '0 4px 16px var(--accent-glow)' }
                      : { background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }
                }
              >
                {i < step ? <CheckCircle2 size={16} /> : s.icon}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider hidden sm:block truncate"
                style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-2"
                  style={{ background: i < step ? 'var(--emerald)' : 'var(--border-subtle)' }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── LEFT ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* STEP 0: Cart Items */}
            {step === 0 && (
              <div className="space-y-4">
                <p
                  className="text-xs font-black uppercase tracking-widest px-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {cart.length} item{cart.length !== 1 && 's'}
                </p>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 md:gap-6 p-5 rounded-2xl transition-all"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                      style={{ background: 'var(--bg-elevated)' }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={24} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-bold text-sm truncate mb-0.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
                        KES {parseFloat(item.price).toLocaleString()} × {item.quantity}
                      </p>
                      <p className="text-xs font-black" style={{ color: 'var(--text-secondary)' }}>
                        = KES {(parseFloat(item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Qty stepper */}
                      <div
                        className="flex items-center rounded-xl p-1"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="w-8 text-center text-xs font-black"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: 'var(--red-bg)',
                          color: 'var(--red)',
                          border: '1px solid rgba(255,77,106,0.15)',
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setStep(1)}
                  className="btn-primary w-full py-4"
                  style={{ borderRadius: '1rem', fontSize: '0.875rem' }}
                >
                  Continue to Shipping <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 1: Shipping Form */}
            {step === 1 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div
                  className="p-8 rounded-2xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <h3
                    className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
                    Shipping Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'first_name', label: 'First Name', placeholder: 'John', col: '' },
                      { name: 'last_name', label: 'Last Name', placeholder: 'Doe', col: '' },
                      { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email', col: 'md:col-span-2' },
                      { name: 'address', label: 'Street Address', placeholder: '123 Main Street', col: 'md:col-span-2' },
                      { name: 'city', label: 'City', placeholder: 'Nairobi', col: '' },
                      { name: 'postal_code', label: 'Postal Code', placeholder: '00100', col: '' },
                    ].map((f) => (
                      <div key={f.name} className={`space-y-1 ${f.col}`}>
                        <label
                          className="text-[10px] font-black uppercase tracking-wider ml-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {f.label} *
                        </label>
                        <input
                          required
                          name={f.name}
                          type={f.type || 'text'}
                          placeholder={f.placeholder}
                          value={formData[f.name]}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="btn-ghost px-6"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary flex-1 py-4"
                    style={{ borderRadius: '1rem' }}
                  >
                    {isProcessing
                      ? <Loader2 className="animate-spin" size={18} />
                      : <>Place Order <ArrowRight size={18} /></>
                    }
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: M-Pesa */}
            {step === 2 && (
              <form onSubmit={handleMpesaPay} className="space-y-6">
                {/* Order Confirmation Banner */}
                <div
                  className="p-5 rounded-2xl flex items-start gap-4"
                  style={{
                    background: 'var(--emerald-bg)',
                    border: '1px solid rgba(16,217,154,0.2)',
                  }}
                >
                  <CheckCircle2 size={20} style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest" style={{ color: 'var(--emerald)' }}>
                      Order Placed Successfully!
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Order #{String(orderId).padStart(5, '0')} is confirmed. Now complete payment.
                    </p>
                  </div>
                </div>

                {/* Phone Input */}
                <div
                  className="p-8 rounded-2xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <h3
                    className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Smartphone size={16} style={{ color: 'var(--accent-primary)' }} />
                    M-Pesa STK Push
                  </h3>
                  <div className="space-y-2">
                    <label
                      className="text-[10px] font-black uppercase tracking-wider ml-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      M-Pesa Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="0712345678 or +254712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                    <p className="text-xs mt-2 ml-1" style={{ color: 'var(--text-muted)' }}>
                      You'll receive an M-Pesa prompt to pay KES {subtotal.toLocaleString()}.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
                  style={{
                    background: 'var(--emerald)',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(16,217,154,0.25)',
                    opacity: isProcessing ? 0.6 : 1,
                  }}
                >
                  {isProcessing
                    ? <Loader2 className="animate-spin" size={18} />
                    : <><Smartphone size={20} /> Pay KES {subtotal.toLocaleString()} via M-Pesa</>
                  }
                </button>

                <button
                  type="button"
                  onClick={() => { clearCart(); navigate(`/order-success/${orderId}`); }}
                  className="w-full text-center text-xs font-bold py-3 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Skip — I'll pay later
                </button>
              </form>
            )}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:col-span-4">
            <div
              className="sticky top-28 rounded-2xl overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-5"
                style={{
                  background: 'var(--accent-primary)',
                  backgroundImage: 'linear-gradient(135deg, var(--accent-primary) 0%, #a78bfa 100%)',
                }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-1">
                  Order Summary
                </p>
                <p className="text-2xl font-black text-white">
                  KES {subtotal.toLocaleString()}
                </p>
              </div>

              {/* Items */}
              <div className="p-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-3 text-xs">
                    <span
                      className="truncate flex-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.name} ×{item.quantity}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: 'var(--text-primary)' }}>
                      KES {(parseFloat(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div
                  className="pt-4 mt-4"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Total
                    </span>
                    <span
                      className="text-2xl font-black"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                    >
                      KES {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div
                  className="flex items-start gap-3 p-4 rounded-xl mt-4"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
                >
                  <Lock size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Secure checkout. Payment via M-Pesa STK Push. Stock reserved upon order creation.
                  </p>
                </div>

                <div className="flex items-center gap-2 justify-center mt-2">
                  <ShieldCheck size={13} style={{ color: 'var(--emerald)' }} />
                  <span className="text-[10px] font-bold" style={{ color: 'var(--emerald)' }}>
                    Guaranteed satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}