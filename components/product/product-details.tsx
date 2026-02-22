"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Mail, Phone } from "lucide-react";
import { ARViewer } from "@/components/ar/ar-viewer";
import type { Product } from "@/lib/type";

export function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAR, setShowAR] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const images = product.images?.map((img) => `${API_URL}/api/uploads/images/${img}`) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        {product.categoryId && (
          <>
            <span>/</span>
            <Link href={`/category/${product.categoryId._id}`} className="hover:text-foreground transition-colors">
              {product.categoryId.title}
            </Link>
          </>
        )}
        {product.subCategoryId && (
          <>
            <span>/</span>
            <span className="text-foreground">{product.subCategoryId.title}</span>
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted mb-4">
            <Image src={images[selectedImage] || "/placeholder.svg"} alt={product.title} fill className="object-cover" priority />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)}
                  className={`aspect-square relative overflow-hidden rounded-lg bg-muted border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-border"
                  }`}
                >
                  <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            {product.categoryId && <span className="text-sm text-muted-foreground">{product.categoryId.title}</span>}
            {product.subCategoryId && (
              <>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{product.subCategoryId.title}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
          <p className="text-base text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          {product.dimension && (
            <div className="flex items-center gap-2 mb-6">
              <Image src="https://img.icons8.com/parakeet/48/surface.png" alt="dimension icon" width={24} height={24} />
              <span className="text-sm text-muted-foreground">{product.dimension}</span>
            </div>
          )}

          <div className="text-4xl font-bold mb-8">${product.price}</div>

          <div className="space-y-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/contact"><Mail className="mr-2 h-5 w-5" /> Request Quote</Link>
            </Button>

            {(product.modelGlb || product.modelUsdz) && (
              <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => setShowAR(true)}>
                <Camera className="mr-2 h-5 w-5" /> View in AR
              </Button>
            )}

            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
              <a href="tel:+96100000000"><Phone className="mr-2 h-5 w-5" /> Call for Details</a>
            </Button>
          </div>
        </div>
      </div>

      {showAR && <ARViewer product={product} onClose={() => setShowAR(false)} />}
    </div>
  );
}