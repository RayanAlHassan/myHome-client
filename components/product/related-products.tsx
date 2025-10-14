import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/data"

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-balance">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square relative overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {product.dimension || product.subCategoryId}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price}</span>
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
