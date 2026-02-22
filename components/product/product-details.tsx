"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Phone, MapPin, Clock, User, Building2 } from "lucide-react";
import ARViewer from "@/components/ar/ARViewerReal";
import type { BackendProduct } from "@/app/product/[id]/page";

type VendorProfile = {
  companyName?: string;
  companyPhone?: string;
  companyAddress?: string;
  workingHours?: string;
  status?: string;
};

type VendorUser = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  vendorProfile?: VendorProfile | null;
};

function isHttp(url?: string) {
  return !!url && /^https?:\/\//i.test(url);
}

function buildUploadUrl(
  uploadsBase: string,
  folder: "images" | "models",
  file?: string | null
) {
  if (!file) return "";
  if (isHttp(file)) return file;
  return `${uploadsBase}/${folder}/${file}`;
}

export default function ProductDetails({
  product,
  apiBase,
  uploadsBase,
}: {
  product: BackendProduct;
  apiBase: string;
  uploadsBase: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAR, setShowAR] = useState(false);

  // ✅ Prefer vendorId if populated, fallback to userId
  const [vendor, setVendor] = useState<VendorUser | null>(() => {
    if (product.vendorId && typeof product.vendorId === "object")
      return product.vendorId as VendorUser;
    if (product.userId && typeof product.userId === "object")
      return product.userId as VendorUser;
    return null;
  });

  // ✅ If not populated, try to fetch vendor/user info (will fail if admin-only, but UI stays fine)
  useEffect(() => {
    const vendorId =
      typeof product.vendorId === "string"
        ? product.vendorId
        : typeof product.userId === "string"
        ? product.userId
        : "";

    if (!vendorId || vendor) return;

    (async () => {
      try {
        // NOTE: if your backend protects /user/:id => this will fail silently (OK)
        const res = await fetch(`${apiBase}/user/${vendorId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        setVendor(data);
      } catch {
        // ignore
      }
    })();
  }, [apiBase, product.vendorId, product.userId, vendor]);

  // ✅ Build images properly from product.images[]
  const images = useMemo(() => {
    const list = Array.isArray(product.images) ? product.images : [];
    if (!list.length) return ["/placeholder.svg"];

    return list.map(
      (img) => buildUploadUrl(uploadsBase, "images", img) || "/placeholder.svg"
    );
  }, [product.images, uploadsBase]);

  // ✅ Real GLB URL if exists
  const modelGlbUrl = useMemo(() => {
    return buildUploadUrl(uploadsBase, "models", product.modelGlb);
  }, [product.modelGlb, uploadsBase]);

  const hasGlb = !!modelGlbUrl;

  // ✅ Vendor info
  const companyName =
    vendor?.vendorProfile?.companyName || vendor?.name || "Vendor";
  const companyPhone = vendor?.vendorProfile?.companyPhone || vendor?.phone || "";
  const companyAddress = vendor?.vendorProfile?.companyAddress || "";
  const workingHours = vendor?.vendorProfile?.workingHours || "";

  const callHref = companyPhone
    ? `tel:${companyPhone.replace(/\s+/g, "")}`
    : "";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted mb-4 border">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {images.slice(0, 9).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === idx
                    ? "border-orange-500"
                    : "border-transparent hover:border-gray-300"
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

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {product.title}
          </h1>

          {product.description ? (
            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {product.description}
            </p>
          ) : null}

          <div className="text-3xl font-bold mb-6">${product.price}</div>

          {product.dimension ? (
            <div className="text-sm text-muted-foreground mb-6">
              <span className="font-semibold text-foreground">
                Dimensions:
              </span>{" "}
              {product.dimension}
            </div>
          ) : null}

          {/* ✅ Vendor Card (added, design kept simple + consistent) */}
          <div className="border rounded-2xl p-4 md:p-5 bg-white dark:bg-black shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-orange-500" />
              <h2 className="font-semibold text-lg">Vendor Details</h2>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{companyName}</span>
              </div>

              {companyPhone ? (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{companyPhone}</span>
                </div>
              ) : (
                <div className="text-muted-foreground italic">
                  No vendor phone provided
                </div>
              )}

              {companyAddress ? (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{companyAddress}</span>
                </div>
              ) : null}

              {workingHours ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{workingHours}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* ✅ Actions (Call = orange primary, AR optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
            {/* Main button orange */}
            <Button
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              asChild
              disabled={!callHref}
            >
              <a href={callHref || "#"} aria-disabled={!callHref}>
                <Phone className="mr-2 h-5 w-5" />
                Call Vendor
              </a>
            </Button>

            {hasGlb ? (
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setShowAR(true)}
              >
                <Camera className="mr-2 h-5 w-5" />
                View 3D / AR
              </Button>
            ) : (
              <Button size="lg" variant="outline" className="w-full" disabled>
                <Camera className="mr-2 h-5 w-5" />
                3D Not Available
              </Button>
            )}
          </div>

          {/* Optional GLB link */}
          {/* {hasGlb && (
            <a
              href={modelGlbUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-sm text-orange-500 underline hover:text-orange-600"
            >
              Download GLB file
            </a>
          )} */}
        </div>
      </div>

      {/* ✅ AR Viewer Modal (real GLB) */}
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