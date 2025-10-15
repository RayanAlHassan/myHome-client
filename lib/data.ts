
// // ================== TYPES ==================
// export type Product = {
//   _id: string;
//   title: string;
//   dimension?: string;
//   price: number;
//   image?: string;
//   subCategoryId?: string;
//   subServiceId?: string;
//   vendorId: string;
//   modelGlb?: string;
//   modelUrl?: string; // can be used as a unified AR model link
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
//   image?: string;
//   products?: string[]; // array of Product _id
// };

// export type SubCategory = {
//   _id: string;
//   title: string;
//   image?: string;
//   categoryId: string;
//   canDesign?: boolean;
// };

// export type SubService = {
//   _id: string;
//   title: string;
//   serviceId: string;
//   image?: string;
// };

// export type Category = {
//   _id: string;
//   title: string;
//   image?: string;
// };

// export type Service = {
//   _id: string;
//   title: string;
// };

// export type Testimonial = {
//   _id: string;
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
//   image: string;
// };

// // ================== VENDORS ==================
// export const vendors: Vendor[] = [
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

// // ================== CATEGORIES ==================
// export const categories: Category[] = [
//   {
//     _id: "cat1",
//     title: "Aluminum & UPVC",
//     image: "/aluminum-doors-and-windows.jpg",
//   },
//   { _id: "cat2", title: "Interior Doors", image: "/interior-doors.jpg" },
//   {
//     _id: "cat3",
//     title: "Home Solutions",
//     image: "/home-furniture-and-closets.jpg",
//   },
//   { _id: "cat4", title: "Services", image: "/home-services.png" },

// ];

// // ================== SUBCATEGORIES ==================
// export const subCategories: SubCategory[] = [
//   { _id: "subcat1", title: "Doors", categoryId: "cat1" },
//   { _id: "subcat2", title: "Windows", categoryId: "cat1" },
//   { _id: "subcat3", title: "Shutters", categoryId: "cat1" },
//   { _id: "subcat4", title: "Automatic Doors", categoryId: "cat1" },
//   { _id: "subcat5", title: "Single Doors", categoryId: "cat2" },
//   { _id: "subcat6", title: "Double Doors", categoryId: "cat2" },
//   { _id: "subcat7", title: "Sliding Doors", categoryId: "cat2" },
//   { _id: "subcat8", title: "Wall Frame Doors", categoryId: "cat2" },
//   { _id: "subcat9", title: "Closets", categoryId: "cat3" },
//   { _id: "subcat10", title: "Kitchens", categoryId: "cat3" },
//   { _id: "subcat11", title: "Furniture", categoryId: "cat3" },
//   { _id: "subcat12", title: "Accessories", categoryId: "cat3" },
// ];

// // ================== SUBSERVICES ==================
// export const subServices: SubService[] = [
//   { _id: "subserv1", title: "Home Moving", serviceId: "serv1" },
//   { _id: "subserv2", title: "Cleaning Services", serviceId: "serv1" },
//   { _id: "subserv3", title: "Interior Design", serviceId: "serv1" },
// ];

// // ================== PRODUCTS ==================
// export const products: Product[] = [
//   {
//     _id: "prod1",
//     title: "Modern Aluminum Door",
//     dimension: "90cm x 210cm",
//     price: 450,
//     image: "/modern-aluminum-door.jpg",
//     subCategoryId: "subcat1",
//     vendorId: "vendor1",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/modern-aluminum-door.glb",
//     modelUsdz: "/ar/modern-aluminum-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod9",
//     title: "Modern Aluminum Door",
//     dimension: "90cm x 210cm",
//     price: 350,
//     image: "/modern-aluminum-door.jpg",
//     subCategoryId: "subcat1",
//     vendorId: "vendor2",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",

//     modelGlb: "/ar/modern-aluminum-door.glb",
//     modelUsdz: "/ar/modern-aluminum-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod2",
//     title: "UPVC Sliding Window",
//     dimension: "120cm x 150cm",
//     price: 320,
//     image: "/upvc-sliding-window.jpg",
//     subCategoryId: "subcat2",
//     vendorId: "vendor1",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/upvc-sliding-window.glb",
//     modelUsdz: "/ar/upvc-sliding-window.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod3",
//     title: "Automatic Sliding Door",
//     dimension: "180cm x 220cm",
//     price: 1200,
//     image: "/automatic-sliding-door.jpg",
//     subCategoryId: "subcat4",
//     vendorId: "vendor1",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/automatic-sliding-door.glb",
//     modelUsdz: "/ar/automatic-sliding-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod4",
//     title: "Solid Wood Interior Door",
//     dimension: "80cm x 200cm",
//     price: 280,
//     image: "/solid-wood-interior-door.jpg",
//     subCategoryId: "subcat5",
//     vendorId: "vendor2",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/solid-wood-interior-door.glb",
//     modelUsdz: "/ar/solid-wood-interior-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod5",
//     title: "Double French Doors",
//     dimension: "160cm x 210cm",
//     price: 520,
//     image: "/french-double-doors-interior.jpg",
//     subCategoryId: "subcat6",
//     vendorId: "vendor2",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/french-double-doors.glb",
//     modelUsdz: "/ar/french-double-doors.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod6",
//     title: "Modern Sliding Door",
//     dimension: "90cm x 210cm",
//     price: 380,
//     image: "/modern-sliding-interior-door.jpg",
//     subCategoryId: "subcat7",
//     vendorId: "vendor2",
//     modelUrl: "/ar/modern-sliding-door.glb",
//     modelGlb: "/ar/modern-sliding-door.glb",

