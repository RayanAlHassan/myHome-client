import { notFound } from "next/navigation";
import { Box } from "lucide-react";
import ProductGrid from "@/components/category/product-grid"; // use YOUR real path

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
  role?: string;
  phone?: string;
  vendorProfile?: VendorProfile | null;
};

type SubCategory = { _id: string; title: string };

type BackendProduct = {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  dimension?: string;
  images?: string[];
  subCategoryId?: { _id: string; title: string } | string;
  vendorId?: VendorUser | string | null;
  userId?: VendorUser | string | null;
};

function isVendorObject(v: any): v is VendorUser {
  return v && typeof v === "object" && typeof v._id === "string";
}

export default async function VendorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:5000/api
  if (!API_BASE) notFound();

  // ✅ Fetch all products (public)
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) notFound();

  const allProducts: BackendProduct[] = await res.json();

  // ✅ filter vendor products
  const vendorProducts = allProducts.filter((p) => {
    const v =
      (isVendorObject(p.vendorId) && p.vendorId) ||
      (isVendorObject(p.userId) && p.userId) ||
      null;
    return v?._id === id;
  });

  if (vendorProducts.length === 0) notFound();

  // ✅ vendor info from first product
  const first = vendorProducts[0];
  const vendor =
    (isVendorObject(first.vendorId) && first.vendorId) ||
    (isVendorObject(first.userId) && first.userId) ||
    null;

  if (!vendor) notFound();

  const companyName = vendor.vendorProfile?.companyName || vendor.name || "Vendor";
  const companyPhone = vendor.vendorProfile?.companyPhone || vendor.phone || "";
  const companyAddress = vendor.vendorProfile?.companyAddress || "";
  const workingHours = vendor.vendorProfile?.workingHours || "";

  // ✅ build vendor subcategories list (only for UI buttons)
  const subMap = new Map<string, SubCategory>();
  vendorProducts.forEach((p) => {
    const sc = p.subCategoryId;
    if (sc && typeof sc === "object" && sc._id) subMap.set(sc._id, { _id: sc._id, title: sc.title });
  });
  const vendorSubcategories = Array.from(subMap.values());

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      {/* Vendor Info */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <img
            src={"/placeholder-logo.svg"}
            alt={companyName}
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2">{companyName}</h1>

        {companyPhone ? (
          <p className="text-muted-foreground max-w-xl mb-1">📞 {companyPhone}</p>
        ) : null}

        {companyAddress ? (
          <p className="text-muted-foreground max-w-xl mb-1">📍 {companyAddress}</p>
        ) : null}

        {workingHours ? (
          <p className="text-muted-foreground max-w-xl mb-1">🕒 {workingHours}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-full shadow-lg font-semibold text-lg">
          <Box className="w-5 h-5" />
          {vendorProducts.length}{" "}
          {vendorProducts.length === 1 ? "Product" : "Products"}
        </div>
      </div>

      {/* Vendor Products */}
      <ProductGrid
        products={vendorProducts as any}
        subcategories={vendorSubcategories as any}
        vendorsForCategory={[]}
        vendorsForSub={[]}
        selectedVendor={id}
        selectedSubcategory="all"
      />

      {/* Testimonials removed (because you don’t have backend endpoint shown) */}
    </div>
  );
}