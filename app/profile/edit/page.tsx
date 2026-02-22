"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Store,
  Save,
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

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

export default function EditMyProfilePage() {
  const router = useRouter();
  const { requireAuth } = useAuth();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // vendor fields
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");

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

        const p = res.data as ProfileResponse;
        setProfile(p);

        setName(p.name || "");
        setEmail(p.email || "");
        setPhone(p.phone || "");

        const vp = p.vendorProfile || {};
        setCompanyName(vp.companyName || "");
        setCompanyPhone(vp.companyPhone || "");
        setCompanyAddress(vp.companyAddress || "");
        setWorkingHours(vp.workingHours || "");
      } catch (e: any) {
        setErrMsg(e?.response?.data?.message || "Failed to load profile.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [API_BASE]);

  const isVendor = profile?.role === "vendore";
  const headerRoleIcon =
    profile?.role === "admin" ? (
      <Shield className="h-3.5 w-3.5" />
    ) : profile?.role === "vendore" ? (
      <Store className="h-3.5 w-3.5" />
    ) : (
      <UserIcon className="h-3.5 w-3.5" />
    );

  const vendorTel = useMemo(() => cleanTel(companyPhone), [companyPhone]);

  const handleSave = async () => {
    if (!API_BASE) return;

    setErrMsg(null);
    setOkMsg(null);

    if (!name.trim() || !email.trim()) {
      setErrMsg("Name and Email are required.");
      return;
    }

    try {
      setSaving(true);

      const payload: any = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      if (isVendor) {
        payload.vendorProfile = {
          companyName: companyName.trim(),
          companyPhone: companyPhone.trim(),
          companyAddress: companyAddress.trim(),
          workingHours: workingHours.trim(),
        };
      }

      const res = await axios.put(`${API_BASE}/user/profile`, payload, {
        withCredentials: true,
      });

      setOkMsg(res.data?.message || "Profile updated successfully.");

      const updated = res.data?.user as ProfileResponse | undefined;
      if (updated) {
        setProfile(updated);
      }
    } catch (e: any) {
      setErrMsg(e?.response?.data?.message || "Failed to save changes.");
    } finally {
      setSaving(false);
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
              <div className="h-44 rounded-xl bg-muted/40 animate-pulse" />
              <div className="h-44 rounded-xl bg-muted/40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h1 className="text-xl font-semibold">Profile not available</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {errMsg || "We couldn't load your profile."}
                </p>
                <div className="mt-6 flex gap-3">
                  <Button onClick={() => router.back()} className="bg-orange-500 hover:bg-orange-600">
                    Go Back
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/profile">My Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="h-28 bg-gradient-to-r from-orange-500/15 via-orange-400/10 to-transparent" />
            <div className="px-6 pb-6 -mt-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl border bg-background flex items-center justify-center text-xl font-bold shadow-sm">
                    {initials(name)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold">Edit Profile</h1>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${roleBadgeClasses(profile.role)}`}>
                        {headerRoleIcon}
                        {roleLabel(profile.role)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Update your personal info. Vendor accounts can update company details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => router.back()} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>

                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {errMsg && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/15 dark:text-red-200">
              {errMsg}
            </div>
          )}
          {okMsg && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900/40 dark:bg-green-900/15 dark:text-green-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {okMsg}
            </div>
          )}

          {/* Form */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left */}
            <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Your Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 bg-background"
                    placeholder="Full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background"
                      placeholder="+965 ..."
                    />
                  </div>
                </div>

                {/* Role (readonly) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <input
                    value={roleLabel(profile.role)}
                    readOnly
                    className="w-full rounded-xl border px-3 py-2 bg-muted/30 text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Role is managed by admin.</p>
                </div>
              </div>

              {/* Vendor section */}
              {isVendor && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Store className="h-5 w-5 text-orange-500" />
                    <h2 className="text-lg font-semibold">Vendor Profile</h2>
                    <span className="text-xs text-muted-foreground">(vendore only)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Name</label>
                      <div className="relative">
                        <Building2 className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Phone</label>
                      <div className="relative">
                        <Phone className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={companyPhone}
                          onChange={(e) => setCompanyPhone(e.target.value)}
                          className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background"
                          placeholder="+965 ..."
                        />
                      </div>
                      {vendorTel ? (
                        <p className="text-xs text-muted-foreground">
                          Preview: <span className="font-medium">tel:{vendorTel}</span>
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium">Company Address</label>
                      <div className="relative">
                        <MapPin className="h-4 w-4 text-muted-foreground absolute left-3 top-3.5" />
                        <textarea
                          value={companyAddress}
                          onChange={(e) => setCompanyAddress(e.target.value)}
                          className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background min-h-[90px]"
                          placeholder="Address..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium">Working Hours</label>
                      <div className="relative">
                        <Clock className="h-4 w-4 text-muted-foreground absolute left-3 top-3.5" />
                        <textarea
                          value={workingHours}
                          onChange={(e) => setWorkingHours(e.target.value)}
                          className="w-full rounded-xl border pl-10 pr-3 py-2 bg-background min-h-[70px]"
                          placeholder="e.g., Sun-Thu 9:00 - 18:00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="mt-1 font-mono text-xs break-all">{profile.id}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="mt-1 font-medium">{roleLabel(profile.role)}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Account Status</p>
                  <p className="mt-1 font-medium">{profile.isActive ? "Active" : "Inactive"}</p>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Changes
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">Back to Profile</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Uses backend endpoints: <span className="font-medium">GET /user/profile</span> and{" "}
            <span className="font-medium">PUT /user/profile</span>.
          </p>
        </div>
      </div>
    </div>
  );
}