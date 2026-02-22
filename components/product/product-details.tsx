"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Mail, Phone } from "lucide-react";
import { ARViewer } from "@/components/ar/ARViewerReal";
import type { BackendProduct } from "@/app/product/[id]/page";

function isValidHttp(url?: string) {
  return !!url && /^https?:\/\//i.test(url);
}

export function ProductDetails({
  product,
  uploadsBase,
}: {
  product: BackendProduct;
  uploadsBase: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAR, setShowAR] = useState(false);

  // ✅ Build image URLs from your backend filenames
  const images = useMemo(() => {
    const list = Array.isArray(product.images) ? product.images : [];
    if (list.length === 0) return ["/placeholder.svg"];
    return list.map((img) => {
      if (!img) return "/placeholder.svg";
      if (isValidHttp(img)) return img;
      // ✅ server serves images under /api/uploads/images/<filename>
      return `${uploadsBase}/images/${img}`;
    });
  }, [product.images, uploadsBase]);

  // ✅ Build GLB URL from filename (real data)
  const modelGlbUrl = useMemo(() => {
    const file = product.modelGlb;
    if (!file) return "";
    if (isValidHttp(file)) return file;
    return `${uploadsBase}/models/${file}`;
  }, [product.modelGlb, uploadsBase]);

  const hasGlb = !!modelGlbUrl;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb (simple) */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
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
            {images.slice(0, 9).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square relative overflow-hidden rounded-lg bg-muted border-2 transition-all ${
                  selectedImage === idx
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
                type="button"
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            {product.title}
          </h1>

          {product.description ? (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {product.description}
            </p>
          ) : null}

          {product.dimension ? (
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
          ) : null}

          <div className="text-4xl font-bold mb-8">${product.price}</div>

          {/* Actions */}
          <div className="space-y-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Request Quote
              </Link>
            </Button>

            {/* ✅ Show only if GLB exists */}
            {hasGlb && (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-ornage space-y-4"
                  onClick={() => setShowAR(true)}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  View 3D / AR
                </Button>

                {/* Optional: show direct link to GLB file */}
                {/* <a
                  href={modelGlbUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center text-sm text-orange-500 underline hover:text-orange-600"
                >
                  Download GLB file
                </a> */}
              </>
            )}

            <Button size="lg" variant="outline" className="w-full bg-transparent">
              <Phone className="mr-2 h-5 w-5" />
              Call for Details
            </Button>
          </div>

          {!hasGlb && (
            <p className="mt-4 text-sm text-muted-foreground">
              3D model is not available for this product.
            </p>
          )}
        </div>
      </div>

      {/* AR Viewer Modal */}
      {showAR && hasGlb && (
        <ARViewer
          productTitle={product.title}
          dimension={product.dimension}
          modelSrc={modelGlbUrl}
          onClose={() => setShowAR(false)}
        />
      )}
    </div>
  );
}

export default ProductDetails;