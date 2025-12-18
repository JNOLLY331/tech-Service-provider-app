import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck,
  ArrowUpRight 
} from 'lucide-react';
import { useCart } from "../../store/useCart";
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();

  // 1. Calculate if the user already has the max available stock in their cart
  const cartItem = cart.find(item => item.id === product.id);
  const currentCartQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0 || !product.is_available;
  const isMaxedOut = currentCartQty >= product.stock;

  // 2. Dynamic Inventory Branding
  const getStatus = () => {
    if (!product.is_available) return { label: "ARCHIVED", css: "bg-zinc-100 text-zinc-400 border-zinc-200", icon: <ShieldCheck size={10}/> };
    if (product.stock <= 0) return { label: "SOLD OUT", css: "bg-red-50 text-red-500 border-red-100", icon: <AlertTriangle size={10}/> };
    if (product.stock <= 5) return { label: `LOW STOCK: ${product.stock}`, css: "bg-amber-50 text-amber-600 border-amber-100", icon: <Database size={10}/> };
    return { label: "IN DEPOT", css: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <CheckCircle size={10}/> };
  };

  const status = getStatus();

  const handleAddToCart = () => {
    if (isMaxedOut) {
      toast.error("MAXIMUM WAREHOUSE STOCK REACHED");
      return;
    }
    addToCart(product);
    toast.success(`${product.name.toUpperCase()} SYNCED TO CART`);
  };

  return (
    <div className="group bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50">
      
      {/* --- VISUAL VIEWPORT --- */}
      <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 
            ${isOutOfStock ? 'grayscale opacity-40' : 'grayscale group-hover:grayscale-0'}`} 
        />

        {/* Floating Status Badge */}
        <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-full border text-[8px] font-black tracking-[0.2em] flex items-center gap-2 backdrop-blur-md transition-all ${status.css}`}>
          {status.icon} {status.label}
        </div>

        {/* Detail Link Overlay */}
        <Link 
          to={`/product/${product.slug}`} 
          className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white p-4 rounded-full text-zinc-950 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <ArrowUpRight size={20} />
          </div>
        </Link>
      </div>

      {/* --- CONTENT PANEL --- */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <p className="text-[7px] font-black text-blue-600 uppercase tracking-[0.4em]">
              {product.category_name || "LOGISTICS_UNIT"}
            </p>
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tighter">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-zinc-900 font-mono">
              KES {parseFloat(product.price).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxedOut}
            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95
              ${isOutOfStock || isMaxedOut
                ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed border border-zinc-200' 
                : 'bg-zinc-950 text-white hover:bg-blue-600 shadow-lg shadow-zinc-200'}`}
          >
            {isOutOfStock ? (
              "DEPOT EMPTY"
            ) : isMaxedOut ? (
              "LIMIT REACHED"
            ) : (
              <>
                <ShoppingBag size={14} /> Add to Manifest
              </>
            )}
          </button>
          
          <div className="flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
            <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">
              Available: {product.stock}
            </p>
            <p className="text-[7px] font-mono font-bold text-zinc-400">
              REF_{product.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}