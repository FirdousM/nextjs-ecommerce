'use client';
import { motion } from 'framer-motion';

export default function PromoBanner({ title, subtitle, bgClass }: { title: string; subtitle: string; bgClass: string }) {
  return (
    <motion.div className={`w-full h-40 rounded-xl flex items-center justify-center text-white ${bgClass} mb-6`} whileHover={{ scale: 1.02 }}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-md">{subtitle}</p>
      </div>
    </motion.div>
  );
}
