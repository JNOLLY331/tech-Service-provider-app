import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCard from '../components/shop/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your API base URL
  const API_URL = "http://127.0.0.1:8000/api/products/items/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        // Django REST Framework's DefaultRouter usually returns an array 
        // or a results object if you have pagination enabled.
        setProducts(Array.isArray(data) ? data : data.results);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Swiper */}
      <section className="px-6 py-4">
        <Swiper 
          modules={[Autoplay, Pagination]} 
          pagination={{ clickable: true }} 
          autoplay={{ delay: 5000 }}
          className="rounded-[2.5rem] h-[500px] overflow-hidden shadow-2xl"
        >
          <SwiperSlide className="bg-slate-900 flex items-center justify-center text-white p-20">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-black leading-tight">Elite Cyber <br/> Solutions.</h1>
              <p className="mt-4 text-slate-400">Professional tech services for modern businesses.</p>
              <button className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition">
                Explore Services
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">Featured Services</h2>
            <p className="text-gray-500 mt-2">Quality work guaranteed by Jnolly Cyber Works.</p>
          </div>
        </div>
        
        {/* Conditional Rendering based on API State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-2xl text-red-600 text-center">
            <p>Failed to load products. Please check if the backend is running.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <p className="text-center text-gray-500">No services available at the moment.</p>
        )}
      </section>
    </div>
  );
}