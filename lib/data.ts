// // Dummy data structure for products and services

// export type Product = {
//   _id: string; // MongoDB ObjectId
//   title: string;
//   dimension?: string;
//   price: number;
//   image?: string;
//   subCategoryId?: string;
//   subServiceId?: string;
//   vendorId: string;
//   modelGlb?: string;
//   modelUsdz?: string;
//   createdAt: string;
//   updatedAt: string;
// };
// export type Vendor = {
//   _id: string;
//   companyName: string;
//   companyPhone: string;
//   companyAddress: string;
//   workingHours: string;
//   image?: string; // <-- add this
//   products?: Product[]; // product IDs
// };
// export const products: Product[] = [
//   {
//     _id: "1",
//     title: "Modern Aluminum Door",
//     dimension: "90cm x 210cm",
//     price: 450,
//     image: "/modern-aluminum-door.jpg",
//     subCategoryId: "doors-subcat",
//     vendorId: "vendor1",
//     modelGlb: "/ar/modern-aluminum-door.glb",
//     modelUsdz: "/ar/modern-aluminum-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "2",
//     title: "UPVC Sliding Window",
//     dimension: "120cm x 150cm",
//     price: 320,
//     image: "/upvc-sliding-window.jpg",
//     subCategoryId: "windows-subcat",
//     vendorId: "vendor1",
//     modelGlb: "/ar/upvc-sliding-window.glb",
//     modelUsdz: "/ar/upvc-sliding-window.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "3",
//     title: "Automatic Sliding Door",
//     dimension: "180cm x 220cm",
//     price: 1200,
//     image: "/automatic-sliding-door.jpg",
//     subCategoryId: "automatic-doors-subcat",
//     vendorId: "vendor1",
//     modelGlb: "/ar/automatic-sliding-door.glb",
//     modelUsdz: "/ar/automatic-sliding-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "4",
//     title: "Solid Wood Interior Door",
//     dimension: "80cm x 200cm",
//     price: 280,
//     image: "/solid-wood-interior-door.jpg",
//     subCategoryId: "single-doors-subcat",
//     vendorId: "vendor2",
//     modelGlb: "/ar/solid-wood-interior-door.glb",
//     modelUsdz: "/ar/solid-wood-interior-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "5",
//     title: "Double French Doors",
//     dimension: "160cm x 210cm",
//     price: 520,
//     image: "/french-double-doors-interior.jpg",
//     subCategoryId: "double-doors-subcat",
//     vendorId: "vendor2",
//     modelGlb: "/ar/french-double-doors.glb",
//     modelUsdz: "/ar/french-double-doors.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "6",
//     title: "Modern Sliding Door",
//     dimension: "90cm x 210cm",
//     price: 380,
//     image: "/modern-sliding-interior-door.jpg",
//     subCategoryId: "sliding-doors-subcat",
//     vendorId: "vendor2",
//     modelGlb: "/ar/modern-sliding-door.glb",
//     modelUsdz: "/ar/modern-sliding-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "7",
//     title: "Custom Walk-in Closet",
//     dimension: "Custom",
//     price: 2500,
//     image: "/luxury-walk-in-closet.jpg",
//     subCategoryId: "closets-subcat",
//     vendorId: "vendor3",
//     modelGlb: "/ar/custom-walk-in-closet.glb",
//     modelUsdz: "/ar/custom-walk-in-closet.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "8",
//     title: "Modern Kitchen Set",
//     dimension: "Custom",
//     price: 5500,
//     image: "/modern-kitchen.png",
//     subCategoryId: "kitchens-subcat",
//     vendorId: "vendor3",
//     modelGlb: "/ar/modern-kitchen.glb",
//     modelUsdz: "/ar/modern-kitchen.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "9",
//     title: "Double French Doors",
//     dimension: "160cm x 210cm",
//     price: 520,
//     image: "/french-double-doors-interior.jpg",
//     subCategoryId: "double-doors-subcat",
//     vendorId: "vendor3",
//     modelGlb: "/ar/french-double-doors-v3.glb",
//     modelUsdz: "/ar/french-double-doors-v3.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];



