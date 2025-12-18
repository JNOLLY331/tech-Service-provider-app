import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Download, Globe } from 'lucide-react';

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center" data-aos="zoom-in">
        {/* Success Icon Animation */}
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-100">
            <CheckCircle2 size={64} className="text-emerald-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 mb-4 uppercase">
          Order Deployed<span className="text-blue-600">.</span>
        </h1>
        <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
          Your digital assets have been provisioned. Your transaction hash is recorded under ID: 
          <span className="font-black text-zinc-900 ml-2">#{id?.padStart(6, '0')}</span>
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
          <Link to="/profile" className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-blue-600 transition-all group">
            <Globe size={24} className="text-blue-600 mb-4" />
            <h3 className="font-black text-xs uppercase tracking-widest text-zinc-900 mb-1">My Dashboard</h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Access your assets</p>
          </Link>
          
          <Link to="/" className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-blue-600 transition-all group">
            <Package size={24} className="text-blue-600 mb-4" />
            <h3 className="font-black text-xs uppercase tracking-widest text-zinc-900 mb-1">Storefront</h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Deploy more tech</p>
          </Link>
        </div>

        {/* Footer Action */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-zinc-950 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all group"
        >
          Return to Terminal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <p className="mt-12 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">
          Automated Confirmation Sent to Registered Email
        </p>
      </div>
    </div>
  );
}