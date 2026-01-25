"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CategoryHeader } from "@/components/category/category-header";
import { RequestQuotationForm } from "@/components/category/RequestQuotationForm";
import { Product, SubCategory, Vendor, CategoryInfo } from "@/types/products";

// Check if ProductGrid is default or named export and import accordingly
// If ProductGrid is default export:
import ProductGrid from "@/components/category/product-grid";

// OR if ProductGrid is named export:
// import { ProductGrid } from "@/components/category/product-grid";

export default function CategoryPage() {
  const { id: categoryId } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const subcategoryFromUrl = searchParams.get("subcategory");

  const fetchProducts = useCallback(async (subCatId = "all", vendorId = "all") => {
    setLoading(true);
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products/by-category`);
      url.searchParams.append("categoryId", categoryId);
      if (subCatId !== "all") url.searchParams.append("subCategoryId", subCatId);
      if (vendorId !== "all") url.searchParams.append("vendorId", vendorId);

      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const refreshProducts = useCallback(() => {
    fetchProducts(selectedSubcategory, selectedVendor);
    setRefreshTrigger(prev => prev + 1);
  }, [fetchProducts, selectedSubcategory, selectedVendor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`);
        const categoryJson = await resCategory.json();
        setCategory(categoryJson.category);
        setSubcategories(categoryJson.subCategories || []);
        
        if (subcategoryFromUrl) {
          setSelectedSubcategory(subcategoryFromUrl);
          await fetchProducts(subcategoryFromUrl, "all");
        } else {
          await fetchProducts();
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [categoryId, subcategoryFromUrl, fetchProducts]);

  const vendorsForSub = useMemo(() => {
    if (selectedSubcategory === "all") return [];
    const vendorMap = new Map();
    products.forEach(p => {
      if (p.subCategoryId?._id === selectedSubcategory && p.vendorId)
        vendorMap.set(p.vendorId._id, p.vendorId);
    });
    return Array.from(vendorMap.values());
  }, [products, selectedSubcategory]);

  const vendorsForCategory = useMemo(() => {
    const vendorMap = new Map();
    products.forEach(p => {
      if (p.vendorId) vendorMap.set(p.vendorId._id, p.vendorId);
    });
    return Array.from(vendorMap.values());
  }, [products]);

  const handleSubcategorySelect = async (subCatId: string) => {
    setSelectedSubcategory(subCatId);
    setSelectedVendor("all");
    await fetchProducts(subCatId, "all");
  };

  const handleVendorSelect = async (vendorId: string) => {
    setSelectedVendor(vendorId);
    await fetchProducts(selectedSubcategory, vendorId);
  };

  const handleQuotationSuccess = () => {
    console.log("Quotation sent successfully, refreshing products...");
    // refreshProducts();
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!category) return <div className="text-center py-10">Category not found</div>;

  return (
    <div className="min-h-screen">
      <CategoryHeader category={{ _id: category._id, title: category.title, image: category.image || "/placeholder.svg" }} />

      <div className="container mx-auto px-4 py-6">
        <RequestQuotationForm
          subcategoryId={selectedSubcategory}
          subcategoryTitle={subcategories.find(s => s._id === selectedSubcategory)?.title || ""}
          vendors={vendorsForSub}
          disabled={selectedSubcategory === "all"}
          onQuotationSent={handleQuotationSuccess}
        />
      </div>

      {/* Check the export type of ProductGrid and update accordingly */}
      <ProductGrid
        key={`product-grid-${refreshTrigger}`}
        products={products}
        subcategories={subcategories}
        vendorsForCategory={vendorsForCategory}
        vendorsForSub={vendorsForSub}
        selectedSubcategory={selectedSubcategory}
        selectedVendor={selectedVendor}
        onSubcategorySelect={handleSubcategorySelect}
        onVendorSelect={handleVendorSelect}
        refreshProducts={refreshProducts}
      />
    </div>
  );
}