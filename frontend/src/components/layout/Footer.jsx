import { Link } from 'react-router-dom';
import {
  ShieldCheck, Mail, Phone, MapPin,
  MessageSquare, Code, Camera, Briefcase,
  ArrowUpRight, Cpu, Globe, Code2, Wifi, Zap,
  Target
} from 'lucide-react';
import React from 'react';
import { 
  FaWhatsapp, 
  FaTiktok, 
  FaXTwitter, 
  FaLinkedin, 
  FaYoutube 
} from 'react-icons/fa6';

const SERVICES = [
  { label: 'Software Installation', icon: <Cpu size={13} /> },
  { label: 'Web Design & E-Portfolio', icon: <Globe size={13} /> },
  { label: 'Paper Formatting', icon: <Code2 size={13} /> },
  { label: 'Cyber Services', icon: <Wifi size={13} /> },
  { label: 'Tech Consulting', icon: <Zap size={13} /> },
];

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/category/services' },
  { label: 'Portfolio Work', path: '/category/portfolio' },
  { label: 'Cart', path: '/cart' },
  { label: 'Sign In', path: '/login' },
];

const SOCIALS = [
  { icon: <FaWhatsapp size={22} />, label: 'WhatsApp', href: 'https://wa.me/254704345035'  },
  { icon: <FaTiktok size={22} />, label: 'TikTok', href: '#' },
  { icon: <FaXTwitter size={22} />, label: 'Twitter / X', href: '#' },
  { icon: <FaLinkedin size={22} />, label: 'LinkedIn', href: '#' },
  { icon: <FaYoutube size={22} />, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-0 overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'var(--gradient-glow)', opacity: 0.6 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* ── BRAND COLUMN ── */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, #a78bfa 100%)',
                  boxShadow: '0 4px 16px var(--accent-glow)',
                }}
              >
                <ShieldCheck className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p
                  className="text-base font-black tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  Jnolly<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </p>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  Cyber Works
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Leading tech provider in Eldoret, specializing in software installations,
              e-portfolios,Web Design, app Development, Laptop Troubleshooting and premium cyber solutions.
            </p>
            {/* Socials */}
           {/* Social Media Icons */}
<div className="flex gap-4">
  {SOCIALS.map((social, index) => (
    <a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-xl flex items-center justify-center 
                 transition-all duration-300 
                 hover:scale-110 hover:shadow-lg
                 active:scale-95 hover:bg-blue-400 text-gray-400 hover:text-white"
      aria-label={social.label}
    >
      {social.icon}
    </a>
  ))}
</div>
          </div>

          {/* ── SERVICES ── */}
          <div>
            <h4
              className="text-[10px] font-black uppercase tracking-[0.25em] mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium transition-all hover:translate-x-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent-primary)' }}>{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── QUICK LINKS ── */}
          <div>
            <h4
              className="text-[10px] font-black uppercase tracking-[0.25em] mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="flex items-center gap-2 text-sm font-medium transition-all hover:translate-x-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ArrowUpRight size={12} style={{ color: 'var(--accent-primary)' }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CONTACT ── */}
          <div className="col-span-2 md:col-span-1">
            <h4
              className="text-[10px] font-black uppercase tracking-[0.25em] mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              Contacts
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:japhethanold2@gmail.com.com"
                  className="flex items-start gap-3 text-sm transition-all hover:translate-x-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>info@jnollycyber.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254704345035"
                  className="flex items-start gap-2 text-sm transition-all hover:translate-x-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Phone size={15} className="mt-0.5 " style={{ color: 'var(--accent-primary)' }} />
                  <span>+254704 345 035</span>
                </a>
              </li>
              <li>
                <div
                  className="flex items-start gap-3 text-sm transition-all hover:translate-x-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                  <span>Eldoret Town, Kenya<br />Open: 24/7</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} Jnolly Cyber Works. Built by{' '}
            <span style={{ color: 'var(--accent-primary)' }}>Japheth Anold</span>.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}