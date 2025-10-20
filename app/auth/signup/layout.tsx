// app/auth/signin/layout.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div >
        <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
