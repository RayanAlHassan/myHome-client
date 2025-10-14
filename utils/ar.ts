// utils/ar.ts
export const doorSubcategories = [
    "subcat1", // Aluminum Doors
    "subcat4", // Automatic Doors
    "subcat5", // Single Doors
    "subcat6", // Double Doors
    "subcat7", // Sliding Doors
    "subcat8", // Wall Frame Doors
  ];
  
  export function isDoorProduct(subCategoryId?: string) {
    return subCategoryId ? doorSubcategories.includes(subCategoryId) : false;
  }
  