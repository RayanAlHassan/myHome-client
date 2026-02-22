"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    dimension: "",
    categoryId: "",
    subCategoryId: "",
    images: [] as File[],
    existingImages: [] as string[],
    imagesToDelete: [] as string[], // NEW: Track images to delete

    modelGlb: null as File | null,
    existingModelGlb: "" as string,
    removeModelGlb: false,
    
  });

  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ _id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ====== Fetch categories ======
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

  // ====== Fetch subcategories when category changes ======
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
  }, [formData.categoryId, BASE_URL]);

  // ====== Fetch existing product data ======
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${productId}`, { withCredentials: true });
        const p = res.data;
        
        setFormData({
          title: p.title || "",
          description: p.description || "",
          price: p.price ? p.price.toString() : "",
          dimension: p.dimension || "",
          categoryId: p.categoryId?._id || p.categoryId || "",
          subCategoryId: p.subCategoryId?._id || p.subCategoryId || "",
          images: [],
          existingImages: p.images || [],
          imagesToDelete: [],
        
          existingModelGlb: p.modelGlb || "",
          modelGlb: null,
          removeModelGlb: false,
        });

        // If there's a category, fetch its subcategories
        if (p.categoryId?._id || p.categoryId) {
          try {
            const subRes = await axios.get(
              `${BASE_URL}/subcategories?categoryId=${p.categoryId._id || p.categoryId}`,
              { withCredentials: true }
            );
            setSubCategories(subRes.data);
          } catch (err) {
            console.error("Error fetching subcategories for product", err);
          }
        }
      } catch (err) {
        console.error("Error fetching product", err);
        setError("Failed to fetch product data.");
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [BASE_URL, productId]);

  // ====== Handle input changes ======
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleGlbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.name.toLowerCase().endsWith(".glb")) {
      setError("Only .glb files are allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      modelGlb: file,
      removeModelGlb: false, // if user uploads new, don't remove
    }));
  };
  
  const removeExistingGlb = () => {
    setFormData((prev) => ({
      ...prev,
      removeModelGlb: true,
      modelGlb: null,
    }));
  };
  
  const undoRemoveGlb = () => {
    setFormData((prev) => ({
      ...prev,
      removeModelGlb: false,
    }));
  };
  // ====== Handle image file selection ======
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }));
    }
  };

  // ====== Remove existing image (mark for deletion) ======
  const removeExistingImage = (index: number) => {
    const imageToDelete = formData.existingImages[index];
    
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
      imagesToDelete: [...prev.imagesToDelete, imageToDelete]
    }));
  };

  // ====== Restore removed existing image ======
  const restoreImage = (imageName: string) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: [...prev.existingImages, imageName],
      imagesToDelete: prev.imagesToDelete.filter(img => img !== imageName)
    }));
  };

  // ====== Remove new image (not yet uploaded) ======
  const removeNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
      
      // Append basic fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("dimension", formData.dimension);
      data.append("categoryId", formData.categoryId);
      data.append("subCategoryId", formData.subCategoryId);
      // ✅ remove current model (if user asked)
if (formData.removeModelGlb) {
  data.append("removeModelGlb", "true");
}

// ✅ upload new model (optional)
if (formData.modelGlb) {
  data.append("modelGlb", formData.modelGlb); // field name must be modelGlb
}
      // Append images to delete (comma-separated string)
      if (formData.imagesToDelete.length > 0) {
        data.append("imagesToDelete", formData.imagesToDelete.join(","));
      }
      
      // Append each new image file
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      console.log("Submitting with:", {
        imagesToDelete: formData.imagesToDelete,
        newImagesCount: formData.images.length,
        existingImagesCount: formData.existingImages.length
      });

      const res = await axios.put(`${BASE_URL}/products/${productId}`, data, {
        withCredentials: true,
      });

      setSuccess("Product updated successfully!");
      
      // Update form with new data
      setFormData((prev) => ({
        ...prev,
        existingImages: res.data.product?.images || [],
        images: [],
        imagesToDelete: []
      }));
      
      // Optionally redirect after success
      setTimeout(() => {
        router.push("/dashboard/products");
      }, 2000);
      
    } catch (err: any) {
      console.error("Update error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong while updating the product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Edit Product
      </h1>

      {error && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>}
      {success && <p className="text-green-500 mb-4 p-2 bg-green-50 rounded">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-black dark:text-white">
            Product Title *
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
          <label className="block mb-2 font-medium text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block mb-2 font-medium text-black dark:text-white">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Dimension */}
          <div>
            <label className="block mb-2 font-medium text-black dark:text-white">
              Dimensions
            </label>
            <input
              type="text"
              name="dimension"
              value={formData.dimension}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
              placeholder="e.g., 10x10x10 cm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block mb-2 font-medium text-black dark:text-white">
              Category *
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

          {/* SubCategory */}
          <div>
            <label className="block mb-2 font-medium text-black dark:text-white">
              Subcategory *
            </label>
            <select
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((sc) => (
                <option key={sc._id} value={sc._id}>
                  {sc.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Images Section */}
        <div>
          <label className="block mb-2 font-medium text-black dark:text-white">
            Product Images
          </label>
          
          {/* Current Images with Remove Button */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3 text-black dark:text-white">
              Current Images ({formData.existingImages.length})
            </p>
            {formData.existingImages.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {formData.existingImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={`${BASE_URL}/uploads/images/${img}`}
                      alt={`Product ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg border-2 border-gray-300 hover:border-red-400 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      title="Remove this image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No current images</p>
            )}
          </div>

          {/* Images Marked for Deletion */}
          {formData.imagesToDelete.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-yellow-700 dark:text-yellow-300">
                  Images to be deleted: {formData.imagesToDelete.length}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // Restore all deleted images
                    setFormData(prev => ({
                      ...prev,
                      existingImages: [...prev.existingImages, ...prev.imagesToDelete],
                      imagesToDelete: []
                    }));
                  }}
                  className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded"
                >
                  Restore All
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.imagesToDelete.map((img, index) => (
                  <div key={`deleted-${index}`} className="relative group">
                    <img
                      src={`${BASE_URL}/uploads/images/${img}`}
                      alt={`To delete ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-lg border-2 border-yellow-300 opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => restoreImage(img)}
                      className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-green-600"
                      title="Restore this image"
                    >
                      ↺
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div className="mb-6">
            <label className="block mb-3 font-medium text-black dark:text-white">
              Add New Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white mb-4"
            />
            
            {/* Preview new images */}
            {formData.images.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 text-black dark:text-white">
                  New images to upload: {formData.images.length}
                </p>
                <div className="flex flex-wrap gap-3">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="h-24 w-24 object-cover rounded-lg border-2 border-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Remove this new image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Summary */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-2 text-black dark:text-white">Image Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Current images:</span>
              <span className="ml-2 font-medium">{formData.existingImages.length}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">To be deleted:</span>
              <span className="ml-2 font-medium text-red-600">{formData.imagesToDelete.length}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">New to upload:</span>
              <span className="ml-2 font-medium text-blue-600">{formData.images.length}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Total after update:</span>
              <span className="ml-2 font-medium text-green-600">
                {formData.existingImages.length + formData.images.length}
              </span>
            </div>
          </div>
        </div>
{/* GLB Section */}
<div className="mt-6">
  <label className="block mb-2 font-medium text-black dark:text-white">
    3D Model (GLB) (Optional)
  </label>

  {/* Current GLB */}
  {formData.existingModelGlb && !formData.removeModelGlb ? (
    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-4">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        Current GLB:
        <span className="ml-2 font-medium">{formData.existingModelGlb}</span>
      </p>

      {/* Link to file */}
      <a
        className="text-blue-600 underline text-sm"
        href={`${BASE_URL}/uploads/models/${formData.existingModelGlb}`}
        target="_blank"
        rel="noreferrer"
      >
        View / Download current model
      </a>

      <div className="mt-3">
        <button
          type="button"
          onClick={removeExistingGlb}
          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove current GLB
        </button>
      </div>
    </div>
  ) : null}

  {/* Removed message */}
  {formData.existingModelGlb && formData.removeModelGlb ? (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
      <p className="text-sm text-yellow-700 dark:text-yellow-300">
        This GLB will be deleted when you click "Update Product".
      </p>
      <button
        type="button"
        onClick={undoRemoveGlb}
        className="mt-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Undo
      </button>
    </div>
  ) : null}

  {/* Upload new GLB */}
  <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
      Upload a new <b>.glb</b> file to replace the current model (field name: <b>modelGlb</b>)
    </p>

    <input
      type="file"
      accept=".glb"
      onChange={handleGlbChange}
      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
    />

    {formData.modelGlb ? (
      <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
        Selected new GLB: <b>{formData.modelGlb.name}</b>
      </p>
    ) : (
      <p className="text-sm mt-2 text-gray-500 italic">
        No new GLB selected.
      </p>
    )}
  </div>
</div>
        {/* Buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
          <button
            type="button"
            onClick={() => router.push("/dashboard/products")}
            className="px-6 py-2 border border-gray-600 text-black dark:text-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}