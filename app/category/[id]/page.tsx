
// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import { notFound } from "next/navigation";
// import { useEffect, useState } from "react";
// import { CategoryHeader } from "@/components/category/category-header";
// import { ProductGrid } from "@/components/category/product-grid";
// import { RequestQuotationForm } from "@/components/category/RequestQuotationForm";

// export default function CategoryPage() {
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const subcategory = searchParams?.get("subcategory") || undefined;

//   const [categoryData, setCategoryData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSub, setSelectedSub] = useState<string | undefined>(subcategory);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch category");
//         const data = await res.json();
//         setCategoryData(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!categoryData?.category) notFound();

//   const { category, subCategories, products } = categoryData;

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
//         <RequestQuotationForm
//           subcategoryId={selectedSub || ""}
//           subcategoryTitle={
//             subCategories.find((sub: any) => sub._id === selectedSub)?.title || ""
//           }
//           vendors={[]} // ✅ you can later fetch vendors here
//           disabled={!selectedSub}
//         />
//       </div>

//       <ProductGrid
//         products={products}
//         subcategories={subCategories}
//         vendors={[]} // ✅ later
//         initialSubcategory={subcategory}
//         onSubcategorySelect={handleSubcategorySelect}
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
  const { id } = useParams(); // category ID
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams?.get("subcategory") || undefined;

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | undefined>(subcategoryParam);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch category info
        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
        if (!categoryRes.ok) throw new Error("Failed to fetch category");
        const categoryData = await categoryRes.json();
        setCategory(categoryData.category);
        setSubCategories(categoryData.subCategories || []);

        // 2️⃣ Fetch products for all subcategories
        const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!productsRes.ok) throw new Error("Failed to fetch products");
        const allProducts = await productsRes.json();

        // Filter products that belong to this category via subCategoryId -> categoryId
        const filteredProducts = allProducts.filter(
          (p: any) => p.subCategoryId?.categoryId?._id === id
        );

        setProducts(filteredProducts);

        // 3️⃣ Extract vendors from filtered products
        const vendorMap: Record<string, any> = {};
        filteredProducts.forEach((p: any) => {
          if (p.vendorId && !vendorMap[p.vendorId._id]) {
            vendorMap[p.vendorId._id] = p.vendorId;
          }
        });
        setVendors(Object.values(vendorMap));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleSubcategorySelect = (subId: string) => {
    setSelectedSub(subId);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!category) return notFound();

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <CategoryHeader
        category={{
          _id: category._id,
          title: category.title,
          image: category.image || "/placeholder.svg",
        }}
      />

      {/* Request Quotation Form */}
      <div className="container mx-auto px-4 py-6">
        <RequestQuotationForm
          subcategoryId={selectedSub || ""}
          subcategoryTitle={
            subCategories.find((sub) => sub._id === selectedSub)?.title || ""
          }
          vendors={
            selectedSub
              ? vendors.filter((v) =>
                  products
                    .filter((p) => p.subCategoryId?._id === selectedSub)
                    .some((p) => p.vendorId?._id === v._id)
                )
              : []
          }
          disabled={!selectedSub}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        subcategories={subCategories}
        vendors={vendors}
        initialSubcategory={subcategoryParam}
        onSubcategorySelect={handleSubcategorySelect}
      />
    </div>
  );
}
