export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    dimension?: string;
    images?: string[];
    modelGlb?: string;  // optional
    modelUsdz?: string; // optional
    categoryId?: { _id: string; title: string };
    subCategoryId?: { _id: string; title: string };
  }