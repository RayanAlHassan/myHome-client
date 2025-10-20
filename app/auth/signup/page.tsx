"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "specialNeedCustomer" | "vendore";
  phone?: string;
  companyName?: string;
  companyPhone?: string;
  companyAddress?: string;
  workingHours?: string;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    phone: "",
    companyName: "",
    companyPhone: "",
    companyAddress: "",
    workingHours: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || undefined,
        vendorProfile:
          form.role === "vendore"
            ? {
                companyName: form.companyName,
                companyPhone: form.companyPhone,
                companyAddress: form.companyAddress,
                workingHours: form.workingHours,
              }
            : undefined,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        payload,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Account created successfully. Now you are logged in.");
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data?.message || "Registration failed");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "var(--primary)" }}>
        Create your account
      </h1>
      <p className="text-center text-sm md:text-base text-muted-foreground mb-6">
        Join us today! It’s quick, easy, and free to get started.
      </p>
  
      {errorMsg && (
        <div className="mb-4 text-red-600 p-2 border border-red-400 rounded bg-red-50 dark:bg-red-900 dark:border-red-600 dark:text-red-300 text-center">
          {errorMsg}
        </div>
      )}
  
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customer Fields */}
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Name</label>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
        </div>
  
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Phone (optional)</label>
          <input type="text" name="phone" placeholder="Your Phone" value={form.phone} onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
        </div>
  
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Email</label>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
        </div>
  
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Password</label>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
        </div>
  
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
        </div>
  
        <div>
          <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Role</label>
          <select name="role" value={form.role} onChange={handleChange} required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground">
            <option value="customer">Customer</option>
            <option value="specialNeedCustomer">Special Need Customer</option>
            <option value="vendore">Vendore</option>
          </select>
        </div>
  
        {/* Vendor Fields (only if role=vendore) */}
        {form.role === "vendore" && (
          <>
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Company Name</label>
              <input type="text" name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
            </div>
  
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Company Phone</label>
              <input type="text" name="companyPhone" placeholder="Company Phone" value={form.companyPhone} onChange={handleChange} required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
            </div>
  
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Company Address</label>
              <input type="text" name="companyAddress" placeholder="Company Address" value={form.companyAddress} onChange={handleChange} required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
            </div>
  
            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--primary)" }}>Working Hours</label>
              <input type="text" name="workingHours" placeholder="Working Hours" value={form.workingHours} onChange={handleChange} required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-card dark:text-card-foreground" />
            </div>
          </>
        )}
  
        {/* Submit button (full width) */}
        <div className="sm:col-span-2 mt-4">
          <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground p-3 rounded hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          <p className="text-center mt-4 text-sm text-muted-foreground dark:text-muted-foreground">
            Already have an account? <Link href="/auth/signin" className="text-primary hover:text-secondary font-semibold transition-colors">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default SignUp;
