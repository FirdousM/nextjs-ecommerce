'use client';
import { useEffect, useState } from 'react';
import { ProductCard } from '@/components';
import { Product, useProductStore } from '@/store/productStore';

export default function ProductFilter({ allProducts }: { allProducts: Product[] }) {
  const categories = ['All', "Men's Clothing", "Women's Clothing", 'Electronics', 'Jewelery'];
  const [active, setActive] = useState('All');
  const [products, setProducts] = useState(allProducts);
  const setProductsInStore = useProductStore((s) => s.setProducts);

  useEffect(() => {
    if (allProducts?.length) {
      setProductsInStore(allProducts);
    }
  }, [allProducts, setProductsInStore]);

  const handleFilter = (category: string) => {
    setActive(category);
    if (category === 'All')
      setProducts(allProducts);

    else {
      console.log(category);
      setProducts(
        allProducts.filter((p: Product) =>
          p.category.toLowerCase() === category.toLowerCase()
        ));
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-full cursor-pointer border transition ${active === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
