'use client';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '@/store/cartStore';

export default function HeaderCartBadge() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <>
      <div className="relative">
        <Link href="/cart">
          <FaShoppingCart size={24} className="hover:text-purple-600 transition" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}