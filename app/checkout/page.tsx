'use client';
import { useCartStore } from '@/app/store/cartStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components';

export default function CheckoutPage() {
  const { items, totalItems } = useCartStore();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, address }),
    });
    const order = await res.json();
    localStorage.setItem('lastOrder', JSON.stringify(order));
    useCartStore.getState().clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart summary */}
      <div className="mb-6 border p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">Order Summary ({totalItems} items)</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <span>{item.title}</span>
              </div>
              <span className="font-semibold">${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Address input */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Shipping Address</label>
        <textarea
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Checkout button */}
      <Button
        onClick={handleCheckout}
        disabled={!address || loading}
        loading={loading}
        loadingText='Placing Order...'
        fullWidth
      >
        Place Order
      </Button>
    </div>
  );
}