//     modelUsdz: "/ar/modern-sliding-door.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod7",
//     title: "Custom Walk-in Closet",
//     dimension: "Custom",
//     price: 2500,
//     image: "/luxury-walk-in-closet.jpg",
//     subCategoryId: "subcat9",
//     vendorId: "vendor3",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/custom-walk-in-closet.glb",
//     modelUsdz: "/ar/custom-walk-in-closet.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "prod8",
//     title: "Modern Kitchen Set",
//     dimension: "Custom",
//     price: 5500,
//     image: "/modern-kitchen.png",
//     subCategoryId: "subcat10",
//     vendorId: "vendor3",
//     modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
//     modelGlb: "/ar/modern-kitchen.glb",
//     modelUsdz: "/ar/modern-kitchen.usdz",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

// // ================== TESTIMONIALS ==================
// export const testimonials: Testimonial[] = [
//   {
//     _id: "t1",
//     name: "Sarah Al-Mansour",
//     role: "Homeowner",
//     content:
//       "The quality of their doors and installation service exceeded my expectations. Highly professional team!",
//     rating: 5,
//     image: "/professional-woman-portrait.png",
//   },
//   {
//     _id: "t2",
//     name: "Ahmed Hassan",
//     role: "Interior Designer",
//     content:
//       "I always recommend myHome to my clients. Their product range and customization options are outstanding.",
//     rating: 5,
//     image: "/professional-man-portrait.png",
//   },
//   {
//     _id: "t3",
//     name: "Fatima Al-Sabah",
//     role: "Business Owner",
//     content:
//       "The automatic doors they installed at our office are perfect. Great quality and excellent after-sales support.",
//     rating: 5,
//     image: "/confident-businesswoman.png",
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
  { _id: "cat4", title: "Services", image: "/home-services.png" },
  { _id: "cat5", title: "Out / In Door", image: "/image5.jpg" },
  {
    _id: "cat3",
    title: "Home Solutions",
    image: "/home-furniture-and-closets.jpg",
  },
  { _id: "cat7", title: "Home Moving", image: "/image7.jpg" },
  
  {
    _id: "cat1",
    title: "Aluminum & UPVC",
    image: "/aluminum-doors-and-windows.jpg",
  },
  { _id: "cat2", title: "Interior Doors", image: "/interior-doors.jpg" },

  { _id: "cat8", title: "Furniture", image: "/image8.jpg" },
  { _id: "cat6", title: "Accessories", image: "/image6.jpg" },

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
  { _id: "subcat12", title: "Cleanin Services", categoryId: "cat3" },
  { _id: "subcat13", title: "Integrated Interior Designe", categoryId: "cat4" },
  { _id: "subcat14", title: "In Door", categoryId: "cat5" },
  { _id: "subcat15", title: "Out Door", categoryId: "cat5" },
  { _id: "subcat16", title: "Smart Looks", categoryId: "cat6" },
  { _id: "subcat17", title: "Doors Handles", categoryId: "cat6" },
  { _id: "subcat18", title: "Hinges Door", categoryId: "cat6" },
  { _id: "subcat19", title: "Kitchen Accessories", categoryId: "cat6" },
  { _id: "subcat20", title: "Moving", categoryId: "cat7" },
  { _id: "subcat21", title: "Pack", categoryId: "cat7" },

  { _id: "subcat22", title: "Living Rooms", categoryId: "cat8" },
  { _id: "subcat23", title: "Bedrooms", categoryId: "cat8" },
  { _id: "subcat24", title: "Dining Rooms", categoryId: "cat8" },
  { _id: "subcat25", title: "Home Offices", categoryId: "cat8" },
  { _id: "subcat26", title: "Office Furniture", categoryId: "cat8" },
  { _id: "subcat27", title: "Cabinets", categoryId: "cat8" },
  { _id: "subcat28", title: "Chairs", categoryId: "cat8" },
  { _id: "subcat29", title: "Tables", categoryId: "cat8" },
  { _id: "subcat30", title: "Wardrobes", categoryId: "cat8" },

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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",

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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
        modelUrl: "/ar/single-door.glb",

    // modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    modelUrl: "/ar/singled.glb",
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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
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
