import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, Package, ArrowRight, Globe,
  Home, Share2, Phone, Sparkles
} from 'lucide-react';

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="max-w-lg w-full text-center">

        {/* Success icon */}
        <div className="relative inline-block mb-10">
          <div
            className="absolute inset-0 rounded-full blur-3xl animate-glow-pulse"
            style={{ background: 'var(--emerald-bg)', transform: 'scale(1.5)' }}
          />
          <div
            className="relative w-24 h-24 rounded-3xl flex items-center justify-center mx-auto"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(16,217,154,0.3)',
              boxShadow: '0 0 40px rgba(16,217,154,0.2)',
            }}
          >
            <CheckCircle2 size={48} strokeWidth={1.5} style={{ color: 'var(--emerald)' }} />
          </div>
        </div>

        {/* Sparkles */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={16} style={{ color: 'var(--amber)' }} />
          <span className="section-label">Order Confirmed</span>
          <Sparkles size={16} style={{ color: 'var(--amber)' }} />
        </div>

        {/* Heading */}
        <h1
          className="text-5xl font-black tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          You're All Set
          <span style={{ color: 'var(--accent-primary)' }}>.</span>
        </h1>

        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          Your order has been received and is being processed.
        </p>

        {/* Order ID badge */}
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-10"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
          }}
        >
          <Package size={16} style={{ color: 'var(--accent-primary)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
            Order ID:
          </span>
          <code
            className="text-sm font-black"
            style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}
          >
            #{id?.padStart(6, '0')}
          </code>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link
            to="/"
            className="group p-6 rounded-2xl text-left transition-all hover:-translate-y-1"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Globe
              size={22}
              className="mb-3 transition-transform group-hover:scale-110"
              style={{ color: 'var(--accent-primary)' }}
            />
            <h3
              className="font-black text-xs uppercase tracking-wider mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Back to Store
            </h3>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Browse more services
            </p>
          </Link>

          <a
            href="tel:+254700000000"
            className="group p-6 rounded-2xl text-left transition-all hover:-translate-y-1"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Phone
              size={22}
              className="mb-3 transition-transform group-hover:scale-110"
              style={{ color: 'var(--emerald)' }}
            />
            <h3
              className="font-black text-xs uppercase tracking-wider mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Call Us
            </h3>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Get service status
            </p>
          </a>
        </div>

        {/* CTA */}
        <Link
          to="/"
          className="btn-primary"
          style={{ width: 'auto', display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '1rem' }}
        >
          Return to Store <ArrowRight size={16} />
        </Link>

        <p
          className="mt-8 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          A confirmation was sent to your registered email.
        </p>
      </div>
    </div>
  );
}