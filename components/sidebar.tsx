"use client";

import Link from "next/link";
import { Menu, LogOut ,Moon, Sun,} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { loggedIn, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    // { label: "Dashboard", icon: "🏠", href: "/dashboard" },
    { label: "Users", icon: "👤", href: "/dashboard/users" },
    { label: "categories", icon: "📁", href: "/dashboard/categories" },
    {
      label: "Subcategories",
      icon: "📝",
      href: "/dashboard/subcategories",
    },
    { label: "Events", icon: "📅", href: "/dashboard/events" },
    { label: "Sponsors", icon: "💰", href: "/dashboard/sponsors" },
    { label: "Team", icon: "👥", href: "/dashboard/team" },
    { label: "Giveaway", icon: "🎁", href: "/dashboard/giveaway" },
  ];

  return (
    <div
      className={`flex flex-col bg-background text-foreground border-r border-border h-screen transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-2 border-b border-border">
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-muted transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="px-4 py-4 border-b border-border">
          <div className="font-semibold text-lg">{user.name}</div>
          <div className="text-sm text-muted-foreground">Role: {user.role}</div>
         
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted transition"
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-sm text-muted-foreground mb-2">
            © Naga Racing
          </div>
        )}
        {loggedIn && (
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 w-full justify-center transition"
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}
