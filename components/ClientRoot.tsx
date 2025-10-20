"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.startsWith("/auth/signin") || pathname?.startsWith("/auth/signup");

  const isDashboardPage = pathname?.startsWith("/dashboard"); // ✅ add this

  // Hide nav/footer on auth pages or dashboard pages
  const hideLayout = isAuthPage || isDashboardPage;

  return (
    <>
      {!hideLayout && <Navigation />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
