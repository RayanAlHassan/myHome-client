"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, ChevronDown, Ruler, Tag, Layers, Filter, RefreshCw } from "lucide-react";
import { Product, SubCategory, Vendor } from "@/types/products";

type Props = {
  products: Product[];
  subcategories: SubCategory[];
  vendorsForCategory: Vendor[];
  vendorsForSub: Vendor[];
  selectedSubcategory?: string;
  selectedVendor?: string;
  onSubcategorySelect?: (id: string) => void;
  onVendorSelect?: (id: string) => void;
  refreshProducts?: () => void; // ADD THIS LINE
};

export default function ProductGrid({
  products,
  subcategories,
  vendorsForCategory,
  vendorsForSub,
  selectedSubcategory = "all",
  selectedVendor = "all",
  onSubcategorySelect,
  onVendorSelect,
  refreshProducts, // ADD THIS LINE
}: Props) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);

  const vendorOptions = selectedSubcategory === "all" ? vendorsForCategory : vendorsForSub;

  const formatImageUrl = (img?: string) => {
    if (!img) return "/placeholder.svg";
    if (img.startsWith("http")) return img;
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${img}`;
  };

  const handleAllProductsClick = () => {
    onSubcategorySelect?.("all");
    onVendorSelect?.("all");
  };

  const handleSubClick = (id: string) => onSubcategorySelect?.(id);
  const handleVendorPick = (id: string) => {
    onVendorSelect?.(id);
    setVendorDropdownOpen(false);
  };

  const hasProducts = products.length > 0;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Refresh button if refreshProducts is provided */}
          {refreshProducts && (
            <Button
              variant="outline"
              size="sm"
              onClick={refreshProducts}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          )}
          
          {/* View mode toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Subcategory buttons */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <Button variant={selectedSubcategory === "all" ? "default" : "outline"} onClick={handleAllProductsClick} size="sm">
            All Products
          </Button>
          {subcategories.map(sub => (
            <Button 
              key={sub._id} 
              variant={selectedSubcategory === sub._id ? "default" : "outline"} 
              onClick={() => handleSubClick(sub._id)} 
              size="sm"
            >
              {sub.title}
              {selectedSubcategory === sub._id && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </Button>
          ))}
        </div>

        {/* Show selected subcategory info */}
        {selectedSubcategory !== "all" && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Currently viewing: {subcategories.find(s => s._id === selectedSubcategory)?.title}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Showing products from this specific subcategory
            </p>
          </div>
        )}

        {/* Vendor dropdown */}
        {vendorOptions.length > 0 && (
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setVendorDropdownOpen(!vendorDropdownOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg border bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {selectedVendor === "all" ? "All Vendors" : vendorOptions.find(v => v._id === selectedVendor)?.companyName || "Vendor"}
              <ChevronDown className={`ml-2 h-4 w-4 ${vendorDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {vendorDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                <button onClick={() => handleVendorPick("all")} className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                  All Vendors
                </button>
                {vendorOptions.map(v => (
                  <button key={v._id} onClick={() => handleVendorPick(v._id)} className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100">
                    {v.companyName} ({v.name})
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Products */}
      {!hasProducts ? (
        <div className="text-center py-16">
          <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
          {refreshProducts && (
            <Button
              variant="outline"
              onClick={refreshProducts}
              className="mt-4 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Products
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <Image
                  src={formatImageUrl(product.images?.[0])}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                {product.dimension && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ruler className="h-4 w-4" />
                    <span><strong>Dimensions:</strong> {product.dimension}</span>
                  </div>
                )}
                {product.vendorId && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span><strong>Vendor:</strong> {product.vendorId.companyName}</span>
                  </div>
                )}
                {product.subCategoryId && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Layers className="h-4 w-4" />
                    <span><strong>Category:</strong> {product.subCategoryId.title}</span>
                  </div>
                )}

                {/* Push link to bottom-right */}
                <div className="mt-auto flex justify-end">
                  <Link
                    href={`/product/${product._id}`}
                    className="text-sm text-orange-500 underline hover:text-orange-600"
                  >
                    View Detailsssssss
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map(product => (
            <div key={product._id} className="group bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <Image
                  src={formatImageUrl(product.images?.[0])}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                {product.dimension && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ruler className="h-4 w-4" />
                    <span><strong>Dimensions:</strong> {product.dimension}</span>
                  </div>
                )}
                {product.vendorId && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span><strong>Vendor:</strong> {product.vendorId.companyName}</span>
                  </div>
                )}
                {product.subCategoryId && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Layers className="h-4 w-4" />
                    <span><strong>Category:</strong> {product.subCategoryId.title}</span>
                  </div>
                )}

                {/* Push link to bottom-right */}
                <div className="mt-auto flex justify-end">
                  <Link
                    href={`/product/${product._id}`}
                    className="text-sm text-orange-500 underline hover:text-orange-600"
                  >
                    View Detailss
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}