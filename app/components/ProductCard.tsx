'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '../store/productStore';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <Link href={`/products/${product.id}`}>
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-60 object-contain p-4"
          />
          <div className="p-4">
            <h2 className="font-semibold text-lg truncate">{product.title}</h2>
            <p className="mt-2 font-bold text-purple-600">${product.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
