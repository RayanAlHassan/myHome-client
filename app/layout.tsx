// import type React from "react";
// import { Inter, Playfair_Display } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Navigation } from "@/components/navigation";
// import { Footer } from "@/components/footer";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
// });

// export const metadata = {
//   title: "myHome - Modern Home Solutions",
//   description:
//     "Transform your home with our comprehensive range of doors, windows, furniture, and interior design services.",
//   generator: "myHome.app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${inter.variable} ${playfair.variable}`}
//       suppressHydrationWarning
//     >
//       <body>
//         <ThemeProvider>
//           <Navigation />
//           <main className="min-h-screen">{children}</main>
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import ClientRoot from "@/components/ClientRoot"; // 👈 new client wrapper
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "myHome - Modern Home Solutions",
  description:
    "Transform your home with our comprehensive range of doors, windows, furniture, and interior design services.",
  generator: "myHome.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
      <Suspense fallback={null}>
          <ThemeProvider >
          <AuthProvider>
          <ClientRoot>{children}</ClientRoot>
        </AuthProvider>          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
