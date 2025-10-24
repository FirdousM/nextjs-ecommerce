import { HeroSection } from '@/components';
import { ProductCard } from '@/components';
import { PromoBanner } from '@/components';
import { Product } from '@/store/productStore';

export default async function Home() {
  const products = await fetch('https://fakestoreapi.com/products?limit=6').then(res => res.json());

  return (
    <div className="container mx-auto p-4">
      <HeroSection />

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Hot Deals</h2>
        <PromoBanner title="50% Off Summer Sale" subtitle="Limited Time Offer" bgClass="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
        <PromoBanner title="New Arrivals" subtitle="Check Out The Latest" bgClass="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500" />
      </section>
    </div>
  );
}

