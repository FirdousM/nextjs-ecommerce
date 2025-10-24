'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';
import { HeaderCartBadge } from '@/components';
import { Button } from '@/components';

export default function Header() {

  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <Link href="/" className="text-2xl font-extrabold text-purple-600 hover:text-purple-700 transition-colors">
        E-Shop
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/products" className="hover:text-purple-600 transition-colors font-medium">
          Products
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <FaUser size={18} className="text-gray-700" />
            <span className="text-gray-700 font-medium truncate max-w-[120px]">
              {session.user.name ?? 'User'}
            </span>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="danger"
              className="!px-3 !py-1 text-sm rounded-md"
            >
              Logout
            </Button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="flex cursor-pointer items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <FaUser size={16} />
            <span>Login</span>
          </button>
        )}
        <HeaderCartBadge />
      </nav>
    </header>
  );
}
