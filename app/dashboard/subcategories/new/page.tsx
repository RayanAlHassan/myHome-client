"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddSubCategoryPage() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    image: null as File | null,
  });

  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ====== Fetch all categories for dropdown ======
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`, { withCredentials: true });
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  // ====== Handle input changes ======
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "image") {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0]; // optional chaining, file will be undefined if null
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
      }
      return;
    }
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  
  

  // ====== Handle form submission ======
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.categoryId) {
      setError("Title and parent category are required.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("categoryId", formData.categoryId);
      if (formData.image) data.append("image", formData.image);

      await axios.post(`${BASE_URL}/subcategories`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Subcategory created successfully!");
      setFormData({ title: "", categoryId: "", image: null });
         // redirect after 2 seconds
         setTimeout(() => {
          router.push("/dashboard/subcategories");
        }, 2000);
    
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating the subcategory."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Add New Subcategory
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Subcategory Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            placeholder="Enter subcategory title"
            required
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Parent Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Image (optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard/subcategories")}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Subcategory"}
          </button>
        </div>
      </form>
    </div>
  );
}