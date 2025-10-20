
// "use client"; // ✅ add this

// import { useParams, useSearchParams } from "next/navigation";
// import { notFound } from "next/navigation";
// import { categories, subCategories, products, vendors, Product, Vendor, SubCategory } from "@/lib/data";
// import { CategoryHeader } from "@/components/category/category-header";
// import { ProductGrid } from "@/components/category/product-grid";
// import { RequestQuotationForm } from "@/components/category/RequestQuotationForm";
// import { useState } from "react";

// export default function CategoryPage() {
//   const { id } = useParams(); // works just like your EditEventPage
//   const searchParams = useSearchParams();
//   const subcategory = searchParams?.get("subcategory") || undefined;

//   const category = categories.find((c) => c._id === id);
//   if (!category) notFound();

//   const categorySubCategories: SubCategory[] = subCategories.filter(
//     (sub) => sub.categoryId === category._id
//   );

//   const categoryProducts: Product[] = products.filter((p) =>
//     categorySubCategories.some((sub) => sub._id === p.subCategoryId)
//   );

//   const categoryVendors: Vendor[] = vendors.filter((v) =>
//     categoryProducts.some((p) => p.vendorId === v._id)
//   );

//   const [selectedSub, setSelectedSub] = useState<string | undefined>(subcategory);

//   const handleSubcategorySelect = (subId: string) => {
//     setSelectedSub(subId);
//   };
//   return (
//     <div className="min-h-screen">
//       <CategoryHeader
//         category={{
//           _id: category._id,
//           title: category.title,
//           image: category.image || "/placeholder.svg",
//         }}
//       />
//       <div className="container mx-auto px-4 py-6">
//   <RequestQuotationForm
//     subcategoryId={selectedSub || ""}
//     subcategoryTitle={
//       categorySubCategories.find((sub) => sub._id === selectedSub)?.title || ""
//     }
//     vendors={
//       selectedSub
//         ? categoryVendors.filter((v) =>
//             categoryProducts
//               .filter((p) => p.subCategoryId === selectedSub)
//               .some((p) => p.vendorId === v._id)
//           )
//         : []
//     }
//     disabled={!selectedSub} // disables button/form until a subcategory is selected
//   />
// </div>

//       <ProductGrid
//         products={categoryProducts}
//         subcategories={categorySubCategories}
//         vendors={categoryVendors}
//         initialSubcategory={subcategory}
//         onSubcategorySelect={handleSubcategorySelect} // ✅ new prop

//       />
//     </div>
//   );
// }
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryHeader } from "@/components/category/category-header";
import { ProductGrid } from "@/components/category/product-grid";
import { RequestQuotationForm } from "@/components/category/RequestQuotationForm";

export default function CategoryPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const subcategory = searchParams?.get("subcategory") || undefined;

  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<string | undefined>(subcategory);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!categoryData?.category) notFound();

  const { category, subCategories, products } = categoryData;

  const handleSubcategorySelect = (subId: string) => {
    setSelectedSub(subId);
  };

  return (
    <div className="min-h-screen">
      <CategoryHeader
        category={{
          _id: category._id,
          title: category.title,
          image: category.image || "/placeholder.svg",
        }}
      />

      <div className="container mx-auto px-4 py-6">
        <RequestQuotationForm
          subcategoryId={selectedSub || ""}
          subcategoryTitle={
            subCategories.find((sub: any) => sub._id === selectedSub)?.title || ""
          }
          vendors={[]} // ✅ you can later fetch vendors here
          disabled={!selectedSub}
        />
      </div>

      <ProductGrid
        products={products}
        subcategories={subCategories}
        vendors={[]} // ✅ later
        initialSubcategory={subcategory}
        onSubcategorySelect={handleSubcategorySelect}
      />
    </div>
  );
}
