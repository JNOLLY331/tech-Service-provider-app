import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ShoppingBag, ArrowLeft, CheckCircle, AlertTriangle,
    Database, Shield, Loader2, Package
} from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../store/useCart';
import toast from 'react-hot-toast';

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart, cart } = useCart();
    const cartItem = cart.find(i => i.id === product?.id);
    const currentQty = cartItem ? cartItem.quantity : 0;
    const isOutOfStock = product && (product.stock <= 0 || !product.is_available);
    const isMaxed = currentQty >= (product?.stock || 0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`products/items/${slug}/`);
                setProduct(data);
            } catch (err) {
                setError(err.response?.status === 404 ? 'Product not found.' : 'Failed to load product.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (isMaxed) { toast.error('Maximum stock reached.'); return; }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
    );

    if (error || !product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-6">
            <Package size={48} className="text-zinc-200" />
            <h2 className="text-2xl font-black text-zinc-900">{error || 'Product not found'}</h2>
            <Link to="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
                <ArrowLeft size={16} /> Back to Store
            </Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24" data-aos="fade-up">
            {/* Breadcrumb */}
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-blue-600 transition-colors mb-12 uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to Store
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Image */}
                <div className="aspect-square bg-zinc-50 rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-100">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Package size={64} className="text-zinc-200" />
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-8">
                    {/* Category */}
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">
                        {product.category?.name || 'Uncategorized'}
                    </p>

                    {/* Name & Price */}
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 uppercase leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-4xl font-black text-blue-600 mt-4 font-mono">
                            KES {parseFloat(product.price).toLocaleString()}
                        </p>
                    </div>

                    {/* Stock Status */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit
            ${isOutOfStock
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : product.stock <= 5
                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                        {isOutOfStock
                            ? <><AlertTriangle size={12} /> Out of Stock</>
                            : product.stock <= 5
                                ? <><Database size={12} /> Low Stock: {product.stock} left</>
                                : <><CheckCircle size={12} /> In Stock ({product.stock} units)</>
                        }
                    </div>

                    {/* Description */}
                    <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Description</h3>
                        <p className="text-zinc-600 leading-relaxed font-medium">
                            {product.description || 'No description available.'}
                        </p>
                    </div>

                    {/* System Info */}
                    <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-300 font-bold uppercase">
                        <Shield size={12} className="text-blue-400" />
                        <span>SYS_REF: {product.id}</span>
                        <span>•</span>
                        <span>SLUG: {product.slug}</span>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || isMaxed}
                        className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl
              ${isOutOfStock || isMaxed
                                ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
                                : 'bg-zinc-950 text-white hover:bg-blue-600 shadow-zinc-200'
                            }`}
                    >
                        {isOutOfStock ? 'Out of Stock' : isMaxed ? 'Max Qty in Cart' : (
                            <><ShoppingBag size={20} /> Add to Cart</>
                        )}
                    </button>

                    {currentQty > 0 && (
                        <p className="text-center text-xs font-bold text-zinc-400">
                            {currentQty} already in your cart →{' '}
                            <Link to="/cart" className="text-blue-600 hover:underline">View Cart</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
