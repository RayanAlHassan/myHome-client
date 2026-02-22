"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDetails } from "@/components/product/product-details";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        if (!res.ok) return notFound();
        const data = await res.json();

        // ✅ Use backend fields directly
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <ProductDetails product={product} />
    </div>
  );
}