"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

type RequestQuotationFormProps = {
  subcategoryId: string;
  subcategoryTitle: string;
  vendors: { _id: string; email?: string; companyName: string }[];
  disabled?: boolean;
};

export function RequestQuotationForm({
  subcategoryId,
  subcategoryTitle,
  vendors,
  disabled = false,
}: RequestQuotationFormProps) {
  const { user, loading: authLoading } = useAuth();

  // Log the data coming from useAuth
  useEffect(() => {
    console.log("Auth data:", { user, authLoading });
  }, [user, authLoading]);
  useEffect(() => {
    if (user) {
      console.log("Logged-in user info:", {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        vendorProfile: user.vendorProfile,
      });
    } else {
      console.log("User not logged in yet or still loading...");
    }
  }, [user]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState(
    `Quotation Request for ${subcategoryTitle}`
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const isButtonDisabled = disabled || vendors.length === 0 || authLoading || !user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!subject || !message || !user) {
      console.log("Form validation failed. Missing fields:");
      if (!subject) console.log(" - subject is missing");
      if (!message) console.log(" - message is missing");
      if (!user) console.log(" - user is not loaded yet");
      return;
    }
  
    if (!vendors || vendors.length === 0) {
      console.error("No vendors available for this subcategory.");
      return;
    }
  
    setLoading(true);
    setSuccess("");
  
    try {
      // Build payload with all vendor IDs
      const payload = {
        vendorIds: vendors.map((v) => v._id), // array of vendor IDs
        subject,
        message,
        subcategoryId,
      };
  
      console.log("Sending payload to backend:", payload);
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Quotation`,
        payload,
        { withCredentials: true }
      );
  
      setSuccess(res.data.message || "Quotation request sent successfully!");
      setMessage("");
      setIsOpen(false);
    } catch (error: any) {
      console.error("Axios error:", error.response?.data || error.message || error);
      setSuccess(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (isOpen) {
      setSubject(`Quotation Request for ${subcategoryTitle}`);
      setMessage("");
    }
  }, [isOpen, subcategoryTitle]);

  return (
    <div className="mb-6">
      <Button
        variant="default"
        onClick={() => setIsOpen(true)}
        disabled={isButtonDisabled}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2 shadow-md transition-all"
      >
        Request Quotation for "{subcategoryTitle || 'Subcategory'}"
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-3 text-orange-600">
              Request Quotation
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              You are requesting a quotation for{" "}
              <strong>{subcategoryTitle}</strong> from{" "}
              <span className="text-orange-600 font-medium">{vendors.length}</span>{" "}
              vendor(s).
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading || authLoading || !user}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition-all"
              >
                {loading ? "Sending..." : "Send Quotation"}
              </Button>
              {success && (
                <p className="text-sm mt-2 text-green-600 text-center">{success}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
