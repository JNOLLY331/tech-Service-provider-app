import { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import {
  DollarSign, ShoppingCart, Users, Package,
  Image as ImageIcon, Loader2, BarChart3, Plus,
  RefreshCw, CheckCircle, XCircle, Clock
} from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-blue-600 transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>{icon}</div>
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-black tracking-tighter mt-1">{value}</h3>
    </div>
  );
}

// ─── Order Row ────────────────────────────────────────────────────────────────
function OrderRow({ order, onStatusChange }) {
  const statusColor = {
    Pending: 'bg-amber-50 text-amber-600',
    Shipped: 'bg-blue-50 text-blue-600',
    Delivered: 'bg-emerald-50 text-emerald-600',
    Cancelled: 'bg-red-50 text-red-500',
  };
  const payColor = {
    Pending: 'text-amber-500',
    Completed: 'text-emerald-500',
    Failed: 'text-red-500',
  };

  return (
    <tr className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
      <td className="py-4 px-6 font-mono text-xs font-black">#{String(order.id).padStart(5, '0')}</td>
      <td className="py-4 px-6 text-xs font-bold">{order.first_name} {order.last_name}</td>
      <td className="py-4 px-6 text-xs text-zinc-500">{order.email}</td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${statusColor[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className={`py-4 px-6 text-xs font-black ${payColor[order.payment_status]}`}>
        {order.payment_status}
      </td>
      <td className="py-4 px-6 text-xs font-mono font-bold">
        KES {parseFloat(order.total_paid || 0).toLocaleString()}
      </td>
      <td className="py-4 px-6">
        <select
          defaultValue={order.status}
          onChange={e => onStatusChange(order.id, e.target.value)}
          className="text-[10px] font-black bg-zinc-100 rounded-xl px-3 py-2 outline-none cursor-pointer hover:bg-blue-50 transition"
        >
          {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('insights');
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [stats, setStats] = useState([
    { label: "Total Revenue", value: "KES 0", icon: <DollarSign />, color: "bg-blue-50 text-blue-600", key: 'revenue' },
    { label: "Active Orders", value: "0", icon: <ShoppingCart />, color: "bg-orange-50 text-orange-600", key: 'orders' },
    { label: "Total Clients", value: "0", icon: <Users />, color: "bg-green-50 text-green-600", key: 'clients' },
    { label: "Stock Items", value: "0", icon: <Package />, color: "bg-purple-50 text-purple-600", key: 'stock' },
  ]);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '', image: null, is_available: true
  });

  // ─── Fetch Dashboard Data ──────────────────────────────────────────────────
  const fetchDashboardData = useCallback(async () => {
    setStatsLoading(true);
    try {
      const [catRes, statsRes] = await Promise.all([
        api.get('products/categories/'),   // ← No leading slash (baseURL already ends with /api/)
        api.get('orders/stats/'),
      ]);

      const cats = catRes.data?.results ?? catRes.data;
      setCategories(Array.isArray(cats) ? cats : []);

      if (cats?.length > 0) {
        setFormData(prev => ({ ...prev, category: cats[0].id }));
      }

      if (statsRes.data) {
        setStats(prev => prev.map(s => ({
          ...s,
          value: statsRes.data[s.key] ?? s.value,
        })));
      }
    } catch (err) {
      console.error("Dashboard init error:", err.response?.data || err.message);
      toast.error("Failed to load dashboard stats.");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // ─── Fetch Orders ──────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const { data } = await api.get('orders/');
      setOrders(Array.isArray(data) ? data : (data.results ?? []));
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    fetchOrders();
  }, [fetchDashboardData, fetchOrders]);

  // ─── Update Order Status ───────────────────────────────────────────────────
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`orders/${orderId}/status/`, { status: newStatus });
      toast.success(`Order #${orderId} updated to ${newStatus}`);
      fetchOrders();
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to update order status.");
    }
  };

  // ─── Image Upload ──────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ─── Create Product ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) { toast.error("Please select a category."); return; }

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    });

    try {
      await api.post('products/items/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("Product created successfully!");
      setFormData({ name: '', description: '', price: '', category: categories[0]?.id || '', stock: '', image: null, is_available: true });
      setPreview(null);
      fetchDashboardData();
    } catch (err) {
      const errData = err.response?.data;
      const msg = typeof errData === 'object'
        ? Object.values(errData).flat().join(' ')
        : (errData?.detail || "Failed to create product.");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue (KES)',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 45000],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.05)',
      fill: true,
      tension: 0.4,
    }]
  };

  const tabs = [
    { id: 'insights', label: 'Insights', icon: <BarChart3 size={16} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={16} /> },
    { id: 'inventory', label: 'Add Product', icon: <Plus size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Command Center</h1>
          <p className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mt-1">
            Jnolly Cyber Works / Admin_v2.0
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button
            onClick={() => { fetchDashboardData(); fetchOrders(); }}
            className="p-3 text-gray-400 hover:text-blue-600 transition-colors rounded-xl hover:bg-white"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ── INSIGHTS ── */}
      {activeTab === 'insights' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-[450px]">
            <div className="flex justify-between mb-8">
              <h4 className="font-black uppercase tracking-widest text-sm text-gray-400">Revenue Stream (Sample)</h4>
              <span className="text-blue-600 text-xs font-black">Weekly View</span>
            </div>
            <Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      )}

      {/* ── ORDERS ── */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tighter">All Orders</h2>
            <span className="text-xs text-zinc-400 font-bold">{orders.length} records</span>
          </div>

          {ordersLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-zinc-400 font-medium">No orders yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    {['Order #', 'Name', 'Email', 'Status', 'Payment', 'Total', 'Update'].map(h => (
                      <th key={h} className="text-left py-4 px-6 text-[9px] font-black uppercase tracking-widest text-zinc-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── ADD PRODUCT ── */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-8">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Product Name *</label>
                  <input
                    type="text" required placeholder="e.g., Quantum Firewall"
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Category *</label>
                  <select
                    required
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">-- Select --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Description *</label>
                <textarea
                  rows="4" required placeholder="Enter product specifications..."
                  className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Price (KES) *</label>
                  <input
                    type="number" min="1" step="0.01" required placeholder="0.00"
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Stock Units *</label>
                  <input
                    type="number" min="0" required placeholder="0"
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${formData.is_available ? 'bg-blue-600' : 'bg-zinc-200'}`}
                  onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-transform ${formData.is_available ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  {formData.is_available ? 'Available for sale' : 'Hidden from store'}
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <><Plus size={20} className="group-hover:rotate-90 transition-transform" /> Create Product</>
                )}
              </button>
            </form>
          </div>

          {/* Preview Column */}
          <div className="space-y-6">
            <div
              onClick={() => document.getElementById('imgInp').click()}
              className="w-full aspect-[4/5] border-2 border-dashed border-gray-200 rounded-[3rem] flex items-center justify-center cursor-pointer overflow-hidden relative group bg-gray-50 hover:border-blue-600 transition-all"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Click to Upload Image</p>
                  <p className="text-[9px] text-gray-300 mt-2">JPG, PNG, WEBP supported</p>
                </div>
              )}
              <input id="imgInp" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] text-white">
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Security Protocol</h5>
              <p className="text-xs opacity-80 leading-relaxed font-medium">
                Only authenticated superusers can create or modify products.
                Stock is deducted automatically upon order confirmation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}