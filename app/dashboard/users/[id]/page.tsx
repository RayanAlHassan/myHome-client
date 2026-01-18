"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    isActive: true,
    vendorProfile: {
      companyName: "",
      companyPhone: "",
      companyAddress: "",
      workingHours: "",
      status: "incomplete" as "incomplete" | "complete"
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${id}`, { 
          withCredentials: true 
        });
        const user = res.data;
        
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "",
          isActive: user.isActive ?? true,
          vendorProfile: user.vendorProfile || {
            companyName: "",
            companyPhone: "",
            companyAddress: "",
            workingHours: "",
            status: "incomplete"
          }
        });
        
        setIsVendor(user.role === "vendore");
      } catch (err: any) {
        console.error("Error loading user", err);
        setError(err.response?.data?.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchUser();
  }, [id, BASE_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    
    if (name.startsWith("vendorProfile.")) {
      const fieldName = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        vendorProfile: {
          ...prev.vendorProfile,
          [fieldName]: type === "checkbox" ? (target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value
      }));
      
      if (name === "role") {
        setIsVendor(value === "vendore");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Prepare data to send
    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      isActive: formData.isActive,
      ...(isVendor ? { vendorProfile: formData.vendorProfile } : {})
    };

    try {
      const res = await axios.put(`${BASE_URL}/user/${id}`, submitData, { 
        withCredentials: true 
      });
      setSuccess(res.data.message || "User updated successfully!");
      setError(null);
      
      // Update local state with response
      if (res.data.user) {
        setFormData(prev => ({
          ...prev,
          vendorProfile: res.data.user.vendorProfile || prev.vendorProfile
        }));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong while updating the user.");
      setSuccess(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-black dark:text-white">Loading user...</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">Edit User</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <p className="text-green-600 dark:text-green-400">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="border-b border-gray-300 dark:border-gray-600 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-black dark:text-white">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black dark:text-white">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black dark:text-white">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black dark:text-white">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                required
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="vendore">Vendor</option>
                <option value="admin">Admin</option>
                <option value="specialNeedCustomer">Special Needs Customer</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2 h-5 w-5"
              id="isActive"
            />
            <label htmlFor="isActive" className="font-medium text-black dark:text-white">
              Active User Account
            </label>
          </div>
        </div>

        {/* Vendor Details - Only show if user is or becomes a vendor */}
        {isVendor && (
          <div className="border-b border-gray-300 dark:border-gray-600 pb-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Vendor Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-black dark:text-white">Company Name</label>
                <input
                  type="text"
                  name="vendorProfile.companyName"
                  value={formData.vendorProfile.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-black dark:text-white">Company Phone</label>
                <input
                  type="tel"
                  name="vendorProfile.companyPhone"
                  value={formData.vendorProfile.companyPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-black dark:text-white">Company Address</label>
                <textarea
                  name="vendorProfile.companyAddress"
                  value={formData.vendorProfile.companyAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-black dark:text-white">Working Hours</label>
                <input
                  type="text"
                  name="vendorProfile.workingHours"
                  value={formData.vendorProfile.workingHours}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                  placeholder="e.g., 9 AM - 6 PM"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-black dark:text-white">Status</label>
                <select
                  name="vendorProfile.status"
                  value={formData.vendorProfile.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/users")}
            className="px-6 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}