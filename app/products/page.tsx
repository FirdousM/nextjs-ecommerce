import { ProductFilter } from '@/components';

export default async function ProductsPage() {
    // Server fetch
    const allProducts = await fetch('https://fakestoreapi.com/products').then(res => res.json());
    console.log("Fetched products:", allProducts);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <ProductFilter allProducts={allProducts} />
        </div>
    );
}
