'use client';


import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Product } from "@/store/productStore";

interface CartItemType extends Product {
    quantity: number;
}
export default function CartItem({ item }: { item: CartItemType }) {
    const { addToCart, removeFromCart } = useCartStore();

    const handleIncrease = () => addToCart({ ...item, quantity: 1 });
    const handleDecrease = () => {
        if (item.quantity === 1) return; // Optional: prevent negative
        addToCart({ ...item, quantity: -1 });
    };

    const handleRemove = () => removeFromCart(item.id);

    return (
        <div className="flex items-center gap-4 border-b py-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <Link href={`/products/${item.id}`} className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-purple-600 font-bold">${item.price}</p>
            </Link>
            <div className="flex items-center gap-2">
                <button onClick={handleDecrease} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">-</button>
                <span>{item.quantity}</span>
                <button onClick={handleIncrease} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">+</button>
            </div>
            <button onClick={handleRemove} className="text-red-500 font-semibold cursor-pointer">Remove</button>
        </div>
    );
}
