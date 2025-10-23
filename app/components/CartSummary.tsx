'use client';

import { useCartStore } from "../store/cartStore";
import Link from "next/link";
import Button from "./Button";

export default function CartSummary() {
    const { items: cart = [] } = useCartStore();
    // let cart = [];
    const totalPrice = cart?.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-2">Total Items: {cart?.reduce((sum: number, item: { quantity: number; }) => sum + item.quantity, 0)}</p>
            <p className="text-lg font-semibold mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
            <Link href="/checkout">
                <Button
                    variant="primary"
                    fullWidth
                >
                    Proceed to Checkout
                </Button>
            </Link>
        </div>
    );
}
