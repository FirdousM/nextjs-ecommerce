'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl overflow-hidden mb-12">
      <div className="absolute inset-0 flex flex-col justify-center items-start p-12 max-w-2xl text-white">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold mb-4">
          Discover Your Style
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-lg mb-6">
          The latest fashion trends delivered to your doorstep.
        </motion.p>
        <motion.a href="/products" whileHover={{ scale: 1.05 }} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Now
        </motion.a>
      </div>
    </section>
  );
}
