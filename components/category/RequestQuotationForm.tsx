
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { X, CheckCircle, Mail, Building, AlertCircle } from "lucide-react";
// import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";

// type RequestQuotationFormProps = {
//   subcategoryId: string;
//   subcategoryTitle: string;
//   vendors: { _id: string; email?: string; companyName: string }[];
//   disabled?: boolean;
//   onQuotationSent?: () => void;
// };

// type SuccessData = {
//   success: boolean;
//   message: string;
//   count: {
//     total: number;
//     successful: number;
//     failed: number;
//   };
//   vendors: {
//     successful: Array<{ id: string; companyName: string; email: string }>;
//     failed: Array<{ id: string; companyName: string; email: string }>;
//   };
//   emailStats: {
//     sent: number;
//     failed: number;
//     errors: Array<{ vendor: string; company: string; error: string }>;
//   };
//   nextSteps: string[];
//   quotations: Array<any>;
//   note?: string;
// };

// export function RequestQuotationForm({
//   subcategoryId,
//   subcategoryTitle,
//   vendors,
//   disabled = false,
//   onQuotationSent,
// }: RequestQuotationFormProps) {
//   const { user, loading: authLoading } = useAuth();
  
//   const [isOpen, setIsOpen] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [subject, setSubject] = useState(`Quotation Request for ${subcategoryTitle}`);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successData, setSuccessData] = useState<SuccessData | null>(null);
//   const [error, setError] = useState("");

//   const isButtonDisabled = disabled || vendors.length === 0 || authLoading || !user;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccessData(null);
  
//     if (!subject || !message || !user) {
//       setError("Please fill in all required fields.");
//       return;
//     }
  
//     if (!vendors || vendors.length === 0) {
//       setError("No vendors available for this subcategory.");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const payload = {
//         vendorIds: vendors.map((v) => v._id),
//         subject,
//         message,
//         subcategoryId,
//       };
  
