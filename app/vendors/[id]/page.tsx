"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { vendors, products, Vendor, Product, subCategories } from "@/lib/data";
import { ProductGrid } from "@/components/category/product-grid";
import { Box } from "lucide-react";

export default function VendorPage() {
  const { id } = useParams(); // ✅ same as your EditEventPage

  const vendor: Vendor | undefined = vendors.find((v) => v._id === id);
  if (!vendor) notFound();

  const vendorProducts: Product[] = products.filter((p) => p.vendorId === vendor._id);
  const vendorSubcategories = subCategories.filter((sub) =>
    vendorProducts.some((p) => p.subCategoryId === sub._id)
  );

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      {/* Vendor Info */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <img
            src={vendor.image || "/placeholder-logo.svg"}
            alt={vendor.companyName}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{vendor.companyName}</h1>
        <p className="text-muted-foreground max-w-xl mb-1">📞 {vendor.companyPhone}</p>
        <p className="text-muted-foreground max-w-xl mb-1">📍 {vendor.companyAddress}</p>
        <p className="text-muted-foreground max-w-xl mb-1">🕒 {vendor.workingHours}</p>

        <div className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-full shadow-lg font-semibold text-lg">
          <Box className="w-5 h-5" />
          {vendorProducts.length} {vendorProducts.length === 1 ? "Product" : "Products"}
        </div>
      </div>

      <ProductGrid
        products={vendorProducts}
        subcategories={vendorSubcategories}
        vendors={[]}
      />
    </div>
  );
}