// // ================== VENDORS ==================
// export const vendors = [
//   {
//     _id: "vendor1",
//     companyName: "Modern Build Co.",
//     companyPhone: "+965 2222 3344",
//     companyAddress: "Shuwaikh Industrial Area, Kuwait City",
//     workingHours: "Mon–Sat: 8 AM–6 PM",
//     image: "/modern-aluminum-door.jpg",
//   },
//   {
//     _id: "vendor2",
//     companyName: "Interior Craft",
//     companyPhone: "+965 3333 4455",
//     companyAddress: "Al Rai, Kuwait City",
//     workingHours: "Mon–Fri: 9 AM–5 PM",
//     image: "/modern-aluminum-door.jpg",
//   },
//   {
//     _id: "vendor3",
//     companyName: "HomeStyle Furnishings",
//     companyPhone: "+965 5555 6677",
//     companyAddress: "Salmiya, Block 10, Kuwait",
//     workingHours: "Daily: 10 AM–8 PM",
//     image: "/modern-aluminum-door.jpg",
//   },
// ];


// export type Service = {
//   id: string;
//   name: string;
//   category: string;
//   description: string;
//   image: string;
//   features: string[];
// };

// export type Testimonial = {
//   id: string;
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
//   image: string;
// };


// export const testimonials: Testimonial[] = [
//   {
//     id: "t1",
//     name: "Sarah Al-Mansour",
//     role: "Homeowner",
//     content:
//       "The quality of their doors and installation service exceeded my expectations. Highly professional team!",
//     rating: 5,
//     image: "/professional-woman-portrait.png",
//   },
//   {
//     id: "t2",
//     name: "Ahmed Hassan",
//     role: "Interior Designer",
//     content:
//       "I always recommend myHome to my clients. Their product range and customization options are outstanding.",
//     rating: 5,
//     image: "/professional-man-portrait.png",
//   },
//   {
//     id: "t3",
//     name: "Fatima Al-Sabah",
//     role: "Business Owner",
//     content:
//       "The automatic doors they installed at our office are perfect. Great quality and excellent after-sales support.",
//     rating: 5,
//     image: "/confident-businesswoman.png",
//   },
// ];

// export const categories = [
//   {
//     id: "aluminum-upvc",
//     name: "Aluminum & UPVC",
//     description: "High-quality doors, windows, and shutters",
//     image: "/aluminum-doors-and-windows.jpg",
//     subcategories: ["Doors", "Windows", "Shutters", "Automatic Doors"],
//   },
//   {
//     id: "interior-doors",
//     name: "Interior Doors",
//     description: "Elegant interior door solutions",
//     image: "/interior-doors.jpg",
//     subcategories: [
//       "Single Doors",
//       "Double Doors",
//       "Sliding Doors",
//       "Wall Frame Doors",
//     ],
//   },
//   {
//     id: "home-solutions",
//     name: "Home Solutions",
//     description: "Complete home furnishing solutions",
//     image: "/home-furniture-and-closets.jpg",
//     subcategories: ["Closets", "Kitchens", "Furniture", "Accessories"],
//   },
//   {
//     id: "services",
//     name: "Services",
//     description: "Professional home services",
//     image: "/home-services.png",
//     subcategories: ["Home Moving", "Cleaning Services", "Interior Design"],
//   },
// ];
// ================== TYPES ==================
export type Product = {
  _id: string;
  title: string;
  dimension?: string;
  price: number;
  image?: string;
  subCategoryId?: string;
  subServiceId?: string;
  vendorId: string;
  modelGlb?: string;
  modelUrl?: string; // can be used as a unified AR model link
  modelUsdz?: string;
  createdAt: string;
  updatedAt: string;
};

export type Vendor = {
  _id: string;
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  workingHours: string;
  image?: string;
  products?: string[]; // array of Product _id
};

