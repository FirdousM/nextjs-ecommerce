'use client';

import React, { useEffect, useState } from 'react';
import { CartItemType, useCartStore } from '@/store/cartStore'; // Ensure CartProduct is exported
import { useSession } from 'next-auth/react';

async function fetchServerCart(userId: string): Promise<CartItemType[]> {

    const response = await fetch(`https://fakestoreapi.com/carts/1`, {
        method: 'GET',
    });
    if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to fetch server cart');
    }

    return response.json();
}

export default function CartProviderWrapper({ children }: { children: React.ReactNode }) {

    const { data: session, status } = useSession() as { data: { user: { id: string } } | null, status: string };
    const syncCart = useCartStore((state) => state.syncCart);
    const [hasSynced, setHasSynced] = useState(false);

    useEffect(() => {
        const isAuthenticated = status === 'authenticated';
        const userId = session?.user?.id;
        if (isAuthenticated && userId && !hasSynced) {
            fetchServerCart(userId)
                .then(serverCartArray => {
                    syncCart({ products: serverCartArray.map(p => ({ productId: p.id, quantity: p.quantity })) });
                    setHasSynced(true);
                })
                .catch(error => {
                    setHasSynced(true);
                });
        }
        if (status === 'unauthenticated' && hasSynced) {
            setHasSynced(false);
        }

    }, [status, session, hasSynced]);
    return <>{children}</>;
}