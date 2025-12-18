import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 🔗 Ensure this matches your Django URL (usually /api/products/)
        const response = await axios.get('http://127.0.0.1:8000/api/products/items/');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load products. check Django server if running?");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-10 bg-red-50 rounded-[2rem] text-red-600 font-black">
      {error}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}