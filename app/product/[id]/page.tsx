// "use client";

// import { useParams, notFound } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import { ProductDetails } from "@/components/product/product-details";

// // Minimal Product type (match your backend)
// export type BackendProduct = {
//   _id: string;
//   title: string;
//   description?: string;
//   price: number;
//   dimension?: string;
//   images: string[];
//   modelGlb?: string | null;

//   // these might be populated or just ids
//   categoryId?: any;
//   subCategoryId?: any;
//   vendorId?: any;
//   userId?: any;
// };

// function normalizeBaseUrl(raw?: string) {
//   const base = (raw || "").trim().replace(/\/$/, "");
//   if (!base) return "";
//   return base;
// }

// /**
//  * Build API base and uploads base safely whether env is:
//  *  - http://localhost:5001
//  *  - http://localhost:5001/api
//  */
// function getApiBases(raw?: string) {
//   const base = normalizeBaseUrl(raw);

//   // If env already ends with /api, don't add it again
//   const apiBase = base.endsWith("/api") ? base : `${base}/api`;

//   // Your server serves uploads under /api/uploads
//   const uploadsBase = `${apiBase}/uploads`;

//   return { base, apiBase, uploadsBase };
// }

// export default function ProductPage() {
//   const params = useParams();
//   const id = (params?.id as string) || "";

//   const { apiBase, uploadsBase } = useMemo(
//     () => getApiBases(process.env.NEXT_PUBLIC_API_URL),
//     []
//   );

//   const [product, setProduct] = useState<BackendProduct | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         // ✅ Correct endpoint no matter env includes /api or not
//         const res = await fetch(`${apiBase}/products/${id}`, {
//           cache: "no-store",
//         });
//         if (!res.ok) return notFound();
//         const data = (await res.json()) as BackendProduct;
//         setProduct(data);
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//         notFound();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id, apiBase]);

//   if (loading) return <div className="p-10">Loading...</div>;
//   if (!product) return notFound();

//   return (
//     <div className="min-h-screen">
//       <ProductDetails product={product} uploadsBase={uploadsBase} />
//     </div>
//   );
// }
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductDetails from "@/components/product/product-details";

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

export type BackendProduct = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  dimension?: string;
  images: string[];
  modelGlb?: string | null;

  // can be populated object OR string id
  vendorId?: VendorUser | string | null;
  userId?: VendorUser | string | null;

  categoryId?: any;
  subCategoryId?: any;
};

function normalizeBaseUrl(raw?: string) {
  return (raw || "").trim().replace(/\/$/, "");
}

function getApiBases(raw?: string) {
  const base = normalizeBaseUrl(raw);
  const apiBase = base.endsWith("/api") ? base : `${base}/api`;
  const uploadsBase = `${apiBase}/uploads`;
  return { apiBase, uploadsBase };
}

export default function ProductPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const { apiBase, uploadsBase } = useMemo(
    () => getApiBases(process.env.NEXT_PUBLIC_API_URL),
    []
  );

  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${apiBase}/products/${id}`, { cache: "no-store" });
        if (!res.ok) return notFound();
        const data = (await res.json()) as BackendProduct;
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiBase]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <ProductDetails product={product} apiBase={apiBase} uploadsBase={uploadsBase} />
    </div>
  );
}