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
    role: "",
    isActive: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${id}`, { withCredentials: true });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          isActive: res.data.isActive,
        });
      } catch (err) {
        console.error("Error loading user", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.put(`${BASE_URL}/user/${id}`, formData, { withCredentials: true });
      setSuccess(res.data.message || "User updated successfully!");
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong while updating the user.");
      setSuccess(null);
    }
  };

  if (loading) return <p>Loading user...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">Edit User</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white appearance-none"
          >
            <option value="super-admin" className="bg-white dark:bg-black text-black dark:text-white">Super Admin</option>
            <option value="project-manager" className="bg-white dark:bg-black text-black dark:text-white">Project Manager</option>
            <option value="contributor" className="bg-white dark:bg-black text-black dark:text-white">Contributor</option>
          </select>
        </div>

     

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium text-black dark:text-white">Active</label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard/users")}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
