import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../../api/axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('products/items/')
      .then(({ data }) => {
        setProducts(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch(err => {
        console.error("ProductList fetch error:", err);
        setError("Failed to load products. Please check if the backend is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Loading State - Modern Spinner
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-6 text-gray-600 text-lg font-medium">Loading amazing products...</p>
      </div>
    );
  }

  // Error State - Nice looking error card
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-3xl p-10 text-center shadow-lg">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-semibold text-red-700 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main Product Grid - Beautiful Layout
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Our Products
        </h1>
        <p className="text-gray-600 text-lg">
          Discover high-quality services and products tailored for you
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No products found 😔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              product={item} 
            />
          ))}
        </div>
      )}
    </div>
  );
}