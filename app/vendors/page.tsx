import Link from "next/link"
import Image from "next/image"
import { vendors, products, Vendor, Product } from "@/lib/data"

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Vendors</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vendors.map((vendor: Vendor) => {
          const vendorProducts: Product[] = products.filter(p => p.vendorId === vendor._id)

          return (
            <Link
              key={vendor._id}
              href={`/vendors/${vendor._id}`}
              className="group flex flex-col items-center bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={vendor.image || "/placeholder-logo.svg"}
                  alt={vendor.companyName}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-center group-hover:text-primary transition-colors mb-2">
                {vendor.companyName}
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {vendorProducts.length} {vendorProducts.length === 1 ? "Product" : "Products"}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
