"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Store,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  LogOut,
  Pencil,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

type VendorProfile = {
  companyName?: string;
  companyPhone?: string;
  companyAddress?: string;
  workingHours?: string;
  status?: "incomplete" | "complete" | string;
};

type ProfileResponse = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: "customer" | "admin" | "vendore" | "specialNeedCustomer" | string;
  isActive?: boolean;
  vendorProfile?: VendorProfile | null;
  // backend may include address for customers in some versions
  address?: any;
};

function cleanTel(phone?: string) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

function roleLabel(role?: string) {
  if (!role) return "User";
  if (role === "vendore") return "Vendor";
  if (role === "specialNeedCustomer") return "Special Needs Customer";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function roleBadgeClasses(role?: string) {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-900/40";
    case "vendore":
      return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-200 dark:border-orange-900/40";
    case "specialNeedCustomer":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-900/40";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-200 dark:border-gray-900/40";
  }
}

function initials(name?: string) {
  const n = (name || "User").trim();
  const parts = n.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "U";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

export default function ProfilePage() {
  const { requireAuth } = useAuth();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:5000/api
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Ensure user is logged in (your hook should redirect to signin if not)
  useEffect(() => {
    requireAuth?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!API_BASE) {
      setErrMsg("Missing NEXT_PUBLIC_API_URL");
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        setLoading(true);
        setErrMsg(null);

        const res = await axios.get(`${API_BASE}/user/profile`, {
          withCredentials: true,
        });

        setProfile(res.data);
      } catch (e: any) {
        setErrMsg(e?.response?.data?.message || "Failed to load profile.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [API_BASE]);

  const vendor = profile?.vendorProfile || null;
  const tel = useMemo(() => cleanTel(profile?.phone), [profile?.phone]);
  const vendorTel = useMemo(() => cleanTel(vendor?.companyPhone), [vendor?.companyPhone]);
  const isVendor = profile?.role === "vendore";

  const statusChip = useMemo(() => {
    if (!isVendor) return null;
    const s = vendor?.status || "incomplete";
    const ok = s === "complete";
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${
          ok
            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-900/40"
            : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-900/40"
        }`}
      >
        {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
        Vendor profile: {ok ? "Complete" : "Incomplete"}
      </span>
    );
  }, [isVendor, vendor?.status]);

  const handleLogout = async () => {
    if (!API_BASE) return;
    try {
      await axios.post(`${API_BASE}/user/logout`, null, { withCredentials: true });
      // hard refresh so auth state resets everywhere
      window.location.href = "/";
    } catch {
      // ignore
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
              <p className="text-sm text-muted-foreground">Loading your profile...</p>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="h-20 rounded-xl bg-muted/40 animate-pulse" />
              <div className="h-32 rounded-xl bg-muted/40 animate-pulse" />
              <div className="h-32 rounded-xl bg-muted/40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errMsg || !profile) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h1 className="text-xl font-semibold">Could not load profile</h1>
                <p className="text-sm text-muted-foreground mt-1">{errMsg || "Unknown error"}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600">
                    Retry
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile.name || "User";
  const displayEmail = profile.email || "—";
  const displayPhone = profile.phone || "—";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
            {/* gradient header */}
            <div className="h-28 bg-gradient-to-r from-orange-500/15 via-orange-400/10 to-transparent" />

            <div className="px-6 pb-6 -mt-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl border bg-background flex items-center justify-center text-xl font-bold shadow-sm">
                    {initials(displayName)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{displayName}</h1>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${roleBadgeClasses(profile.role)}`}>
                        {profile.role === "admin" ? <Shield className="h-3.5 w-3.5" /> : profile.role === "vendore" ? <Store className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />}
                        {roleLabel(profile.role)}
                      </span>
                      {statusChip}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {displayEmail}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {displayPhone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* If you have edit pages, wire these up */}
                  <Button variant="outline" className="gap-2" asChild>
                  <Link href={`/profile/edit`}>
                      <Pencil className="h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>

                  <Button
                    onClick={handleLogout}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Body cards */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Account */}
            <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Account</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="mt-1 font-medium">{displayName}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="mt-1 font-medium">{roleLabel(profile.role)}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 font-medium break-all">{displayEmail}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="mt-1 font-medium">{displayPhone}</p>
                </div>

                <div className="rounded-xl border bg-background p-4 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Account Status</p>
                  <p className="mt-1 font-medium">
                    {profile.isActive ? (
                      <span className="inline-flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        Inactive
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                {tel ? (
                  <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                    <a href={`tel:${tel}`}>Call My Number</a>
                  </Button>
                ) : (
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white" disabled>
                    Add phone to enable calling
                  </Button>
                )}

                <Button variant="outline" asChild>
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </div>

            {/* Vendor card */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Vendor</h2>

              {!isVendor ? (
                <div className="rounded-xl border bg-background p-4 text-sm text-muted-foreground">
                  This account is not a vendor.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="mt-1 font-medium">
                      {vendor?.companyName || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-xs text-muted-foreground">Company Phone</p>
                    <p className="mt-1 font-medium">
                      {vendor?.companyPhone || "—"}
                    </p>
                    <div className="mt-3">
                      {vendorTel ? (
                        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          <a href={`tel:${vendorTel}`}>Call Company</a>
                        </Button>
                      ) : (
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled>
                          Add company phone
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="mt-1 text-sm">
                      {vendor?.companyAddress || "—"}
                    </p>
                    {vendor?.companyAddress ? (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Company location</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-xs text-muted-foreground">Working Hours</p>
                    <p className="mt-1 text-sm">{vendor?.workingHours || "—"}</p>
                    {vendor?.workingHours ? (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Hours</span>
                      </div>
                    ) : null}
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/products">Manage Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

    
        </div>
      </div>
    </div>
  );
}