import { notFound } from "next/navigation"
import { products } from "@/lib/data"
import { ProductDetails } from "@/components/product/product-details"
import { RelatedProducts } from "@/components/product/related-products"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product._id, // ✅ use _id instead of id
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p._id === params.id) // ✅ updated

  if (!product) {
    notFound()
  }

  // ✅ Updated related products logic
  const relatedProducts = products
    .filter((p) => p.subCategoryId === product.subCategoryId && p._id !== product._id)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <ProductDetails product={product} />
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
    </div>
  )
}
