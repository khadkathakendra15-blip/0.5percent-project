import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function FloatingAboutButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/about')}
      className="vfy-fab fixed right-0 top-1/2 -translate-y-1/2 z-50 py-5 px-2.5 rounded-l-xl shadow-xl cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, #1e77c1 0%, #e63329 100%)',
        boxShadow: '-4px 0 20px rgba(30,119,193,0.30)',
        writingMode: 'vertical-rl',
      }}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      title="About Us"
    >
      <span
        className="text-white font-black uppercase tracking-[0.2em]"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '13px',
          transform: 'rotate(180deg)',
          display: 'block',
        }}
      >
        About Us
      </span>
    </motion.button>
  );
}
