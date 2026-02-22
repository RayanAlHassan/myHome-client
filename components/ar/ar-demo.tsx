
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";
import { products, subCategories } from "@/lib/data";
import { ARViewer } from "@/components/ar/ar-viewer";
import Image from "next/image";
import Link from "next/link";
import { isDoorProduct } from "@/utils/ar";

export function ARDemo() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // 1️⃣ Filter door products with model URLs
  const arProductsBySubcategory: typeof products = [];
  const addedSubcategories = new Set<string>();

  for (const product of products) {
    if (
      isDoorProduct(product.subCategoryId) &&      // must be a door subcategory
      (product.modelGlb || product.modelUsdz) &&   // must have AR model
      product.subCategoryId &&                     // safety check
      !addedSubcategories.has(product.subCategoryId) // only one per subcategory
    ) {
      arProductsBySubcategory.push(product);
      addedSubcategories.add(product.subCategoryId);
    }
  }

  if (arProductsBySubcategory.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30" id="explore-ar">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Try AR with Our Interior Doors
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Select a product below to see it in augmented reality. On mobile devices, you can place products in your actual space!
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {arProductsBySubcategory.map(product => {
              const subCat = subCategories.find(sc => sc._id === product.subCategoryId);

              return (
                <div
                  key={product._id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square relative bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      AR Ready
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subCat?.title || "Uncategorized"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => setSelectedProduct(product)}>
                        <Camera className="mr-2 h-4 w-4" />
                        View in AR
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/product/${product._id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">How AR Works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Click "View in AR" on any product above</li>
                <li>• Rotate and zoom the 3D model on your screen</li>
                <li>
                  • On mobile: Tap "View in Your Space" to use your camera
                </li>
                <li>• Place products in your room to see actual size</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Device Compatibility</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• iOS: iPhone 6S and newer with iOS 12+</li>
                <li>• Android: Devices with ARCore support (Android 8+)</li>
                <li>• Desktop: View and rotate 3D models (no AR placement)</li>
                <li>• Best experience: Use Safari (iOS) or Chrome (Android)</li>
              </ul>
            </div>
          </div>









          {/* AR Viewer Modal */}
          {selectedProduct && (
            <ARViewer
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
