// "use client";

// import { useState, useMemo, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Grid3x3, List, Filter, ChevronDown, Box } from "lucide-react"; // only use icons that exist
// import type { Product, Vendor, SubCategory } from "@/lib/data";

// type ProductGridProps = {
//   products: Product[];
//   subcategories: SubCategory[];
//   vendors?: Vendor[];
//   initialSubcategory?: string; // subCategoryId
//   initialVendor?: string; // vendorId
// };

// export function ProductGrid({
//   products,
//   subcategories,
//   vendors = [],
//   initialSubcategory,
//   initialVendor,
// }: ProductGridProps) {
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
//     initialSubcategory || "all"
//   );
//   const [selectedVendor, setSelectedVendor] = useState<string>(
//     initialVendor || "all"
//   );
//   const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
//     "name"
//   );
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);

//   useEffect(() => {
//     setSelectedSubcategory(initialSubcategory || "all");
//   }, [initialSubcategory]);

//   useEffect(() => {
//     setSelectedVendor(initialVendor || "all");
//   }, [initialVendor]);

//   // Map products to selected subcategory
//   const productsBySubcategory = useMemo(() => {
//     if (selectedSubcategory === "all") return products;
//     return products.filter((p) => p.subCategoryId === selectedSubcategory);
//   }, [products, selectedSubcategory]);

//   // Vendors for selected subcategory
//   const vendorsBySubcategory = useMemo(() => {
//     const vendorIds = new Set(productsBySubcategory.map((p) => p.vendorId));
//     return vendors.filter((v) => vendorIds.has(v._id));
//   }, [productsBySubcategory, vendors]);

//   // Filtered and sorted products
//   const filteredProducts = useMemo(() => {
//     let filtered = productsBySubcategory;
//     if (selectedVendor !== "all") {
//       filtered = filtered.filter((p) => p.vendorId === selectedVendor);
//     }

//     return filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "name":
//           return a.title.localeCompare(b.title);
//         case "price-low":
//           return a.price - b.price;
//         case "price-high":
//           return b.price - a.price;
//       }
//     });
//   }, [productsBySubcategory, selectedVendor, sortBy]);

//   const getSubCategoryTitle = (subCatId?: string) =>
//     subcategories.find((s) => s._id === subCatId)?.title;

//   return (
//     <div className="container mx-auto px-4 py-12">
//       {/* Filters */}
//       <div className="flex flex-col gap-4 mb-6">
//         <div className="flex flex-wrap gap-3">
//           <Button
//             variant={selectedSubcategory === "all" ? "default" : "outline"}
//             onClick={() => {
//               setSelectedSubcategory("all");
//               setSelectedVendor("all");
//             }}
//             size="sm"
//           >
//             All Products
//           </Button>
//           {subcategories.map((sub) => (
//         <Button
//         key={sub._id}
//         variant={selectedSubcategory === sub._id ? "default" : "outline"}
//         onClick={() => {
//           setSelectedSubcategory(sub._id);
//           setSelectedVendor("all");
//         }}
//         size="sm"
//       >
//         {sub.title}
//       </Button>

//           ))}
//         </div>

