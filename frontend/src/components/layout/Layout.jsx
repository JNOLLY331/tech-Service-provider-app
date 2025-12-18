import NavBar from './NavBar';
import Footer from './Footer';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex-grow pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}