"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { loggedIn, loading: authLoading, setLoggedIn, checkAuth } = useAuth();

  useEffect(() => {
    if (!authLoading && loggedIn && checkAuth) {
      const redirectUser = async () => {
        const currentUser = await checkAuth();
        if (!currentUser) return;

        if (currentUser.role === "admin" || currentUser.role === "vendore") {
          router.replace("/dashboard");
        } else {
          router.replace("/");
        }
      };
      redirectUser();
    }
  }, [authLoading, loggedIn, router, checkAuth]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setLoggedIn(true);
        const currentUser = await checkAuth();

        if (currentUser?.role === "admin" || currentUser?.role === "vendore") {
          router.replace("/dashboard");
        } else {
          router.replace("/");
        }
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-lg text-muted-foreground">Checking session...</p>
    </div>
  );  if (loggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Logo */}
      {/* <Link href="/" className="mb-4">
        <Image
          src="/logo2.jpg" // replace with your logo
          alt="Logo"
          width={140}
          height={60}
          className="object-contain cursor-pointer"
        />
      </Link> */}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "var(--primary)" }}>
        Sign In to your account
      </h1>

      {/* Subtitle */}
      <p className="text-center text-sm md:text-base text-muted-foreground mb-6">
        Welcome back! Please enter your details.
      </p>

      {/* Sign In Card */}
      <div className="w-full max-w-md shadow-lg rounded-xl p-8 bg-card dark:bg-card">
        {errorMsg && (
          <div className="mb-4 text-red-600 p-2 border border-red-400 rounded bg-red-50 dark:bg-red-900 dark:border-red-600 dark:text-red-300 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground p-3 rounded hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign Up link */}
          <p className="text-center mt-4 text-sm text-muted-foreground dark:text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-secondary font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
