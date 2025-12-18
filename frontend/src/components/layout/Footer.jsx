export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-2xl font-black tracking-tighter mb-4">JNOLLY.</h2>
          <p className="text-gray-500 max-w-sm leading-relaxed">
            Leading tech provider in Busia, specializing in software installations, 
            e-portfolios, and high-performance cyber solutions.f
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Web Design</li>
            <li className="hover:text-blue-600 cursor-pointer">Paper Formatting</li>
            <li className="hover:text-blue-600 cursor-pointer">Software Install</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <p className="text-gray-500 text-sm">Busia, Kenya</p>
          <p className="text-gray-500 text-sm mt-2">info@jnollycyber.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
        © 2026 Jnolly Cyber Works. Built by Japheth Anold.
      </div>
    </footer>
  );
}