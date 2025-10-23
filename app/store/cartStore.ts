// app/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useProductStore } from './productStore';
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category: string;
}
export interface CartItemType extends Product {
  quantity: number;
}
interface CartState {
  items: CartItemType[];
  totalItems: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  syncCart: (serverCartData: ServerCartData) => Promise<void>;
}
interface ServerCartData {
  products: ProductItem[];
}
interface ProductItem {
  productId: number;
  quantity: number;
}
const _calculateTotals = (items: Product[] | ProductItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],
      totalItems: 0,
      addToCart: (product) => {
        const existingProduct = get().items.find((item) => item.id === product.id);
        if (existingProduct) {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
            );
            return { items: updatedItems };
          });
        } else {
          set((state) => {
            state.items.push({ ...product, quantity: product.quantity || 1 });
            return { items: [...state.items] };
          });
        }
        set({
          totalItems: _calculateTotals(get().items), // Calculate and set the new total
        });
      },
      syncCart: async (serverCartData: ServerCartData) => {
        const { getProductById } = useProductStore.getState();

        if (!serverCartData || !Array.isArray(serverCartData.products)) return;

        const localItems = get().items || [];
        const serverItems = serverCartData.products || [];

        const mergedItems: CartItemType[] = [];

        for (const serverItem of serverItems) {

          const localMatch = localItems.find(i => i.id === serverItem.productId);
          const productData = getProductById(serverItem.productId);
          const finalQuantity = localMatch
            ? Math.max(localMatch.quantity, serverItem.quantity)
            : serverItem.quantity;
          mergedItems.push({
            ...productData,
            quantity: finalQuantity,
          });
        }
        for (const localItem of localItems) {
          if (!mergedItems.find(i => i.id === localItem.id)) {
            mergedItems.push(localItem);
          }
        }
        set({
          items: mergedItems,
          totalItems: _calculateTotals(mergedItems),
        });
      },
      removeFromCart: (id) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.id !== id);

          return {
            items: updatedItems,
            totalItems: _calculateTotals(updatedItems),
          };
        });
      },
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
        });
      },

    }),
    {
      name: 'cart-storage',
    }
  )
);
