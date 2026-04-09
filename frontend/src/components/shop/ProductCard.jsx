import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Database,
  AlertTriangle,
  CheckCircle,
  ShieldOff,
  ArrowUpRight,
} from 'lucide-react';
import { useCart } from '../../store/useCart';
import toast from 'react-hot-toast';

/**
 * Returns the status badge config for a product.
 */
function getStatus(product) {
  if (!product.is_available) {
    return { label: 'Archived', badge: 'badge-muted', dot: '#5a5a7a' };
  }
  if (product.stock <= 0) {
    return { label: 'Sold Out', badge: 'badge-danger', dot: 'var(--red)' };
  }
  if (product.stock <= 5) {
    return { label: `Only ${product.stock} left`, badge: 'badge-warning', dot: 'var(--amber)' };
  }
  return { label: 'In Stock', badge: 'badge-success', dot: 'var(--emerald)' };
}

function StatusIcon({ badge }) {
  if (badge === 'badge-success') return <CheckCircle size={10} />;
  if (badge === 'badge-warning') return <Database size={10} />;
  if (badge === 'badge-danger') return <AlertTriangle size={10} />;
  return <ShieldOff size={10} />;
}

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0 || !product.is_available;
  const isMaxed = currentQty >= product.stock;

  const status = getStatus(product);

  const handleAddToCart = () => {
    if (isMaxed) {
      toast.error('Maximum stock reached.');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ filter: isOutOfStock ? 'grayscale(1) opacity(0.4)' : 'none' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <ShoppingBag size={48} style={{ color: 'var(--border-default)' }} />
          </div>
        )}

        {/* Status badge */}
        <div className={`badge ${status.badge} absolute top-4 left-4 backdrop-blur-md`}>
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: status.dot }}
          />
          {status.label}
        </div>

        {/* Quick view overlay */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white backdrop-blur-md transition-transform translate-y-2 group-hover:translate-y-0"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            View Details <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex-1">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
            style={{ color: 'var(--accent-primary)' }}
          >
            {product.category_name || 'Service'}
          </p>
          <h3
            className="font-bold text-sm leading-snug mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {product.name}
          </h3>
          {product.description && (
            <p
              className="text-xs leading-relaxed line-clamp-2 mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {product.description}
            </p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p
              className="text-xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              KES {parseFloat(product.price).toLocaleString()}
            </p>
            {currentQty > 0 && (
              <span
                className="text-[10px] font-bold px-2 py-1 rounded-lg"
                style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}
              >
                {currentQty} in cart
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxed}
            id={`add-to-cart-${product.id}`}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            style={
              isOutOfStock || isMaxed
                ? {
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-muted)',
                  cursor: 'not-allowed',
                  border: '1px solid var(--border-subtle)',
                }
                : {
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  boxShadow: '0 4px 20px var(--accent-glow)',
                }
            }
          >
            {isOutOfStock ? (
              'Unavailable'
            ) : isMaxed ? (
              'Max Reached'
            ) : (
              <>
                <ShoppingBag size={15} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}