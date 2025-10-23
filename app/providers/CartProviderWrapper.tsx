'use client';

import React, { useEffect, useState } from 'react';
import { CartItemType, useCartStore } from '../store/cartStore'; // Ensure CartProduct is exported
import { useSession } from 'next-auth/react';
import { Product } from '../store/productStore';
import { Session } from 'next-auth';
// Import your custom session type

// --- API Fetch Placeholder ---
// You will need a backend API route like /api/cart that fetches the user's cart from your DB.
// It must use the user's ID or a Bearer token for authorization.
async function fetchServerCart(userId: string): Promise<CartItemType[]> {
// async function fetchServerCart(userId: string): Promise<any[]> {
    // console.log(`Attempting to fetch server cart for User ID: ${userId}`);

    // 💡 IMPORTANT: Replace this with your actual secure API call.
    // This is a placeholder that simulates fetching data.
    const response = await fetch(`https://fakestoreapi.com/carts/1`, {
        method: 'GET',
        // In a real app, you would include an Authorization header with a JWT/access token
        // headers: { 'Authorization': `Bearer ${userToken}` },
    });
    // console.log("https://fakestoreapi.com/carts/1", response);
    if (!response.ok) {
        // Handle 404/no cart case gracefully
        if (response.status === 404) return [];
        throw new Error('Failed to fetch server cart');
    }

    return response.json(); // Must return an array of CartProduct
}

// --- Provider Component ---
export default function CartProviderWrapper({ children }: { children: React.ReactNode }) {
    // Cast the session data to your custom type for full property access
    const { data: session, status } = useSession() as { data: { user: { id: string } } | null, status: string };

    // Select the action and hydration state from the store
    const syncCart = useCartStore((state) => state.syncCart);
    // const isHydrated = useCartStore((state) => state.isHydrated);

    // Local state to ensure the sync only runs once per login/load
    const [hasSynced, setHasSynced] = useState(false);

    useEffect(() => {
        const isAuthenticated = status === 'authenticated';

        // 1. Get the User ID from the custom session object
        const userId = session?.user?.id;

        // 2. Check all conditions before syncing
        if (isAuthenticated && userId && !hasSynced) {
            // if (isAuthenticated && userId && isHydrated && !hasSynced) {

            // console.log("Conditions met: Syncing cart.");

            fetchServerCart(userId)
                .then(serverCartArray => {
                    // 3. Reconcile the local cart (from localStorage) with the remote cart
                    // syncCart(serverCartData); 
                    syncCart({ products: serverCartArray.map(p => ({ productId: p.id, quantity: p.quantity })) });
                    // console.log("Cart synchronized successfully.");
                    setHasSynced(true); // Mark as synced
                })
                .catch(error => {
                    // console.error("Error during cart sync:", error);
                    setHasSynced(true); // Still mark as synced to prevent endless loops
                });
        }

        // Cleanup function: Resets the sync flag if the user logs out
        if (status === 'unauthenticated' && hasSynced) {
            setHasSynced(false);
        }

    }, [status, session, hasSynced]);
    // }, [status, session, isHydrated, hasSynced, syncCart]);

    return <>{children}</>;
}