import { JSX } from "react";
import { notFound } from "next/navigation";
import { ProductControls } from "@/app/components";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};
interface ProductDetailsPageProps {
    params: { id: string };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
    const { id } = params;

    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" });

    if (!res.ok) return notFound();

    const product: Product = await res.json();
    const { title, price, description, image, category } = product;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-md p-6">
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={image}
                        alt={title}
                        className="max-h-[450px] w-auto object-contain rounded-xl border border-gray-200"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                            {category}
                        </p>
                        <p className="text-2xl font-semibold text-purple-600 mt-4">
                            ${price.toFixed(2)}
                        </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{description}</p>

                    <div className="mt-4">
                        <ProductControls product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetailsPage;
