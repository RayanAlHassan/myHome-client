"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AddProductPage() {
  const router = useRouter();
  const { user, loggedIn, requireAuth } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [modelGlb, setModelGlb] = useState<File | null>(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ======== CHECK AUTH ACCESS ========
  useEffect(() => {
    if (!requireAuth()) return; // redirects to signin if not logged in
    if (user && !["admin", "vendore"].includes(user.role)) {
      setError("You do not have permission to add a product.");
    }
  }, [user, loggedIn]);

  // ======== FETCH CATEGORIES ========
  useEffect(() => {
    if (!BASE_URL) return;
    axios
      .get(`${BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => setError("Error fetching categories"));
  }, [BASE_URL]);

  // ======== FETCH SUBCATEGORIES WHEN CATEGORY CHANGES ========
  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      return;
    }
    axios
      .get(`${BASE_URL}/subcategories/category/${categoryId}`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, [categoryId]);

  // ======== SUBMIT PRODUCT ========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!loggedIn || !user) {
      return setError("You must be logged in to add a product.");
    }

    if (!["admin", "vendore"].includes(user.role)) {
      return setError("You do not have permission to add a product.");
    }

    if (!title ||!description || !price || !categoryId || !subCategoryId) {
      return setError("Please fill all required fields.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    formData.append("price", price);
    formData.append("dimension", dimension);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId);

    // append multiple images
    if (images) {
      Array.from(images).forEach((img) => formData.append("images", img));
    }

    // append modelGlb (optional)
    if (modelGlb) {
      formData.append("modelGlb", modelGlb);
    }

    try {
      const res = await axios.post(`${BASE_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // sends cookies for authentication
      });

      setSuccess(res.data.message || "Product created successfully!");
      setTitle("");
      setDescription("");

      setPrice("");
      setDimension("");
      setCategoryId("");
      setSubCategoryId("");
      setImages(null);
      setModelGlb(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error creating product.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Add Product
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />
     <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />

        <input
          type="text"
          placeholder="Dimension"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>

        <select
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
          disabled={!subCategories.length}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        >
          <option value="">Select Subcategory</option>
          {subCategories.map((sub: any) => (
            <option key={sub._id} value={sub._id}>
              {sub.title}
            </option>
          ))}
        </select>

        {/* Multiple Images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          className="w-full text-black dark:text-white"
          required
        />

        {/* Optional 3D Model */}
        <input
          type="file"
          accept=".glb"
          onChange={(e) => setModelGlb(e.target.files?.[0] || null)}
          className="w-full text-black dark:text-white"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
