"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CategoryHeader } from "@/components/category/category-header";
import ProductGrid from "@/components/category/product-grid";
import { RequestQuotationForm } from "@/components/category/RequestQuotationForm";
import { Product, SubCategory, Vendor, CategoryInfo } from "@/types/products";

export default function CategoryPage() {
  const { id: categoryId } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Get subcategory from URL query parameter
  const subcategoryFromUrl = searchParams.get("subcategory");

  // fetch products from backend
  const fetchProducts = async (subCatId = "all", vendorId = "all") => {
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
  };

  // Fetch category info and initial products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`);
        const categoryJson = await resCategory.json();
        setCategory(categoryJson.category);
        setSubcategories(categoryJson.subCategories || []);
        
        // Check if there's a subcategory in URL
        if (subcategoryFromUrl) {
          setSelectedSubcategory(subcategoryFromUrl);
          await fetchProducts(subcategoryFromUrl, "all");
        } else {
          await fetchProducts(); // fetch all products initially
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [categoryId, subcategoryFromUrl]);

  // Vendors for subcategory
  const vendorsForSub = useMemo(() => {
    if (selectedSubcategory === "all") return [];
    const vendorMap = new Map();
    products.forEach(p => {
      if (p.subCategoryId?._id === selectedSubcategory && p.vendorId)
        vendorMap.set(p.vendorId._id, p.vendorId);
    });
    return Array.from(vendorMap.values());
  }, [products, selectedSubcategory]);

  // Vendors for category
  const vendorsForCategory = useMemo(() => {
    const vendorMap = new Map();
    products.forEach(p => {
      if (p.vendorId) vendorMap.set(p.vendorId._id, p.vendorId);
    });
    return Array.from(vendorMap.values());
  }, [products]);

  // Handlers
  const handleSubcategorySelect = async (subCatId: string) => {
    setSelectedSubcategory(subCatId);
    setSelectedVendor("all");
    await fetchProducts(subCatId, "all");
  };

  const handleVendorSelect = async (vendorId: string) => {
    setSelectedVendor(vendorId);
    await fetchProducts(selectedSubcategory, vendorId);
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
        />
      </div>

      <ProductGrid
        products={products}
        subcategories={subcategories}
        vendorsForCategory={vendorsForCategory}
        vendorsForSub={vendorsForSub}
        selectedSubcategory={selectedSubcategory}
        selectedVendor={selectedVendor}
        onSubcategorySelect={handleSubcategorySelect}
        onVendorSelect={handleVendorSelect}
      />
    </div>
  );
}