// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { User, Menu, X, Moon, Sun, Search, ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useTheme } from "./theme-provider";
// import { Button } from "./ui/button";
// import { categories, subCategories } from "@/lib/data";
// import { useAuth } from "@/hooks/useAuth"; // adjust path if needed

// export function Navigation() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [categoriesOpen, setCategoriesOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const categoriesRef = useRef<HTMLDivElement>(null);

//   const { loggedIn, user, logout } = useAuth();

//   // Close categories dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         categoriesRef.current &&
//         !categoriesRef.current.contains(event.target as Node)
//       ) {
//         setCategoriesOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const closeMobileMenu = () => setMobileMenuOpen(false);
//   const toggleCategories = () => setCategoriesOpen(!categoriesOpen);

//   return (
//     <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src={`/logo2.jpg` || "/placeholder.svg"}
//               alt="myHome Logo"
//               width={150}
//               height={50}
//               className="object-contain"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <Link
//               href="/"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Home
//             </Link>

//             {/* Categories Dropdown */}
//             <div className="relative" ref={categoriesRef}>
//               <button
//                 onClick={toggleCategories}
//                 className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
//               >
//                 Categories
//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${
//                     categoriesOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {categoriesOpen && (
//                 <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 w-[600px]">
//                   <div className="grid grid-cols-2 gap-6 p-6">
//                     {categories.map((category) => {
//                       const subcats = subCategories.filter(
//                         (sub) => sub.categoryId === category._id
//                       );
//                       return (
//                         <div key={category._id}>
//                           <Link
//                             href={`/category/${category._id}`}
//                             className="font-semibold mb-3 text-sm hover:text-primary block"
//                             onClick={() => setCategoriesOpen(false)}
//                           >
//                             {category.title}
//                           </Link>
//                           <ul className="space-y-2">
//                             {subcats.map((sub) => (
//                               <li key={sub._id}>
//                                 <Link
//                                   href={`/category/${category._id}?subcategory=${sub._id}`}
//                                   className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
//                                   onClick={() => setCategoriesOpen(false)}
//                                 >
//                                   {sub.title}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Link
//               href="/accessibility"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Accessibility
//             </Link>
//             <Link
//               href="/ar-assistant"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Ar-assistant
//             </Link>
//             <Link
//               href="/about"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               About Us
//             </Link>
//             <Link
//               href="/contact"
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               Contact Us
//             </Link>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="h-5 w-5" />
//             </Button>

//             <Button variant="ghost" size="icon" onClick={toggleTheme}>
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//             </Button>

//             {/* Profile Icon (only if logged in) */}
//             {loggedIn && user ? (
//               <Link href="/profile">
//                 <Button variant="ghost" size="icon" className="hidden md:flex">
//                   <User className="h-5 w-5" />
//                 </Button>
//               </Link>
//             ) : (
//               <Link href="/auth/signin" className="hidden md:inline-block">
//                 <Button variant="outline" size="sm">
//                   Sign In / Sign Up
//                 </Button>
//               </Link>
//             )}

//             {/* Sign Out button if logged in */}
//             {loggedIn && user && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="hidden md:inline-block"
//                 onClick={logout}
//               >
//                 Sign Out
//               </Button>
//             )}

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden border-t border-border">
//             <div className="max-h-[75dvh] overflow-y-auto py-4">
//               <div className="flex flex-col space-y-4">
//                 <Link
//                   href="/"
//                   className="text-sm font-medium hover:text-primary transition-colors px-4 py-2"
//                   onClick={closeMobileMenu}
//                 >
//                   Home
//                 </Link>

//                 {categories.map((category) => {
//                   const subcats = subCategories.filter(
//                     (sub) => sub.categoryId === category._id
//                   );
//                   return (
//                     <div key={category._id} className="px-4">
//                       <Link
//                         href={`/category/${category._id}`}
//                         className="font-semibold mb-2 text-sm hover:text-primary transition-colors block py-2"
//                         onClick={closeMobileMenu}
//                       >
//                         {category.title}
//                       </Link>
//                       <div className="pl-4 space-y-2">
//                         {subcats.map((sub) => (
//                           <Link
//                             key={sub._id}
//                             href={`/category/${category._id}?subcategory=${sub._id}`}
//                             className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
//                             onClick={closeMobileMenu}
//                           >
//                             {sub.title}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}

