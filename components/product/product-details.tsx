
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Mail, Phone, Check } from "lucide-react";
import { products, subCategories, categories, Product } from "@/lib/data";
import { isDoorProduct } from "@/utils/ar";
import { ARViewer } from "@/components/ar/ar-viewer";

export function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAR, setShowAR] = useState(false);

  // Dummy multiple images for gallery
  const images = [product.image, product.image, product.image];

  const subCategory = subCategories.find(
    (sub) => sub._id === product.subCategoryId
  );
  const category = subCategory
    ? categories.find((cat) => cat._id === subCategory.categoryId)
    : undefined;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/category/${category._id
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="hover:text-foreground transition-colors"
            >
              {category.title}
            </Link>
            <span>/</span>
          </>
        )}
        {subCategory && (
          <span className="text-foreground">{subCategory.title}</span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted mb-4">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square relative overflow-hidden rounded-lg bg-muted border-2 transition-all ${
                  selectedImage === idx
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.title} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            {category && (
              <span className="text-sm text-muted-foreground">
                {category.title}
              </span>

            )}
            {subCategory && (
              <>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {subCategory.title}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            {product.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

          {product.dimension && (
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://img.icons8.com/parakeet/48/surface.png"
                alt="dimension icon"
                width={24}
                height={24}
              />
              <span className="text-sm text-muted-foreground">
                {product.dimension}
              </span>
            </div>
          )}

          <div className="text-4xl font-bold mb-8">${product.price}</div>

       

         
          {/* Actions */}
          <div className="space-y-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Request Quote
              </Link>
            </Button>

            {/* AR Button - only show if the product has AR models */}
            {isDoorProduct(product.subCategoryId) &&
              (product.modelGlb || product.modelUsdz) && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setShowAR(true)}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  View in AR
                </Button>
              )}

            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call for Details
            </Button>
          </div>
        </div>
      </div>

      {/* AR Viewer Modal */}
      {showAR && (
        <ARViewer product={product} onClose={() => setShowAR(false)} />
      )}
    </div>
  );
}
