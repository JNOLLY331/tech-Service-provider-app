import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Database,
  Shield,
  Loader2,
  Package,
  Star,
  Share2,
  Heart,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import api from "../api/axios";
import { useCart } from "../store/useCart";
import toast from "react-hot-toast";

const TRUST_ITEMS = [
  { icon: <Truck size={15} />, text: "Fast service delivery" },
  { icon: <RotateCcw size={15} />, text: "Satisfaction guarantee" },
  { icon: <BadgeCheck size={15} />, text: "Verified & licensed" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  const { addToCart, cart } = useCart();
  const cartItem = cart.find((i) => i.id === product?.id);
  const currentQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product && (product.stock <= 0 || !product.is_available);
  const isMaxed = currentQty >= (product?.stock || 0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`products/items/${slug}/`);
        setProduct(data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Product not found."
            : "Failed to load product.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (isMaxed) {
      toast.error("Maximum stock reached.");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  /* ── ERROR ── */
  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-muted)",
          }}
        >
          <Package size={40} />
        </div>
        <div>
          <h2
            className="text-2xl font-black mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {error || "Product not found"}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            The service you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>
    );
  }

  const stockStatus = isOutOfStock
    ? {
        label: "Out of Stock",
        badge: "badge-danger",
        icon: <AlertTriangle size={12} />,
      }
    : product.stock <= 5
      ? {
          label: `Only ${product.stock} remaining`,
          badge: "badge-warning",
          icon: <Database size={12} />,
        }
      : {
          label: `${product.stock} in stock`,
          badge: "badge-success",
          icon: <CheckCircle2 size={12} />,
        };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        {/* ── BREADCRUMB ── */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold mb-10 transition-colors hover:opacity-80 uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} /> Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── IMAGE PANEL ── */}
          <div className="sticky top-24">
            <div
              className="aspect-square rounded-3xl overflow-hidden relative group"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package
                    size={80}
                    style={{ color: "var(--border-default)" }}
                  />
                </div>
              )}

              {/* Stock badge overlay */}
              <div className="absolute top-5 left-5">
                <span className={`badge ${stockStatus.badge}`}>
                  {stockStatus.icon}
                  {stockStatus.label}
                </span>
              </div>

              {/* Wishlist btn */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  color: wishlisted ? "var(--red)" : "var(--text-muted)",
                }}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust signals under image */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {TRUST_ITEMS.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span style={{ color: "var(--accent-primary)" }}>
                    {t.icon}
                  </span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── DETAILS PANEL ── */}
          <div className="flex flex-col gap-8">
            {/* Category */}
            <p
              className="text-xs font-black uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-primary)" }}
            >
              {product.category?.name || "Tech Service"}
            </p>

            {/* Name */}
            <div>
              <h1
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {product.name}
              </h1>

              {/* Rating mock */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      style={{ color: "#ffb547", fill: "#ffb547" }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  5.0 · Verified service
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <p
                className="text-4xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                KES {parseFloat(product.price).toLocaleString()}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Pay via M-Pesa · Instant service
              </p>
            </div>

            {/* Description */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3
                className="text-[10px] font-black uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Description
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {product.description ||
                  "No description available for this service."}
              </p>
            </div>

            {/* System ref */}
            <div
              className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              <Shield size={12} style={{ color: "var(--accent-primary)" }} />
              <span>ID: {product.id}</span>
              <span>·</span>
              <span>REF: {product.slug}</span>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isMaxed}
                id={`detail-add-cart-${product.id}`}
                className="w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
                style={
                  isOutOfStock || isMaxed
                    ? {
                        background: "var(--bg-elevated)",
                        color: "var(--text-muted)",
                        cursor: "not-allowed",
                        border: "1px solid var(--border-subtle)",
                      }
                    : {
                        background: "var(--accent-primary)",
                        color: "#fff",
                        boxShadow: "0 8px 32px var(--accent-glow)",
                      }
                }
              >
                {isOutOfStock ? (
                  "Out of Stock"
                ) : isMaxed ? (
                  "Max Quantity in Cart"
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              {currentQty > 0 && (
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "var(--accent-subtle)",
                    border: "1px solid rgba(91,91,255,0.15)",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {currentQty} already in your cart
                  </span>
                  <Link
                    to="/cart"
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    View Cart →
                  </Link>
                </div>
              )}

              {/* Share */}
              <button
                className="btn-ghost w-full"
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  }) || toast.success("Link copied!", { icon: "🔗" });
                }}
              >
                <Share2 size={15} /> Share This Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
