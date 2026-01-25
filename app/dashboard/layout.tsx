// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter, usePathname } from "next/navigation";
// import Sidebar from "@/components/sidebar";
// import axios from "axios";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   const { loggedIn, loading, user } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();
//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//   const [isMobile, setIsMobile] = useState(false);

//   // ✅ Redirect if not logged in
//   // useEffect(() => {
//   //   if (!loading && !loggedIn) {
//   //     router.replace("/auth/signin");
//   //   }
//   // }, [loading, loggedIn, router]);

//   // ✅ Polling to refresh user info and check permissions
//   useEffect(() => {
//     if (!loggedIn) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
//         const updatedUser = res.data;

//         if (!updatedUser.isActive) {
//           router.replace("/auth/signin");
//           return;
//         }

     

//         if (
//           updatedUser.role !== user?.role ||
//           updatedUser.isActive !== user?.isActive
//         ) {
//           window.location.reload();
//         }
//       } catch (err) {
//         console.error("Failed to refresh user", err);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [loggedIn, user, pathname, router]);

//   // ✅ Check screen width
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//  // Show loader *until useAuth finishes checking session*
// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
//       Checking session...
//     </div>
//   );
// }

// // After loading finishes → user is NOT logged in → redirect
// if (!loggedIn) {
//   router.replace("/auth/signin");
//   return null;
// }


//   // ✅ Mobile view restriction
//   // if (isMobile) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen p-4 text-center bg-background text-foreground">
//   //       <p className="text-red-500 text-lg font-semibold">
//   //         The dashboard is only available on tablets or larger screens. <br />
//   //         Please use a tablet or desktop to access it.
//   //       </p>
//   //     </div>
//   //   );
//   // }

//   // ✅ Normal dashboard layout
//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
//       <Sidebar />
//       <main className="flex-1 bg-background text-foreground overflow-auto p-6">
//         {children}
//       </main>
//     </div>
//   );
// }
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loggedIn, loading, user } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle sidebar collapse state from child
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  // ✅ Check screen width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loader until useAuth finishes checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Checking session...</p>
        </div>
      </div>
    );
  }

  // After loading finishes → user is NOT logged in → redirect
  if (!loggedIn) {
    router.replace("/auth/signin");
    return null;
  }

  // ✅ Normal dashboard layout
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <main 
        className={`flex-1 bg-background text-foreground overflow-auto transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        } ${isMobile ? "ml-0" : ""}`}
      >
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}