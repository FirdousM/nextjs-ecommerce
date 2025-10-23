import { NextResponse } from 'next/server';
import { createOrder } from '@/app/lib/orders';

export async function POST(req: Request) {
  const { items, address, user } = await req.json();

  // Save order in in-memory store
  const order = createOrder({
    items,
    address,
    user: user || null,
    createdAt: new Date(),
  });

  return NextResponse.json(order);
}
