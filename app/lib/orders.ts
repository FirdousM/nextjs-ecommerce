// app/lib/orders.ts

interface Order {
  id: string;
  items: any[];
  address: string;
  user: any;
  createdAt: Date;
  status: string;
}

let orders: Order[] = []; // In-memory store

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