//                 <Link
//                   href="/accessibility"
//                   className="text-sm font-medium hover:text-primary transition-colors px-4 py-2"
//                   onClick={closeMobileMenu}
//                 >
//                   Accessibility
//                 </Link>
//                 <Link
//                   href="/ar-assistant"
//                   className="text-sm font-medium hover:text-primary transition-colors px-4 py-2"
//                   onClick={closeMobileMenu}
//                 >
//                   Ar-assistant
//                 </Link>
//                 <Link
//                   href="/about"
//                   className="text-sm font-medium hover:text-primary transition-colors px-4 py-2"
//                   onClick={closeMobileMenu}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="text-sm font-medium hover:text-primary transition-colors px-4 py-2"
//                   onClick={closeMobileMenu}
//                 >
//                   Contact
//                 </Link>

//                 {/* Mobile Sign In / Sign Up or Sign Out */}
//                 {!loggedIn ? (
//                   <Link href="/auth/signin" className="px-4 py-2">
//                     <Button variant="outline" size="sm" className="w-full">
//                       Sign In / Sign Up
//                     </Button>
//                   </Link>
//                 ) : (
//                   <>
//                     <Link href="/profile" className="px-4 py-2">
//                       <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2">
//                         <User className="h-4 w-4" /> Profile
//                       </Button>
//                     </Link>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="px-4 py-2 w-full"
//                       onClick={logout}
//                     >
//                       Sign Out
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, Moon, Sun, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SubCategory {
  _id: string;
  title: string;
}

interface Category {
  _id: string;
  title: string;
  subCategories: SubCategory[];
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme, toggleTheme } = useTheme();
  const { loggedIn, user, logout } = useAuth();
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch categories and their subcategories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const categoriesData = await res.json();

        // For each category, fetch subcategories
        const categoriesWithSubs = await Promise.all(
          categoriesData.map(async (cat: any) => {
            const resSubs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/category/${cat._id}`);
            const subs = await resSubs.json();
            return { ...cat, subCategories: subs };
          })
        );

        setCategories(categoriesWithSubs);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo2.jpg" alt="Logo" width={150} height={50} className="object-contain" />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={toggleCategories}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 w-[600px]">
                  <div className="grid grid-cols-2 gap-6 p-6">
                    {categories.map((category) => (
                      <div key={category._id}>
                        <Link
                          href={`/category/${category._id}`}
                          className="font-semibold mb-3 text-sm hover:text-primary block"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          {category.title}
                        </Link>
                        <ul className="space-y-2">
                          {category.subCategories.map((sub) => (
                            <li key={sub._id}>
                              <Link
                                href={`/category/${category._id}?subcategory=${sub._id}`}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                                onClick={() => setCategoriesOpen(false)}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/accessibility" className="text-sm font-medium hover:text-primary transition-colors">Accessibility</Link>
            <Link href="/ar-assistant" className="text-sm font-medium hover:text-primary transition-colors">Ar-assistant</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex"><Search className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</Button>
            {loggedIn && user ? (
              <Link href="/profile"><Button variant="ghost" size="icon" className="hidden md:flex"><User className="h-5 w-5" /></Button></Link>
            ) : (
              <Link href="/auth/signin" className="hidden md:inline-block"><Button variant="outline" size="sm">Sign In / Sign Up</Button></Link>
            )}
            {loggedIn && user && (
              <Button variant="outline" size="sm" className="hidden md:inline-block" onClick={logout}>Sign Out</Button>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border max-h-[75dvh] overflow-y-auto py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2" onClick={closeMobileMenu}>Home</Link>

              {categories.map((category) => (
                <div key={category._id} className="px-4">
                  <Link href={`/category/${category._id}`} className="font-semibold mb-2 text-sm hover:text-primary transition-colors block py-2" onClick={closeMobileMenu}>{category.title}</Link>
                  <div className="pl-4 space-y-2">
                    {category.subCategories.map((sub) => (
                      <Link key={sub._id} href={`/category/${category._id}?subcategory=${sub._id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMobileMenu}>{sub.title}</Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link href="/accessibility" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2" onClick={closeMobileMenu}>Accessibility</Link>
              <Link href="/ar-assistant" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2" onClick={closeMobileMenu}>Ar-assistant</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2" onClick={closeMobileMenu}>About</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2" onClick={closeMobileMenu}>Contact</Link>

              {!loggedIn ? (
                <Link href="/auth/signin" className="px-4 py-2">
                  <Button variant="outline" size="sm" className="w-full">Sign In / Sign Up</Button>
                </Link>
              ) : (
                <>
                  <Link href="/profile" className="px-4 py-2">
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-2"><User className="h-4 w-4" /> Profile</Button>
                  </Link>
                  <Button variant="outline" size="sm" className="px-4 py-2 w-full" onClick={logout}>Sign Out</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