//       console.log("Sending payload to backend:", payload);
//       console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}/Quotation`);
//       console.log("User session details:", user);
  
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/Quotation`,
//         payload,
//         { 
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );
  
//       console.log("Response from backend:", res.data);
//       setSuccessData(res.data);
//       setMessage("");
//       setShowSuccess(true);
      
//       // CALL THE CALLBACK HERE
//       if (onQuotationSent) {
//         onQuotationSent();
//       }
//     } catch (error: any) {
//       console.error("Full Axios error object:", error);
//       console.error("Axios error.response:", error.response);
//       console.error("Axios error.request:", error.request);
//       console.error("Axios error.message:", error.message);
//       console.error("Axios error.config:", error.config);
      
//       // More detailed error handling
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("Error data:", error.response.data);
//         console.error("Error status:", error.response.status);
//         console.error("Error headers:", error.response.headers);
        
//         const errorMessage = error.response.data?.message || 
//           `Server error: ${error.response.status} ${error.response.statusText}`;
        
//         // If the error contains email failure details, show them
//         if (error.response.data?.emailStats?.errors) {
//           const failedCount = error.response.data.emailStats.failed || 0;
//           const successCount = error.response.data.emailStats.sent || 0;
          
//           if (successCount > 0) {
//             // Partial success - some emails sent
//             setSuccessData({
//               success: true,
//               message: `Partially sent: ${successCount} email(s) sent, ${failedCount} failed`,
//               count: {
//                 total: vendors.length,
//                 successful: successCount,
//                 failed: failedCount
//               },
//               vendors: {
//                 successful: error.response.data.vendors?.successful || [],
//                 failed: error.response.data.vendors?.failed || []
//               },
//               emailStats: error.response.data.emailStats,
//               nextSteps: error.response.data.nextSteps || [
//                 `${successCount} vendor(s) have been notified via email`,
//                 `${failedCount} vendor(s) could not be reached via email`,
//                 "Vendors can view quotations in their dashboard"
//               ],
//               quotations: error.response.data.quotations || [],
//               note: error.response.data.note
//             });
//             setShowSuccess(true);
//             if (onQuotationSent) onQuotationSent();
//           } else {
//             // Complete failure
//             setError(errorMessage);
//           }
//         } else {
//           // Regular error
//           setError(errorMessage);
//         }
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received:", error.request);
//         setError("No response from server. Please check your network connection.");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error message:", error.message);
//         setError(error.message || "Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       setSubject(`Quotation Request for ${subcategoryTitle}`);
//       setMessage("");
//       setError("");
//       setSuccessData(null);
//       setShowSuccess(false);
//     }
//   }, [isOpen, subcategoryTitle]);

//   return (
//     <div className="mb-6">
//       <Button
//         variant="default"
//         onClick={() => setIsOpen(true)}
//         disabled={isButtonDisabled}
//         className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2 shadow-md transition-all"
//       >
//         Request Quotation for "{subcategoryTitle || 'Subcategory'}"
//       </Button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative shadow-xl">
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
//               onClick={() => setIsOpen(false)}
//             >
//               <X className="w-5 h-5" />
//             </button>
            
//             {!showSuccess ? (
//               <>
//                 <h2 className="text-xl font-semibold mb-3 text-orange-600">
//                   Request Quotation
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-4">
//                   You are requesting a quotation for{" "}
//                   <strong className="text-orange-600">{subcategoryTitle}</strong> from{" "}
//                   <span className="text-orange-600 font-bold">{vendors.length}</span>{" "}
//                   vendor(s).
//                 </p>
                
//                 {error && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//                     <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
//                     <p className="text-sm text-red-600">{error}</p>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Subject
//                     </label>
//                     <input
//                       type="text"
//                       value={subject}
//                       onChange={(e) => setSubject(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Message
//                     </label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
//                       required
//                       placeholder="Describe your requirements in detail..."
//                     />
//                   </div>
                  
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-2">
//                       This quotation will be sent to:
//                     </p>
//                     <ul className="text-sm space-y-1">
//                       {vendors.map((vendor) => (
//                         <li key={vendor._id} className="flex items-center gap-2">
//                           <Building className="w-4 h-4 text-orange-500" />
//                           <span>{vendor.companyName}</span>
//                           {vendor.email && (
//                             <span className="text-gray-500 text-xs">({vendor.email})</span>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <Button
//                     type="submit"
//                     disabled={loading || authLoading || !user}
//                     className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition-all"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
//                         Sending...
//                       </span>
//                     ) : (
//                       `Send to ${vendors.length} Vendor${vendors.length > 1 ? 's' : ''}`
//                     )}
//                   </Button>
//                 </form>
//               </>
//             ) : (
//               // Enhanced Success View
//               <div className="text-center">
//                 <div className="mb-4 flex justify-center">
//                   {successData?.success ? (
//                     <CheckCircle className="w-16 h-16 text-green-500" />
//                   ) : (
//                     <AlertCircle className="w-16 h-16 text-yellow-500" />
//                   )}
//                 </div>
                
//                 <h2 className={`text-xl font-semibold mb-3 ${successData?.success ? 'text-green-600' : 'text-yellow-600'}`}>
//                   {successData?.success ? 'Quotation Sent Successfully!' : 'Quotation Partially Sent'}
//                 </h2>
                
//                 {successData && (
//                   <>
//                     {/* Summary Card */}
//                     <div className={`mb-6 p-4 rounded-lg ${successData.success ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
//                       <p className={`font-medium mb-3 ${successData.success ? 'text-green-700' : 'text-yellow-700'}`}>
//                         {successData.message}
//                       </p>
                      
//                       {/* Statistics */}
//                       <div className="grid grid-cols-3 gap-3 mb-3">
//                         <div className="text-center p-2 bg-white rounded border">
//                           <p className="text-2xl font-bold text-gray-800">{successData.count.total}</p>
//                           <p className="text-xs text-gray-600">Total Vendors</p>
//                         </div>
//                         <div className="text-center p-2 bg-white rounded border border-green-200">
//                           <p className="text-2xl font-bold text-green-600">{successData.count.successful}</p>
//                           <p className="text-xs text-green-600">Emails Sent</p>
//                         </div>
//                         <div className="text-center p-2 bg-white rounded border border-red-200">
//                           <p className="text-2xl font-bold text-red-600">{successData.count.failed}</p>
//                           <p className="text-xs text-red-600">Emails Failed</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Successful Vendors */}
//                     {successData.vendors.successful.length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="font-medium text-gray-700 mb-2 text-left flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4 text-green-500" />
//                           Successfully Notified:
//                         </h3>
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                           <div className="space-y-2 max-h-32 overflow-y-auto">
//                             {successData.vendors.successful.map((vendor, index) => (
//                               <div key={vendor.id || index} className="flex items-center justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//                                   <Mail className="w-3 h-3 text-green-500" />
//                                   <span className="font-medium truncate">{vendor.companyName}</span>
//                                 </div>
//                                 <span className="text-gray-500 text-xs truncate ml-2">{vendor.email}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Failed Vendors */}
//                     {successData.vendors.failed.length > 0 && (
//                       <div className="mb-4">
//                         <h3 className="font-medium text-gray-700 mb-2 text-left flex items-center gap-2">
//                           <AlertCircle className="w-4 h-4 text-red-500" />
//                           Could Not Reach:
//                         </h3>
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                           <div className="space-y-2 max-h-32 overflow-y-auto">
//                             {successData.vendors.failed.map((vendor, index) => (
//                               <div key={vendor.id || index} className="flex items-center justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//                                   <X className="w-3 h-3 text-red-500" />
//                                   <span className="font-medium truncate">{vendor.companyName}</span>
//                                 </div>
//                                 <span className="text-gray-500 text-xs truncate ml-2">{vendor.email}</span>
//                               </div>
//                             ))}
//                           </div>
//                           {successData.note && (
//                             <p className="text-xs text-red-600 mt-2">{successData.note}</p>
//                           )}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Error Details */}
//                     {successData.emailStats.errors && successData.emailStats.errors.length > 0 && (
//                       <div className="mb-4">
//                         <details className="text-left">
//                           <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
//                             View error details
//                           </summary>
//                           <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
//                             {successData.emailStats.errors.map((error, index) => (
//                               <div key={index} className="mb-1">
//                                 <span className="font-medium">{error.company}:</span>{" "}
//                                 <span className="text-red-600">{error.error}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </details>
//                       </div>
//                     )}
                    
//                     {/* Next Steps */}
//                     <div className="mb-6">
//                       <h3 className="font-medium text-gray-700 mb-2">
//                         What happens next:
//                       </h3>
//                       <ul className="text-sm text-gray-600 space-y-2">
//                         {successData.nextSteps.map((step, index) => (
//                           <li key={index} className="flex items-start gap-2">
//                             <span className="text-orange-500 mt-1">•</span>
//                             <span className="text-left">{step}</span>
//                           </li>
//                         ))}
//                         <li className="flex items-start gap-2">
//                           <span className="text-orange-500 mt-1">•</span>
//                           <span className="text-left">Check your dashboard to track all quotations</span>
//                         </li>
//                       </ul>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     <div className="space-y-3">
//                       <Button
//                         onClick={() => setIsOpen(false)}
//                         className={`w-full ${successData.success ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
//                       >
//                         {successData.success ? 'Close' : 'Return to Products'}
//                       </Button>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           setShowSuccess(false);
//                           setSuccessData(null);
//                           setMessage("");
//                         }}
//                         className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
//                       >
//                         Send Another Quotation
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Building, AlertCircle } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

