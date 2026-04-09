import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  ShieldCheck,
  Cpu,
  Globe,
  ChevronRight,
  Code2,
  Wifi,
  ArrowRight,
  Star,
  Quote,
  Users,
  Package,
  Award,
  TrendingUp,
  Zap,
  CheckCircle,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import api from "../api/axios";
import PureCounter from "@srexi/purecounterjs";

/* ─── HERO SLIDES ───────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    tag: "🔥 Now Available",
    title: "Elite Cyber\nSolutions.",
    subtitle:
      "Professional tech services for modern businesses and individuals — delivered fast, built to last.",
    cta: "Browse Services",
    ctaPath: "/",
    accent: "#5b5bff",
  },
  {
    tag: "⚡ Licensed",
    title: "Software\nInstallations.",
    subtitle:
      "Licensed software deployment & activation for your business. Windows, Office, Antivirus & more.",
    cta: "Get Started",
    ctaPath: "/login",
    accent: "#a78bfa",
  },
  {
    tag: "✨ Portfolio",
    title: "E-Portfolio\nCreation.",
    subtitle:
      "Beautiful, professional portfolios that open doors. Stand out in the digital world.",
    cta: "Order Now",
    ctaPath: "/login",
    accent: "#10d99a",
  },
];

/* ─── FEATURES ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure & Trusted",
    desc: "All services backed by professional guarantees and full data privacy.",
    color: "#5b5bff",
  },
  {
    icon: <Cpu size={22} />,
    title: "Tech-Forward",
    desc: "Cutting-edge tools and modern infrastructure for peak performance.",
    color: "#a78bfa",
  },
  {
    icon: <Globe size={22} />,
    title: "Local & Available",
    desc: "Based in Eldoret — walk-in or order online and get served same day.",
    color: "#10d99a",
  },
  {
    icon: <Clock size={22} />,
    title: "Fast Turnaround",
    desc: "Most services completed within hours, not days. We value your time.",
    color: "#ffb547",
  },
];

/* ─── SERVICES CATALOG ──────────────────────────────────────── */
const SERVICES = [
  {
    icon: <Cpu size={28} />,
    title: "Software Installation",
    desc: "Windows OS, Microsoft Office, specialized software — we handle activation and configuration.",
    price: "From KES 500",
    color: "#5b5bff",
  },
  {
    icon: <Globe size={28} />,
    title: "Web Design",
    desc: "Clean, modern websites and landing pages that convert visitors to clients.",
    price: "From KES 5,000",
    color: "#a78bfa",
  },
  {
    icon: <Code2 size={28} />,
    title: "E-Portfolio (online Visibity)",
    desc: "Professional digital portfolio that showcases your skills and impresses employers.",
    price: "From KES 2,500",
    color: "#10d99a",
  },
  {
    icon: <Wifi size={28} />,
    title: "Cyber Services",
    desc: "Printing, scanning,KRA & Helb services, data recovery, and full cyber café support services.",
    price: "From KES 50",
    color: "#ffb547",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Antivirus Setup",
    desc: "Protect your computer from threats with licensed antivirus installation.",
    price: "From KES 300",
    color: "#ff4d6a",
  },
  {
    icon: <Zap size={28} />,
    title: "Tech courses & Consultancy ie computer science",
    desc: "Not sure what tech you need? Our experts will advise and guide you.",
    price: "Free",
    color: "#06b6d4",
  },
];

/* ─── STATS ─────────────────────────────────────────────────── */
const STATS = [
  { end: 50, suffix: "+", label: "Happy Clients", icon: <Users size={18} /> },
  {
    end: 20,
    suffix: "+",
    label: "Services Delivered",
    icon: <Package size={18} />,
  },
  { end: 5, suffix: "★", label: "Average Rating", icon: <Star size={18} /> },
  { end: 2, suffix: " Yrs", label: "In Business", icon: <Award size={18} /> },
];

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "David enshen",
    role: "Student, Masinde Muliro",
    text: "Got my e-portfolio done in one day! Jnolly Cyber Works understands exactly what students and graduates need.",
    rating: 5,
  },
  {
    name: "Elite Enterprises",
    role: "Business Owner, Eldoret",
    text: "They installed Office and set up my laptop. Very professional, affordable and fast. Highly recommend!",
    rating: 5,
  },
  {
    name: "James Watt",
    role: "Freelancer",
    text: "Built me a website in 3 days. Clean design, mobile friendly, and they keep answering my questions even after delivery.",
    rating: 5,
  },
];

