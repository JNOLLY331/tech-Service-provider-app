import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, 
  PointElement, LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { 
  DollarSign, ShoppingCart, Users, Package, 
  Image as ImageIcon, Loader2, BarChart3, Plus 
} from 'lucide-react';
import api from '../../api/axios'; // Ensure your axios instance is configured
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('insights');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [stats, setStats] = useState([
    { label: "Total Revenue", value: "KES 0", icon: <DollarSign />, color: "bg-blue-50 text-blue-600", key: 'revenue' },
    { label: "Active Orders", value: "0", icon: <ShoppingCart />, color: "bg-orange-50 text-orange-600", key: 'orders' },
    { label: "Total Clients", value: "0", icon: <Users />, color: "bg-green-50 text-green-600", key: 'clients' },
    { label: "Stock Items", value: "0", icon: <Package />, color: "bg-purple-50 text-purple-600", key: 'stock' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
    is_available: true
  });

  // 1. Fetch Categories and Stats on Load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [catRes, statsRes] = await Promise.all([
          api.get('/products/categories/'),
          api.get('/orders/stats/') // Assuming you have a stats endpoint
        ]);
        setCategories(catRes.data);
        if (catRes.data.length > 0) setFormData(prev => ({ ...prev, category: catRes.data[0].id }));
        
        // Update stats if backend provides them
        if (statsRes.data) {
          setStats(prev => prev.map(s => ({
            ...s, 
            value: statsRes.data[s.key] || s.value 
          })));
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      // Matches your DRF Router: api/products/items/
      await api.post('/products/items/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success("SYSTEM ASSET INITIALIZED", {
        style: { borderRadius: '0px', background: '#000', color: '#fff', border: '1px solid #2563eb' }
      });

      // Reset
      setFormData({ name: '', description: '', price: '', category: categories[0]?.id, stock: '', image: null, is_available: true });
      setPreview(null);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Access Denied: Admin Clearance Required");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Network Revenue (KES)',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 45000],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.05)',
      fill: true,
      tension: 0.4,
    }]
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Command Center</h1>
          <p className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase mt-1">Jnolly Cyber Works / Admin_v1.0</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
          <button 
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'insights' ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <BarChart3 size={16} /> Insights
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Plus size={16} /> Deploy Asset
          </button>
        </div>
      </div>

      {activeTab === 'insights' ? (
        <div className="space-y-10 animate-in fade-in duration-500">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:border-blue-600 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>{s.icon}</div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{s.label}</p>
                <h3 className="text-3xl font-black tracking-tighter mt-1">{s.value}</h3>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-[450px]">
            <div className="flex justify-between mb-8">
              <h4 className="font-black uppercase tracking-widest text-sm text-gray-400">Revenue Stream Analysis</h4>
              <span className="text-blue-600 text-xs font-black">+12.5% Growth</span>
            </div>
            <Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-4 duration-500">
          {/* Input Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-8">Asset Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Module Name</label>
                  <input 
                    type="text" placeholder="e.g., Quantum Firewall" required
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Category</label>
                  <select 
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Technical Description</label>
                <textarea 
                  rows="4" placeholder="Enter module specifications..." required
                  className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Value (KES)</label>
                  <input 
                    type="number" placeholder="0.00" required
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Units in Stock</label>
                  <input 
                    type="number" placeholder="1" required
                    className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group">
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Initialize Deployment
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Asset Preview */}
          <div className="space-y-6">
            <div 
              onClick={() => document.getElementById('imgInp').click()}
              className="w-full aspect-[4/5] border-2 border-dashed border-gray-200 rounded-[3rem] flex items-center justify-center cursor-pointer overflow-hidden relative group bg-gray-50 hover:border-blue-600 transition-all"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Upload Blueprint</p>
                </div>
              )}
              <input id="imgInp" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] text-white">
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Security Protocol</h5>
              <p className="text-xs opacity-80 leading-relaxed font-medium">
                Ensure all uploaded assets comply with the Cyber Works distribution license. 
                Incorrect data may cause system-wide listing errors.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}