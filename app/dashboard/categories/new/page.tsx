"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddCategoryPage() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ====== Handle input changes ======
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ====== Handle form submission ======
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title) {
      setError("Title is required.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.post(`${BASE_URL}/categories`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Category created successfully!");
      setFormData({ title: "", image: null });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating the category."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // ====== UI ======
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
        Add New Category
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            placeholder="Enter category title"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard/categories")}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
