'use client';

import { useState } from 'react';
import { useCartStore } from '@/app/store/cartStore';
import Button from './Button';
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductControlsProps = {
  product: Product;
};

export default function ProductControls({ product }: ProductControlsProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const Items = useCartStore((state) => state.items);
  console.log("items:", Items);
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));


  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2 shadow-sm">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded-md hover:bg-gray-300 transition"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[2rem] text-center font-medium text-lg">
          {quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded-md hover:bg-gray-300 transition"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={added}
        variant={added ? "success" : "primary"}
        className="px-6 py-3 rounded-xl"
      >
        {added ? "Added!" : "Add to Cart"}
      </Button>
    </div>
  );
}
