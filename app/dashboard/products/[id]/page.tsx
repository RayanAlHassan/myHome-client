"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // assuming the route is like /dashboard/products/[id]/edit
  const productId = params.id;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    dimension: "",
    categoryId: "",
    subCategoryId: "",
    subServiceId: "",
    image: null as File | null,
    existingImage: "",
  });

  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ _id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ====== Fetch categories and subcategories ======
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

  useEffect(() => {
    if (formData.categoryId) {
      const fetchSubCategories = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/subcategories?categoryId=${formData.categoryId}`, { withCredentials: true });
          setSubCategories(res.data);
        } catch (err) {
          console.error("Error fetching subcategories", err);
        }
      };
      fetchSubCategories();
    }
  }, [formData.categoryId]);

  // ====== Fetch existing product data ======
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${productId}`, { withCredentials: true });
        const p = res.data;
        setFormData({
          title: p.title,
          description: p.description || "",
          price: p.price.toString(),
          dimension: p.dimension || "",
          categoryId: p.categoryId?._id || "",
          subCategoryId: p.subCategoryId?._id || "",
          subServiceId: p.subServiceId?._id || "",
          image: null,
          existingImage: p.image || "",
        });
      } catch (err) {
        console.error("Error fetching product", err);
        setError("Failed to fetch product data.");
      }
    };
    fetchProduct();
  }, [BASE_URL, productId]);

  // ====== Handle input changes ======
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
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

    if (!formData.title || !formData.price) {
      setError("Title and Price are required.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("dimension", formData.dimension);
      if (formData.subCategoryId) data.append("subCategoryId", formData.subCategoryId);
      if (formData.subServiceId) data.append("subServiceId", formData.subServiceId);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.put(`${BASE_URL}/products/${productId}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Product updated successfully!");
      setFormData((prev) => ({ ...prev, existingImage: res.data.image, image: null }));
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong while updating the product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Edit Product
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Product Title
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

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            required
          />
        </div>

        {/* Dimension */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Dimensions
          </label>
          <input
            type="text"
            name="dimension"
            value={formData.dimension}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Subcategory
          </label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          >
            <option value="">Select a subcategory</option>
            {subCategories.map((sc) => (
              <option key={sc._id} value={sc._id}>
                {sc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">
            Image
          </label>
          {formData.existingImage && (
            <img
              src={`${BASE_URL}/uploads/images/${formData.existingImage}`}
              alt="Existing"
              className="h-20 w-20 object-cover rounded mb-2"
            />
          )}
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
            onClick={() => router.push("/dashboard/products")}
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
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
