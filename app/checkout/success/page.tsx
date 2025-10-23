'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    // 🔹 Step 1: Retrieve from localStorage
    const localOrder = localStorage.getItem('lastOrder');
    if (localOrder) {
      const parsed = JSON.parse(localOrder);
      if (parsed.id === orderId) {
        setOrder(parsed);

        // 🔹 Step 2: Remove it after a short delay
        setTimeout(() => {
          localStorage.removeItem('lastOrder');
          setCleared(true);
        }, 5000); // 5 seconds delay so it doesn't vanish instantly
      }
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="p-6 text-center text-red-600">
        ❌ No order ID found.
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        Order not found or expired.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-3">🎉 Order Successful!</h1>
      <p className="text-gray-700 mb-4">
        Thank you for your purchase! Your order has been placed successfully.
      </p>

      <p className="text-gray-600 mb-6">
        Order ID: <strong>{order.id}</strong>
      </p>

      <div className="border rounded-lg shadow-md p-4 mx-auto max-w-md bg-white">
        <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
        <p className="text-gray-700">{order.address}</p>
      </div>

      <div className="mt-6">
        <a
          href="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Continue Shopping
        </a>
      </div>

      {cleared && (
        <p className="text-sm text-gray-400 mt-4">
          (Order data cleared from local storage for privacy.)
        </p>
      )}
    </div>
  );
}
