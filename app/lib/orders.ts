// app/lib/orders.ts

import { Product } from "../store/productStore";

interface Order {
  id: string;
  items: Product[];
  address: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: Date;
  status: string;
}

const orders: Order[] = []; // In-memory store

export function createOrder(data: Omit<Order, 'id' | 'status'>): Order {
  const order = {
    id: Date.now().toString(), // unique timestamp ID
    status: 'success',
    ...data,
  };

  orders.push(order);

  return order;
}

export function getOrderById(id: string): Order | null {
  return orders.find((o) => o.id === id) || null;
}
