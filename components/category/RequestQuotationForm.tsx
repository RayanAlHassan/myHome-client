"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import axios from "axios";

type RequestQuotationFormProps = {
  subcategoryId: string;
  subcategoryTitle: string;
  vendors: { _id: string; email: string; companyName: string }[];
  disabled?: boolean; 

};

export function RequestQuotationForm({ subcategoryId, subcategoryTitle, vendors ,  disabled = false}: RequestQuotationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState(`Quotation Request for ${subcategoryTitle}`);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setLoading(true);
    setSuccess("");

    try {
      // Send quotation to all vendors
      await Promise.all(
        vendors.map((vendor) =>
          axios.post( `${process.env.NEXT_PUBLIC_API_URL}/Quotation`, {
            vendorId: vendor._id,
            subject,
            message,
          })
        )
      );

      setSuccess("Quotation request sent successfully!");
      setMessage("");
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      setSuccess("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
     <Button
  variant="secondary"
  onClick={() => setIsOpen(true)}
  disabled={disabled || vendors.length === 0} // ✅ check boolean
>
  Request Quotation for "{subcategoryTitle}"
</Button>


      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-background dark:bg-gray-900 rounded-lg max-w-md w-full p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Request Quotation</h2>
            <p className="text-sm text-muted-foreground mb-4">
              You are requesting a quotation for <strong>{subcategoryTitle}</strong>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-border rounded-lg p-2 text-sm bg-background dark:bg-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-border rounded-lg p-2 text-sm bg-background dark:bg-gray-800"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Quotation"}
              </Button>
              {success && <p className="text-sm mt-2 text-green-500">{success}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
