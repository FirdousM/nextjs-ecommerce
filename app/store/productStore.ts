import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductState {
  products: Record<number, Product>;
  setProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: {},

      setProducts: (products) => {
        const mapped = products.reduce<Record<number, Product>>((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {});
        set((state) => ({ products: { ...state.products, ...mapped } }));
      },

      getProductById: (id) => get().products[id],
    }),
    { name: 'product-cache' }
  )
);
