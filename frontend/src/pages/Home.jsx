import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShieldCheck, Cpu, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';
import api from '../api/axios';

const HERO_SLIDES = [
  {
    title: "Elite Cyber\nSolutions.",
    subtitle: "Professional tech services for modern businesses in Busia.",
    gradient: "from-zinc-950 via-zinc-900 to-blue-950",
    accent: "bg-blue-600",
  },
  {
    title: "Software\nInstallations.",
    subtitle: "Licensed software deployment & activation for your business.",
    gradient: "from-blue-950 via-indigo-900 to-zinc-950",
    accent: "bg-indigo-500",
  },
  {
    title: "E-Portfolio\nCreation.",
    subtitle: "Beautiful, professional portfolios that open doors.",
    gradient: "from-zinc-900 via-slate-800 to-zinc-950",
    accent: "bg-emerald-500",
  },
];

const FEATURES = [
  { icon: <ShieldCheck size={24} />, title: "Secure & Trusted", desc: "All services backed by professional guarantees." },
  { icon: <Cpu size={24} />, title: "Tech-Forward", desc: "Cutting-edge tools and modern infrastructure." },
  { icon: <Globe size={24} />, title: "Local & Available", desc: "Based in Busia, ready to serve you today." },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('products/items/');
        // DRF may return paginated { results: [] } or a plain array
        setProducts(Array.isArray(data) ? data : (data.results ?? []));
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please check the backend server.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-24">
      {/* ── HERO SWIPER ── */}
      <section className="px-4 md:px-6 py-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="rounded-[2.5rem] h-[480px] md:h-[560px] overflow-hidden shadow-2xl"
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center p-10 md:p-20 relative overflow-hidden`}>
                {/* decorative blobs */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />

                <div className="max-w-2xl relative z-10">
                  <h1 className="text-5xl md:text-7xl font-black leading-tight text-white whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-slate-400 text-lg font-medium max-w-md">
                    {slide.subtitle}
                  </p>
                  <Link
                    to="/login"
                    className={`mt-8 inline-flex items-center gap-2 ${slide.accent} px-8 py-4 rounded-2xl font-bold text-white hover:opacity-90 transition-all shadow-xl`}
                  >
                    Get Started <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex items-start gap-4 bg-zinc-50 border border-zinc-100 rounded-3xl p-6 hover:border-blue-600 transition-all" data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="font-black text-sm text-zinc-900">{f.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 font-medium">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">Catalogue</p>
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900">Featured Services</h2>
            <p className="text-zinc-400 mt-2 font-medium">Quality guaranteed by Jnolly Cyber Works.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
            <p className="text-red-600 font-bold">{error}</p>
            <p className="text-red-400 text-xs mt-2">Make sure the Django backend is running at port 8000.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 font-medium">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={i * 60}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}