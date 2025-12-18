import { useCart } from '../store/useCart';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addToCart = useCart((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
    >
      Add to Cart
    </button>
  );
}