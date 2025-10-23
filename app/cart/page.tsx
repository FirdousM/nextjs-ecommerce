'use client';

import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCartStore } from '../store/cartStore';


export default function CartPage() {
    const { items: cartItems } = useCartStore();

    if (cartItems?.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-700">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <a href="/products" className="text-purple-600 hover:underline">Browse Products</a>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col gap-4">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/3">
                <CartSummary />
            </div>
        </div>
    );
}
