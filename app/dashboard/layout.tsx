"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import axios from "axios";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loggedIn, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [isMobile, setIsMobile] = useState(false);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace("/auth/signin");
    }
  }, [loading, loggedIn, router]);

  // ✅ Polling to refresh user info and check permissions
  useEffect(() => {
    if (!loggedIn) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
        const updatedUser = res.data;

        if (!updatedUser.isActive) {
          router.replace("/auth/signin");
          return;
        }

        if (pathname.startsWith("/dashboard/")) {
          if (updatedUser.role !== "admin" ) {
            router.replace("/dashboard");
            return;
          }
        }

        if (
          updatedUser.role !== user?.role ||
          updatedUser.isActive !== user?.isActive
        ) {
          window.location.reload();
        }
      } catch (err) {
        console.error("Failed to refresh user", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [loggedIn, user, pathname, router]);

  // ✅ Check screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        Checking session...
      </div>
    );
  }

  if (!loggedIn) return null;

  // ✅ Mobile view restriction
  if (isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-center bg-background text-foreground">
        <p className="text-red-500 text-lg font-semibold">
          The dashboard is only available on tablets or larger screens. <br />
          Please use a tablet or desktop to access it.
        </p>
      </div>
    );
  }

  // ✅ Normal dashboard layout
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 bg-background text-foreground overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
