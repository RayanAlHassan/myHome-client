// // src/types/products.ts
// export type Vendor = {
//     _id: string;
//     name: string;          // user name
//     companyName: string;   // from vendorProfile
//     email: string;
//   };
  
//   export type SubCategory = {
//     _id: string;
//     title: string;
//   };
  
//   export type Product = {
//     _id: string;
//     title: string;
//     price?: number;
//     dimension?: string;
//     vendorId?: Vendor | null;
//     subCategoryId?: SubCategory | null;
//     images?: string[];
//     categoryId?: string;
//   };
  
//   export type CategoryInfo = {
//     _id: string;
//     title: string;
//     image?: string;
//   };
export type Vendor = {
  _id: string;
  name: string;         // user name
  email: string;
  companyName: string;  // from vendorProfile
};

export type SubCategory = {
  _id: string;
  title: string;
};

export type Product = {
  _id: string;
  title: string;
  price?: number;
  dimension?: string;
  images?: string[];
  categoryId?: string;
  subCategoryId?: SubCategory | null;
  vendorId?: Vendor | null;
};

export type CategoryInfo = {
  _id: string;
  title: string;
  image?: string;
};


