// "use client";

// import Link from "next/link";
// import { Menu, LogOut ,Moon, Sun,} from "lucide-react";
// import { useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { useTheme } from "./theme-provider";
// import { Button } from "./ui/button";

// export default function Sidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const { loggedIn, logout, user } = useAuth();
//   const { theme, toggleTheme } = useTheme();

//   const menuItems = [
//     // { label: "Dashboard", icon: "🏠", href: "/dashboard" },
//     { label: "Users", icon: "👤", href: "/dashboard/users" },
//     { label: "categories", icon: "📁", href: "/dashboard/categories" },
//     {
//       label: "Subcategories",
//       icon: "📝",
//       href: "/dashboard/subcategories",
//     },
//     { label: "Products", icon: "📅", href: "/dashboard/products" },
//     // { label: "Sponsors", icon: "💰", href: "/dashboard/sponsors" },
//     // { label: "Team", icon: "👥", href: "/dashboard/team" },
//     // { label: "Giveaway", icon: "🎁", href: "/dashboard/giveaway" },
//   ];

//   return (
//     <div
//       className={`flex flex-col bg-background text-foreground border-r border-border h-screen transition-all duration-300 ${
//         isCollapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* Collapse Button */}
//       <div className="flex justify-end p-2 border-b border-border">
//       <Button variant="ghost" size="icon" onClick={toggleTheme}>
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//             </Button>        <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 rounded hover:bg-muted transition"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* User Info */}
//       {!isCollapsed && user && (
//         <div className="px-4 py-4 border-b border-border">
//           <div className="font-semibold text-lg">{user.name}</div>
//           <div className="text-sm text-muted-foreground">Role: {user.role}</div>
         
//         </div>
//       )}

//       {/* Menu Items */}
//       <nav className="flex-1 mt-4 space-y-1">
//         {menuItems.map((item) => (
//           <Link
//             key={item.label}
//             href={item.href}
//             className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted transition"
//           >
//             <span className="text-lg">{item.icon}</span>
//             {!isCollapsed && <span className="font-medium">{item.label}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Footer / Logout */}
//       <div className="px-4 py-4 border-t border-border">
//         {!isCollapsed && (
//           <div className="text-sm text-muted-foreground mb-2">
//             © My Home
//           </div>
//         )}
//         {loggedIn && (
//           <button
//             onClick={logout}
//             className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 w-full justify-center transition"
//           >
//             <LogOut className="w-4 h-4" />
//             {!isCollapsed && <span>Logout</span>}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Menu, LogOut, Moon, Sun, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { loggedIn, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/dashboard" },
    { label: "Users", icon: "👤", href: "/dashboard/users" },
    { label: "Categories", icon: "📁", href: "/dashboard/categories" },
    { label: "Subcategories", icon: "📝", href: "/dashboard/subcategories" },
    { label: "Products", icon: "📅", href: "/dashboard/products" },
  ];

  // Check if mobile
  // useEffect(() => {
  //   const handleResize = () => {
  //     const mobile = window.innerWidth < 768;
  //     setIsMobile(mobile);
  //     if (mobile) {
  //       setIsCollapsed(true);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Notify parent about collapse state change
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`flex flex-col bg-background text-foreground border-r border-border h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } ${isMobile ? "hidden md:flex" : ""}`}
    >
      {/* Header with theme toggle and collapse button */}
      <div
        className={`flex items-center p-4 border-b border-border ${
          isCollapsed ? "flex-col gap-3" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">My Home</span>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
        )}

        <div className={`flex items-center gap-2 ${isCollapsed ? "flex-col" : ""}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="rounded-full hover:bg-muted"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-sm text-muted-foreground truncate capitalize">
                {user.role}
              </div>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && user && (
        <div className="flex justify-center py-4 border-b border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="font-semibold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Scrollable Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <span
                  className={`text-lg flex items-center justify-center ${
                    active ? "text-primary-foreground" : ""
                  }`}
                >
                  {typeof item.icon === "string" ? item.icon : item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
                {active && !isCollapsed && (
                  <div className="ml-auto w-1 h-6 bg-primary-foreground rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div
        className={`border-t border-border p-4 ${
          isCollapsed ? "flex flex-col items-center gap-3" : ""
        }`}
      >
        {!isCollapsed && (
          <div className="text-sm text-muted-foreground mb-3 text-center">
            © {new Date().getFullYear()} My Home
          </div>
        )}

        {loggedIn && (
          <button
            onClick={logout}
            className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:shadow-md ${
              isCollapsed
                ? "justify-center w-12 h-12 rounded-full"
                : "justify-center"
            } bg-red-500 text-white hover:bg-red-600`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        )}
      </div>

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleCollapse}
          className="md:hidden fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