type RequestQuotationFormProps = {
  subcategoryId: string;
  subcategoryTitle: string;
  vendors: { _id: string; email?: string; companyName: string }[];
  disabled?: boolean;
  onQuotationSent?: () => void;
};

export function RequestQuotationForm({
  subcategoryId,
  subcategoryTitle,
  vendors,
  disabled = false,
  onQuotationSent,
}: RequestQuotationFormProps) {
  const { user, loading: authLoading } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [subject, setSubject] = useState(`Quotation Request for ${subcategoryTitle}`);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailStats, setEmailStats] = useState({
    sent: 0,
    failed: 0,
    total: 0
  });

  const isButtonDisabled = disabled || vendors.length === 0 || authLoading || !user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        vendorIds: vendors.map((v) => v._id),
        subject,
        message,
        subcategoryId,
      };

      console.log("Sending quotation...", payload);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Quotation`,
        payload,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log("Server response:", res.data);
      
      // Update email stats
      const sent = res.data.emailStats?.sent || 0;
      const failed = res.data.emailStats?.failed || 0;
      
      setEmailStats({
        sent,
        failed,
        total: vendors.length
      });
      
      // CLOSE THE FORM MODAL
      setIsFormOpen(false);
      
      // OPEN THE SUCCESS MODAL (separate modal)
      setIsSuccessOpen(true);
      
      // Call the callback
      if (onQuotationSent) {
        onQuotationSent();
      }
// In handleSubmit function, add logging:
console.log("Form submitted successfully, opening success modal");
console.log("Email stats:", res.data.emailStats);
console.log("Setting isSuccessOpen to true");
    } catch (error: any) {
      console.error("Error:", error);
      
      // Show error in form
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to send quotation. Please try again.");
      }
      
      // Don't close the form on error
    } finally {
      setLoading(false);
    }
  };

  // Reset form when opening
  useEffect(() => {
    if (isFormOpen) {
      setSubject(`Quotation Request for ${subcategoryTitle}`);
      setMessage("");
      setError("");
    }
  }, [isFormOpen, subcategoryTitle]);

  return (
    <div className="mb-6">
      {/* Main Button */}
      <Button
        variant="default"
        onClick={() => setIsFormOpen(true)}
        disabled={isButtonDisabled}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2 shadow-md transition-all"
      >
        Request Quotation for "{subcategoryTitle || 'Subcategory'}"
      </Button>

      {/* FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setIsFormOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold mb-3 text-orange-600">
              Request Quotation
            </h2>
            
            <p className="text-sm text-gray-500 mb-4">
              You are requesting a quotation for{" "}
              <strong className="text-orange-600">{subcategoryTitle}</strong> from{" "}
              <span className="text-orange-600 font-bold">{vendors.length}</span>{" "}
              vendor(s).
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

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
                  placeholder="Describe your requirements in detail..."
                />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  This quotation will be sent to:
                </p>
                <ul className="text-sm space-y-1">
                       {vendors.map((vendor) => (
                         <li key={vendor._id} className="flex items-center gap-2">
                           <Building className="w-4 h-4 text-orange-500" />
                           <span>{vendor.companyName}</span>
                           {vendor.email && (
                             <span className="text-gray-500 text-xs">({vendor.email})</span>
                           )}
                         </li>
                       ))}
                    </ul>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Sending...
                  </span>
                ) : (
                  `Send to ${vendors.length} Vendor${vendors.length > 1 ? 's' : ''}`
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL - SEPARATE FROM FORM MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"     style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setIsSuccessOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                {emailStats.sent > 0 ? (
                  <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
                ) : (
                  <AlertCircle className="w-20 h-20 text-red-500" />
                )}
              </div>
              
              <h2 className={`text-2xl font-bold mb-4 ${emailStats.sent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {emailStats.sent > 0 ? 'Success!' : 'Failed'}
              </h2>
              
              <div className={`mb-6 p-5 rounded-xl ${emailStats.sent > 0 ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                <p className={`text-lg font-semibold mb-3 ${emailStats.sent > 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {emailStats.sent > 0 
                    ? `✅ Quotation sent to ${emailStats.sent} vendor(s)`
                    : `❌ Failed to send quotation`
                  }
                </p>
                
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${emailStats.sent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {emailStats.sent > 0 ? emailStats.sent : emailStats.failed}
                    </div>
                    <div className="text-sm text-gray-600">
                      {emailStats.sent > 0 ? 'Sent' : 'Failed'}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{vendors.length}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next:</h3>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Quotation has been saved to the database</span>
                  </li>
                  {emailStats.sent > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Vendors have been notified via email</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Vendors will contact you soon</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Check your dashboard to track quotations</span>
                  </li> */}
                </ul>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSuccessOpen(false)}
                  className={`w-full ${emailStats.sent > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white text-lg py-3`}
                >
                  {emailStats.sent > 0 ? 'Great! Close' : 'Okay, Close'}
                </Button>
                
                {emailStats.sent > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSuccessOpen(false);
                      setIsFormOpen(true);
                      setMessage("");
                    }}
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Send Another Quotation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}