//         {vendorsBySubcategory.length > 0 && (
//           <div className="relative">
//             <button
//               onClick={() => setVendorDropdownOpen(!vendorDropdownOpen)}
//               className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors w-full md:w-56 text-left ${
//                 selectedVendor === "all"
//                   ? "bg-orange-200 text-orange-800 border border-orange-300"
//                   : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
//               }`}
//             >
//               {selectedVendor === "all"
//                 ? "Vendors"
//                 : vendors.find((v) => v._id === selectedVendor)?.companyName}
//               <ChevronDown
//                 className={`ml-auto transition-transform ${
//                   vendorDropdownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {vendorDropdownOpen && (
//               <div className="absolute z-10 mt-1 w-full md:w-56 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
//                 <button
//                   onClick={() => {
//                     setSelectedVendor("all");
//                     setVendorDropdownOpen(false);
//                   }}
//                   className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg font-medium ${
//                     selectedVendor === "all"
//                       ? "bg-orange-200 text-orange-800"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   All Vendors
//                 </button>
//                 {vendorsBySubcategory.map((v) => (
//                   <button
//                     key={v._id}
//                     onClick={() => {
//                       setSelectedVendor(
//                         selectedVendor === v._id ? "all" : v._id
//                       );
//                       setVendorDropdownOpen(false);
//                     }}
//                     className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg font-medium ${
//                       selectedVendor === v._id
//                         ? "bg-blue-100 text-blue-800"
//                         : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <img
//                       src={v.image || "/placeholder-logo.svg"}
//                       alt={v.companyName}
//                       className="w-6 h-6 rounded-full object-cover"
//                     />
//                     <span>{v.companyName}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Sort & View */}
//       <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
//         <select
//           value={sortBy}
//           onChange={(e) =>
//             setSortBy(e.target.value as "name" | "price-low" | "price-high")
//           }
//           className="border border-border rounded-lg p-2"
//         >
//           <option value="name">Name</option>
//           <option value="price-low">Price: Low to High</option>
//           <option value="price-high">Price: High to Low</option>
//         </select>

//         <div className="flex gap-1 border border-border rounded-lg p-1">
//           <Button
//             variant={viewMode === "grid" ? "secondary" : "ghost"}
//             size="icon"
//             onClick={() => setViewMode("grid")}
//           >
//             <Grid3x3 className="h-4 w-4" />
//           </Button>
//           <Button
//             variant={viewMode === "list" ? "secondary" : "ghost"}
//             size="icon"
//             onClick={() => setViewMode("list")}
//           >
//             <List className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       <p className="text-muted-foreground mb-2">
//         Showing {filteredProducts.length}{" "}
//         {filteredProducts.length === 1 ? "product" : "products"}
//       </p>

//       {/* Products */}
//       {filteredProducts.length === 0 ? (
//         <div className="text-center py-16">
//           <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//           <h3 className="text-xl font-semibold mb-2">No products found</h3>
//           <p className="text-muted-foreground">Try adjusting your filters</p>
//         </div>
//       ) : viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((product) => {
//             const vendorName = vendors.find(
//               (v) => v._id === product.vendorId
//             )?.companyName;

//             return (
//               <Link
//                 key={product._id}
//                 href={`/product/${product._id}`}
//                 className="group bg-card rounded-xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
//               >
//                 <div className="aspect-square relative overflow-hidden bg-muted">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     <span className="text-sm text-muted-foreground">
//                       {product.dimension ||
//                         getSubCategoryTitle(product.subCategoryId)}
//                     </span>
//                     {vendorName && (
//                       <span className="text-sm text-orange-600 flex items-center gap-1">
//                         🏷️ {vendorName}
//                       </span>
//                     )}
//                   </div>

//                   <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
//                     {product.title}
//                   </h3>