/* ─── WHY CHOOSE US ─────────────────────────────────────────── */
const WHY_US = [
  {
    icon: <CheckCircle size={20} />,
    text: "Licensed software only — no pirated copies",
  },
  { icon: <CheckCircle size={20} />, text: "Pay via M-Pesa — fast and secure" },
  {
    icon: <CheckCircle size={20} />,
    text: "Walk-in or order online from anywhere",
  },
  {
    icon: <CheckCircle size={20} />,
    text: "Free advice and after-service support",
  },
  {
    icon: <CheckCircle size={20} />,
    text: "Experienced technicians with proven track record",
  },
  {
    icon: <CheckCircle size={20} />,
    text: "Affordable pricing for everyone in Eldoret",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize PureCounter
  useEffect(() => {
    new PureCounter();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("products/items/");
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
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      {/* HERO SECTION */}
      <section className="relative px-4 md:px-6 py-6">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          className="rounded-[2rem] overflow-hidden"
          style={{ height: "clamp(400px, 60vh, 580px)" }}
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full h-full flex items-center relative overflow-hidden"
                style={{ background: "var(--gradient-hero)" }}
              >
                <div
                  className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-glow-pulse pointer-events-none"
                  style={{ background: `${slide.accent}18` }}
                />
                <div
                  className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                  style={{ background: `${slide.accent}10` }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                <div className="relative z-10 max-w-3xl px-10 md:px-20">
                  <span
                    className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
                    style={{
                      background: `${slide.accent}20`,
                      color: slide.accent,
                      border: `1px solid ${slide.accent}40`,
                    }}
                  >
                    {slide.tag}
                  </span>
                  <h1
                    className="text-5xl md:text-7xl font-black leading-tight whitespace-pre-line mb-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {slide.title.split("\n")[0]}
                    <span style={{ color: slide.accent }}>
                      {"\n" + slide.title.split("\n")[1]}
                    </span>
                  </h1>
                  <p
                    className="text-base md:text-lg font-medium max-w-md mb-10 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={slide.ctaPath}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: slide.accent,
                        boxShadow: `0 8px 32px ${slide.accent}40`,
                      }}
                    >
                      {slide.cta} <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="#"
                      className="btn-ghost"
                      style={{ borderRadius: "1rem" }}
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>

                <div
                  className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md animate-float"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <TrendingUp size={18} style={{ color: slide.accent }} />
                  <div>
                    <p
                      className="text-xs font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      50+ Clients
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Satisfied by Jnolly cyberworks
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* STATS STRIP WITH PURECOUNTER */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{ background: "var(--border-subtle)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 p-8 text-center"
              style={{ background: "var(--bg-surface)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                style={{
                  background: "var(--accent-subtle)",
                  color: "var(--accent-primary)",
                }}
              >
                {stat.icon}
              </div>
              <p
                className="text-3xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                <span
                  className="purecounter"
                  data-purecounter-start="0"
                  data-purecounter-end={stat.end}
                  data-purecounter-duration="2"
                  data-purecounter-separator=","
                ></span>
                {stat.suffix}
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
            }}
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${f.color}15`, color: f.color }}
            >
              {f.icon}
            </div>
            <div>
              <h3
                className="font-bold text-sm mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="section-label mb-3">What We Offer</p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Our Services
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything your business needs, from software to web presence — all
            under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-default"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
              }}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${svc.color}15`, color: svc.color }}
              >
                {svc.icon}
              </div>
              <h3
                className="text-lg font-black mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {svc.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {svc.desc}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-black"
                  style={{ color: svc.color }}
                >
                  {svc.price}
                </span>
               
                <a
                  href={`https://wa.me/254704345035?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(svc.title)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: `${svc.color}15`,
                    color: svc.color,
                  }}
                >
                  Order on WhatsApp <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE PRODUCT GRID */}
      <section className="py-20" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="section-label mb-3">Live Catalogue</p>
              <h2
                className="text-4xl font-black tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                Featured Services
              </h2>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Quality guaranteed by Jnolly Cyber Works.
              </p>
            </div>
            <Link
              to="/"
              className="btn-ghost flex items-center gap-2 self-start"
              style={{ whiteSpace: "nowrap" }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="skeleton h-56 w-full" />
                  <div className="p-6 space-y-3">
                    <div className="skeleton h-3 w-2/3" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div
              className="p-10 rounded-2xl text-center"
              style={{
                background: "var(--red-bg)",
                border: "1px solid rgba(255,77,106,0.2)",
              }}
            >
              <p className="font-bold text-sm" style={{ color: "var(--red)" }}>
                {error}
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                kindly contact system administrator to fix the issue
                (+254704345035).
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                No products available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US + TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-3">Why Jnolly?</p>
            <h2
              className="text-4xl font-black tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              The Eldoret Tech Standard.
            </h2>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              We don't just fix computers — we build tech solutions that help
              Eldoret's businesses and individuals thrive in the digital age.
            </p>
            <ul className="space-y-4">
              {WHY_US.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span style={{ color: "var(--emerald)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-10">
              <Link to="/login" className="btn-primary">
                Get Started <ArrowRight size={16} />
              </Link>
              <a href="tel:+254704345035" className="btn-ghost">
                Call Us
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-x-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
                data-aos="fade-left"
                data-aos-delay={i * 100}
              >
                <div className="flex items-start gap-4">
                  <Quote
                    size={20}
                    style={{
                      color: "var(--accent-primary)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <div>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {t.role}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_, si) => (
                          <Star
                            key={si}
                            size={13}
                            style={{ color: "#ffb547", fill: "#ffb547" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="px-6 py-6 mb-6">
        <div
          className="max-w-7xl mx-auto rounded-3xl relative overflow-hidden p-12 md:p-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-primary) 0%, #a78bfa 50%, #7c7cff 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <HeartHandshake className="mx-auto mb-6 text-white/80" size={40} />
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to Level Up?
            </h2>
            <p className="text-white/75 text-base max-w-md mx-auto mb-10 font-medium">
              Join 20+ clients in Eldoret who trust Jnolly Cyber Works for their
              tech needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                style={{ background: "white", color: "var(--accent-primary)" }}
              >
                Create Account
              </Link>
              <a
                href="tel:+254704345035"
                className="px-8 py-4 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
