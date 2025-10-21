"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditSubCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

 
  
  // ✅ Fetch SubCategory by ID
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/subcategories/${id}`, {
          withCredentials: true,
        });

        setFormData({
          title: res.data.title,
          categoryId: res.data.categoryId?._id || "",
        });

        // ✅ Show existing image if available
        if (res.data.image) {
          setPreview(`${BASE_URL}/${res.data.image}`);
        } else {
          setPreview(null);
        }
      } catch (err) {
        setError("Failed to load subcategory. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSubCategory();
  }, [id, BASE_URL]);

  // ✅ Fetch all categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`, {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  // ✅ Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // ✅ Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setRemoveImage(false); // user picked a new image, no need to remove
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("categoryId", formData.categoryId);
      if (image) data.append("image", image);
      if (removeImage) data.append("removeImage", "true"); // <-- tell backend to delete image
      
      await axios.put(`${BASE_URL}/subcategories/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setSuccess("✅ Subcategory updated successfully!");
      setTimeout(() => router.push("/dashboard/subcategories"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while updating the subcategory."
      );
    } finally {
      setSaving(false);
    }
  };

  // ✅ Loading state
  if (loading) return <p className="text-center mt-10">Loading subcategory...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        disabled={saving}
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Edit Subcategory
      </h1>

      {/* ✅ Feedback */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* ✅ Form */}
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
            required
          />
        </div>

        {/* Category Dropdown */}
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
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Image Section */}
        <div>
  <label className="block mb-1 font-medium text-black dark:text-white">
    Subcategory Image
  </label>

  {preview && !removeImage ? (
    <div className="relative mb-2">
      <img
        src={preview}
        alt="Subcategory Preview"
        className="w-full h-40 object-cover rounded border border-gray-300 dark:border-gray-600"
      />
      <button
        type="button"
        onClick={() => {
          setPreview(null);
          setImage(null);
          setRemoveImage(true);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  ) : (
    <p className="text-gray-500 italic mb-2">No image was uploaded</p>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="text-black dark:text-white"
  />
</div>


        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard/subcategories")}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition ${
              saving ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