//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold">${product.price}</span>
//                     <span className="text-sm font-medium text-primary group-hover:underline">
//                       View Details
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredProducts.map((product) => (
//             <Link
//               key={product._id}
//               href={`/product/${product._id}`}
//               className="group bg-card rounded-xl border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row"
//             >
//               <div className="md:w-64 aspect-square md:aspect-auto relative overflow-hidden bg-muted flex-shrink-0">
//                 <Image
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               </div>
//               <div className="p-6 flex-1 flex flex-col justify-between">
//                 <div>
//                   <div className="text-sm text-muted-foreground mb-2">
//                     {product.dimension ||
//                       getSubCategoryTitle(product.subCategoryId)}
//                   </div>
//                   <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
//                     {product.title}
//                   </h3>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold">${product.price}</span>
//                   <span className="text-sm font-medium text-primary group-hover:underline">
//                     View Details →
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Grid3x3,
  List,
  Filter,
  ChevronDown,
  Box,
  Ruler,
  Tag,
  Layers,
} from "lucide-react";
import type { Product, Vendor, SubCategory } from "@/lib/data";

type ProductGridProps = {
  products: Product[];
  subcategories: SubCategory[];
  vendors?: Vendor[];
  initialSubcategory?: string;
  initialVendor?: string;
};

export function ProductGrid({
  products,
  subcategories,
  vendors = [],
  initialSubcategory,
  initialVendor,
}: ProductGridProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialSubcategory || "all"
  );
  const [selectedVendor, setSelectedVendor] = useState<string>(
    initialVendor || "all"
  );
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
    "name"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedSubcategory(initialSubcategory || "all");
  }, [initialSubcategory]);

  useEffect(() => {
    setSelectedVendor(initialVendor || "all");
  }, [initialVendor]);

  const productsBySubcategory = useMemo(() => {
    if (selectedSubcategory === "all") return products;
    return products.filter((p) => p.subCategoryId === selectedSubcategory);
  }, [products, selectedSubcategory]);

  const vendorsBySubcategory = useMemo(() => {
    const vendorIds = new Set(productsBySubcategory.map((p) => p.vendorId));
    return vendors.filter((v) => vendorIds.has(v._id));
  }, [productsBySubcategory, vendors]);

  const filteredProducts = useMemo(() => {
    let filtered = productsBySubcategory;
    if (selectedVendor !== "all") {
      filtered = filtered.filter((p) => p.vendorId === selectedVendor);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
      }
    });
  }, [productsBySubcategory, selectedVendor, sortBy]);

  const getSubCategoryTitle = (subCatId?: string) =>
    subcategories.find((s) => s._id === subCatId)?.title;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={selectedSubcategory === "all" ? "default" : "outline"}
            onClick={() => {
              setSelectedSubcategory("all");
              setSelectedVendor("all");
            }}
            size="sm"
          >
            All Products
          </Button>
          {subcategories.map((sub) => (
            <Button
              key={sub._id}
              variant={selectedSubcategory === sub._id ? "default" : "outline"}
              onClick={() => {
                setSelectedSubcategory(sub._id);
                setSelectedVendor("all");
              }}
              size="sm"
            >
              {sub.title}
            </Button>
          ))}
        </div>

        {/* Vendor Dropdown */}
        {vendorsBySubcategory.length > 0 && (
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setVendorDropdownOpen(!vendorDropdownOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
            >
              {selectedVendor === "all"
                ? "All Vendors"
                : vendors.find((v) => v._id === selectedVendor)?.companyName}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  vendorDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {vendorDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedVendor("all");
                    setVendorDropdownOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  All Vendors
                </button>
                {vendorsBySubcategory.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => {
                      setSelectedVendor(v._id);
                      setVendorDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={v.image || "/placeholder-logo.svg"}
                      alt={v.companyName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {v.companyName}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sort & View */}
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "price-low" | "price-high")
          }
          className="border border-border rounded-lg p-2 text-sm"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <div className="flex gap-1 border border-border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground mb-6 text-sm">
        Showing {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "product" : "products"}
      </p>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const vendor = vendors.find((v) => v._id === product.vendorId);
            const subcategory = getSubCategoryTitle(product.subCategoryId);
            return (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square relative bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {product.dimension && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="https://img.icons8.com/parakeet/48/surface.png"
                          alt="Dimensions icon"
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                        <span>
                          <strong>Dimensions:</strong> {product.dimension}
                        </span>
                      </div>
                    )}

                    {vendor && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>
                          <strong>Vendor:</strong> {vendor.companyName}
                        </span>
                      </div>
                    )}
                    {subcategory && (
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        <span>
                          <strong>Category:</strong> {subcategory}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => {
            const vendor = vendors.find((v) => v._id === product.vendorId);
            const subcategory = getSubCategoryTitle(product.subCategoryId);
            return (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
              >
                <div className="md:w-64 aspect-square relative bg-muted overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {product.dimension && (
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-primary" />
                          <span>
                            <strong>Dimensions:</strong> {product.dimension}
                          </span>
                        </div>
                      )}
                      {vendor && (
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span>
                            <strong>Vendor:</strong> {vendor.companyName}
                          </span>
                        </div>
                      )}
                      {subcategory && (
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" />
                          <span>
                            <strong>Category:</strong> {subcategory}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