export type SubCategory = {
  _id: string;
  title: string;
  image?: string;
  categoryId: string;
  canDesign?: boolean;
};

export type SubService = {
  _id: string;
  title: string;
  serviceId: string;
  image?: string;
};

export type Category = {
  _id: string;
  title: string;
  image?: string;
};

export type Service = {
  _id: string;
  title: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
};

// ================== VENDORS ==================
export const vendors: Vendor[] = [
  {
    _id: "vendor1",
    companyName: "Modern Build Co.",
    companyPhone: "+965 2222 3344",
    companyAddress: "Shuwaikh Industrial Area, Kuwait City",
    workingHours: "Mon–Sat: 8 AM–6 PM",
    image: "/modern-aluminum-door.jpg",
  },
  {
    _id: "vendor2",
    companyName: "Interior Craft",
    companyPhone: "+965 3333 4455",
    companyAddress: "Al Rai, Kuwait City",
    workingHours: "Mon–Fri: 9 AM–5 PM",
    image: "/modern-aluminum-door.jpg",
  },
  {
    _id: "vendor3",
    companyName: "HomeStyle Furnishings",
    companyPhone: "+965 5555 6677",
    companyAddress: "Salmiya, Block 10, Kuwait",
    workingHours: "Daily: 10 AM–8 PM",
    image: "/modern-aluminum-door.jpg",
  },
];

// ================== CATEGORIES ==================
export const categories: Category[] = [
  { _id: "cat1", title: "Aluminum & UPVC", image: "/aluminum-doors-and-windows.jpg" },
  { _id: "cat2", title: "Interior Doors", image: "/interior-doors.jpg" },
  { _id: "cat3", title: "Home Solutions", image: "/home-furniture-and-closets.jpg" },
  { _id: "cat4", title: "Services", image: "/home-services.png" },
];

// ================== SUBCATEGORIES ==================
export const subCategories: SubCategory[] = [
  { _id: "subcat1", title: "Doors", categoryId: "cat1" },
  { _id: "subcat2", title: "Windows", categoryId: "cat1" },
  { _id: "subcat3", title: "Shutters", categoryId: "cat1" },
  { _id: "subcat4", title: "Automatic Doors", categoryId: "cat1" },
  { _id: "subcat5", title: "Single Doors", categoryId: "cat2" },
  { _id: "subcat6", title: "Double Doors", categoryId: "cat2" },
  { _id: "subcat7", title: "Sliding Doors", categoryId: "cat2" },
  { _id: "subcat8", title: "Wall Frame Doors", categoryId: "cat2" },
  { _id: "subcat9", title: "Closets", categoryId: "cat3" },
  { _id: "subcat10", title: "Kitchens", categoryId: "cat3" },
  { _id: "subcat11", title: "Furniture", categoryId: "cat3" },
  { _id: "subcat12", title: "Accessories", categoryId: "cat3" },
];

// ================== SUBSERVICES ==================
export const subServices: SubService[] = [
  { _id: "subserv1", title: "Home Moving", serviceId: "serv1" },
  { _id: "subserv2", title: "Cleaning Services", serviceId: "serv1" },
  { _id: "subserv3", title: "Interior Design", serviceId: "serv1" },
];

