"use client"; // make this a client component

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";

export default function ProductPage() {
  const { id } = useParams(); // ✅ useParams like in your other pages

  const product = products.find((p) => p._id === id);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.subCategoryId === product.subCategoryId && p._id !== product._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <ProductDetails product={product} />
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
    </div>
  );
}
