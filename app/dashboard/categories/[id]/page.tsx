"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories/${id}`, { withCredentials: true });
        setTitle(res.data.category.title);
        setPreview(res.data.category.image ? `${BASE_URL}/uploads/images/${res.data.category.image}` : null);
      } catch (err) {
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id, BASE_URL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setRemoveImage(false); // cancel removal if new image selected
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setRemoveImage(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("title", title);
      if (image) data.append("image", image);
      if (removeImage) data.append("removeImage", "true");

      await axios.put(`${BASE_URL}/categories/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Category updated successfully!");
      setTimeout(() => router.push("/dashboard/categories"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading category...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        disabled={saving}
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">Edit Category</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-black dark:text-white">Image</label>

          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Category Preview"
                className="w-full h-40 object-cover rounded mb-2 border border-gray-300 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ) : (
            <p className="text-gray-500 italic mb-2">No image uploaded</p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard/categories")}
            className="px-4 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
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
