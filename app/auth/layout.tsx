"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar"; // extract your sidebar as a separate component
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function DashboardAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" ">
      {/* Sidebar always visible */}
      <Navigation />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto ">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
