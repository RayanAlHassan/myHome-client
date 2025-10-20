"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // ====== State ======
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [isActive, setIsActive] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ====== Form Submit ======
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!BASE_URL) {
      setError("API URL is not defined. Please check NEXT_PUBLIC_API_URL.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/user/register`,
        { name, email, password, role, isActive },
        { withCredentials: true }
      );

      setSuccess(res.data?.message || "User created successfully.");
      setError(null);

      // Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("admin");
      setIsActive(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Error creating user."
      );
      setSuccess(null);
      console.error("Create User Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow border border-gray-300 dark:border-gray-600">
      {/* 🔙 Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 px-3 py-2 border border-gray-600 text-black dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Add New User
      </h1>

      {/* Alerts */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* ====== User Form ====== */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-black text-black dark:text-white appearance-none"
          required
        >
          <option value="admin" className="bg-white dark:bg-black text-black dark:text-white">
             Admin
          </option>
          <option value="customer" className="bg-white dark:bg-black text-black dark:text-white">
            customer
          </option>
          <option value="vendore" className="bg-white dark:bg-black text-black dark:text-white">
          vendore
          </option>
          <option value="specialNeedCustomer" className="bg-white dark:bg-black text-black dark:text-white">
          special Need Customer
          </option>
        </select>

   

        <label className="flex items-center gap-2 text-black dark:text-white">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          Active
        </label>

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
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
