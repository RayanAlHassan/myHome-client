import Link from "next/link";
import Image from "next/image";

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

type BackendProduct = {
  _id: string;
  title: string;
  images?: string[];
  vendorId?: VendorUser | string | null;
  userId?: VendorUser | string | null;
};

function isVendorObject(v: any): v is VendorUser {
  return v && typeof v === "object" && typeof v._id === "string";
}

export default async function VendorsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:5000/api
  if (!API_BASE) {
    return <div className="p-10 text-red-500">Missing NEXT_PUBLIC_API_URL</div>;
  }

  // ✅ fetch products (public endpoint)
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) {
    return (
      <div className="p-10 text-red-500">
        Failed to load products ({res.status})
      </div>
    );
  }

  const products: BackendProduct[] = await res.json();

  // ✅ Build vendors map from products
  const vendorsMap = new Map<
    string,
    { vendor: VendorUser; productCount: number }
  >();

  for (const p of products) {
    const v =
      (isVendorObject(p.vendorId) && p.vendorId) ||
      (isVendorObject(p.userId) && p.userId) ||
      null;

    if (!v) continue;
    // only show real vendors if role is vendore OR vendorProfile exists
    const isVendore = v.role === "vendore" || !!v.vendorProfile;
    if (!isVendore) continue;

    const existing = vendorsMap.get(v._id);
    if (existing) {
      existing.productCount += 1;
    } else {
      vendorsMap.set(v._id, { vendor: v, productCount: 1 });
    }
  }

  const vendors = Array.from(vendorsMap.values()).sort((a, b) =>
    (a.vendor.vendorProfile?.companyName || a.vendor.name || "").localeCompare(
      b.vendor.vendorProfile?.companyName || b.vendor.name || ""
    )
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Our Vendors
      </h1>

      {vendors.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No vendors found yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vendors.map(({ vendor, productCount }) => {
            const companyName =
              vendor.vendorProfile?.companyName || vendor.name || "Vendor";

            return (
              <Link
                key={vendor._id}
                href={`/vendors/${vendor._id}`}
                className="group flex flex-col items-center bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={"/placeholder-logo.svg"}
                    alt={companyName}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-lg font-semibold text-center group-hover:text-primary transition-colors mb-2">
                  {companyName}
                </h2>

                <p className="text-sm text-muted-foreground text-center">
                  {productCount} {productCount === 1 ? "Product" : "Products"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}