// ================== PRODUCTS ==================
export const products: Product[] = [
  {
    _id: "prod1",
    title: "Modern Aluminum Door",
    dimension: "90cm x 210cm",
    price: 450,
    image: "/modern-aluminum-door.jpg",
    subCategoryId: "subcat1",
    vendorId: "vendor1",
    modelUrl: "/ar/modern-aluminum-door.glb",
    modelGlb: "/ar/modern-aluminum-door.glb",
    modelUsdz: "/ar/modern-aluminum-door.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod9",
    title: "Modern Aluminum Door",
    dimension: "90cm x 210cm",
    price: 350,
    image: "/modern-aluminum-door.jpg",
    subCategoryId: "subcat1",
    vendorId: "vendor2",
    modelUrl: "/ar/modern-aluminum-door.glb",

    modelGlb: "/ar/modern-aluminum-door.glb",
    modelUsdz: "/ar/modern-aluminum-door.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod2",
    title: "UPVC Sliding Window",
    dimension: "120cm x 150cm",
    price: 320,
    image: "/upvc-sliding-window.jpg",
    subCategoryId: "subcat2",
    vendorId: "vendor1",
    modelUrl: "/ar/upvc-sliding-window.glb",

    modelGlb: "/ar/upvc-sliding-window.glb",
    modelUsdz: "/ar/upvc-sliding-window.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod3",
    title: "Automatic Sliding Door",
    dimension: "180cm x 220cm",
    price: 1200,
    image: "/automatic-sliding-door.jpg",
    subCategoryId: "subcat4",
    vendorId: "vendor1",
    modelUrl: "/ar/automatic-sliding-door.glb",

    modelGlb: "/ar/automatic-sliding-door.glb",
    modelUsdz: "/ar/automatic-sliding-door.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod4",
    title: "Solid Wood Interior Door",
    dimension: "80cm x 200cm",
    price: 280,
    image: "/solid-wood-interior-door.jpg",
    subCategoryId: "subcat5",
    vendorId: "vendor2",
    modelUrl: "/ar/solid-wood-interior-door.glb",

    modelGlb: "/ar/solid-wood-interior-door.glb",
    modelUsdz: "/ar/solid-wood-interior-door.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod5",
    title: "Double French Doors",
    dimension: "160cm x 210cm",
    price: 520,
    image: "/french-double-doors-interior.jpg",
    subCategoryId: "subcat6",
    vendorId: "vendor2",
    modelUrl: "/ar/french-double-doors.glb",

    modelGlb: "/ar/french-double-doors.glb",
    modelUsdz: "/ar/french-double-doors.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod6",
    title: "Modern Sliding Door",
    dimension: "90cm x 210cm",
    price: 380,
    image: "/modern-sliding-interior-door.jpg",
    subCategoryId: "subcat7",
    vendorId: "vendor2",
    modelUrl: "/ar/modern-sliding-door.glb",
    modelGlb: "/ar/modern-sliding-door.glb",

    modelUsdz: "/ar/modern-sliding-door.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod7",
    title: "Custom Walk-in Closet",
    dimension: "Custom",
    price: 2500,
    image: "/luxury-walk-in-closet.jpg",
    subCategoryId: "subcat9",
    vendorId: "vendor3",
    modelUrl: "/ar/custom-walk-in-closet.glb",

    modelGlb: "/ar/custom-walk-in-closet.glb",
    modelUsdz: "/ar/custom-walk-in-closet.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "prod8",
    title: "Modern Kitchen Set",
    dimension: "Custom",
    price: 5500,
    image: "/modern-kitchen.png",
    subCategoryId: "subcat10",
    vendorId: "vendor3",
    modelUrl: "/ar/modern-kitchen.glb",

    modelGlb: "/ar/modern-kitchen.glb",
    modelUsdz: "/ar/modern-kitchen.usdz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ================== TESTIMONIALS ==================
export const testimonials: Testimonial[] = [
  {
    _id: "t1",
    name: "Sarah Al-Mansour",
    role: "Homeowner",
    content:
      "The quality of their doors and installation service exceeded my expectations. Highly professional team!",
    rating: 5,
    image: "/professional-woman-portrait.png",
  },
  {
    _id: "t2",
    name: "Ahmed Hassan",
    role: "Interior Designer",
    content:
      "I always recommend myHome to my clients. Their product range and customization options are outstanding.",
    rating: 5,
    image: "/professional-man-portrait.png",
  },
  {
    _id: "t3",
    name: "Fatima Al-Sabah",
    role: "Business Owner",
    content:
      "The automatic doors they installed at our office are perfect. Great quality and excellent after-sales support.",
    rating: 5,
    image: "/confident-businesswoman.png",
  },
];
