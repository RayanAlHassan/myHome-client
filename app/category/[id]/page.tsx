// import { notFound } from "next/navigation";
// import { categories, products, vendors, Product, Vendor, SubCategory } from "@/lib/data";
// import { CategoryHeader } from "@/components/category/category-header";
// import { ProductGrid } from "@/components/category/product-grid";

// interface CategoryPageProps {
//   params: { id: string };
//   searchParams: { subcategory?: string };
// }

// export default function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps) {
//   // Find category by _id
//   const category = categories.find((c) => c._id === params.id);
//   if (!category) notFound();

//   // Filter subcategories for this category
//   const categorySubCategories: SubCategory[] = subCategories.filter(
//     (sub) => sub.categoryId === category._id
//   );

//   // Filter products belonging to this category
//   let categoryProducts: Product[] = products.filter((p) =>
//     categorySubCategories.some((sub) => sub._id === p.subCategoryId)
//   );

//   // Filter by subcategory if specified in searchParams
//   if (searchParams.subcategory) {
//     categoryProducts = categoryProducts.filter(
//       (p) => p.subCategoryId === searchParams.subcategory
//     );
//   }

//   // Get vendors that have products in this category
//   const categoryVendors: Vendor[] = vendors.filter((v) =>
//     categoryProducts.some((p) => p.vendorId === v._id)
//   );

//   return (
//     <div className="min-h-screen">
//       <CategoryHeader category={category} />
//       <ProductGrid
//         products={categoryProducts}
//         subcategories={categorySubCategories} // <-- updated prop name
//         vendors={categoryVendors}
//         initialSubcategory={searchParams.subcategory}
//       />
//     </div>
//   );
// }
"use client"; // ✅ add this

import { useParams, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { categories, subCategories, products, vendors, Product, Vendor, SubCategory } from "@/lib/data";
import { CategoryHeader } from "@/components/category/category-header";
import { ProductGrid } from "@/components/category/product-grid";

export default function CategoryPage() {
  const { id } = useParams(); // works just like your EditEventPage
  const searchParams = useSearchParams();
  const subcategory = searchParams?.get("subcategory") || undefined;

  const category = categories.find((c) => c._id === id);
  if (!category) notFound();

  const categorySubCategories: SubCategory[] = subCategories.filter(
    (sub) => sub.categoryId === category._id
  );

  const categoryProducts: Product[] = products.filter((p) =>
    categorySubCategories.some((sub) => sub._id === p.subCategoryId)
  );

  const categoryVendors: Vendor[] = vendors.filter((v) =>
    categoryProducts.some((p) => p.vendorId === v._id)
  );

  return (
    <div className="min-h-screen">
      <CategoryHeader
        category={{
          _id: category._id,
          title: category.title,
          image: category.image || "/placeholder.svg",
        }}
      />
      <ProductGrid
        products={categoryProducts}
        subcategories={categorySubCategories}
        vendors={categoryVendors}
        initialSubcategory={subcategory}
      />
    </div>
  );
}
