// import React, { useState, useEffect } from "react";
// import { X, Send } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const LeaveRequestModal = ({ isOpen, onClose, onSave }) => {
//     const getTodayDate = () => new Date().toISOString().split("T")[0];

//     const [formData, setFormData] = useState({
//         type: "ANNUAL",
//         startDate: "",
//         endDate: "",
//         reason: ""
//     });

//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (isOpen) {
//             setFormData({
//                 type: "ANNUAL",
//                 startDate: "",
//                 endDate: "",
//                 reason: ""
//             });
//             setErrors({});
//         }
//     }, [isOpen]);

//     const validate = () => {
//         const newErrors = {};

//         if (!formData.startDate) newErrors.startDate = "Start date is required";
//         if (!formData.endDate) newErrors.endDate = "End date is required";

//         if (formData.startDate && formData.endDate) {
//             if (new Date(formData.endDate) < new Date(formData.startDate)) {
//                 newErrors.endDate = "End date must be after start date";
//             }
//         }

//         if (!formData.reason.trim()) {
//             newErrors.reason = "Reason is required";
//         } else if (formData.reason.length < 10) {
//             newErrors.reason = "Minimum 10 characters required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         setErrors((prev) => ({ ...prev, [name]: "" }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validate()) {
//             toast.error("Please fix the errors");
//             return;
//         }

//         try {
//             setLoading(true);
//             await onSave(formData);
//             toast.success("Leave request submitted!");
//             onClose();
//         } catch (err) {
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         initial={{ y: 50, opacity: 0, scale: 0.95 }}
//                         animate={{ y: 0, opacity: 1, scale: 1 }}
//                         exit={{ y: 30, opacity: 0, scale: 0.95 }}
//                         transition={{ duration: 0.25 }}
//                         className="bg-white/95 dark:bg-[#121829]/95 backdrop-blur-xl rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] border border-white/20 dark:border-slate-700/50 overflow-hidden"
//                     >
//                         {/* Header */}
//                         <div className="p-6 flex justify-between items-center border-b">
//                             <div>
//                                 <h2 className="text-xl font-bold">Request Leave</h2>
//                                 <p className="text-sm text-slate-500">
//                                     Submit a request for approval
//                                 </p>
//                             </div>

//                             <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
//                                 <X size={20} />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="flex flex-col flex-1">
//                             <div className="p-6 space-y-5 overflow-y-auto flex-1">
                                
//                                 {/* Leave Type */}
//                                 <div>
//                                     <label className="text-sm font-medium">Leave Type</label>
//                                     <select
//                                         name="type"
//                                         value={formData.type}
//                                         onChange={handleChange}
//                                         className="w-full mt-1 px-4 py-3 rounded-lg border"
//                                     >
//                                         <option value="ANNUAL">Annual</option>
//                                         <option value="CASUAL">Casual</option>
//                                         <option value="SICK">Sick</option>
//                                     </select>
//                                 </div>

//                                 {/* Dates */}
//                                 <div className="grid md:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm font-medium">Start Date</label>
//                                         <input
//                                             type="date"
//                                             name="startDate"
//                                             min={getTodayDate()}
//                                             value={formData.startDate}
//                                             onChange={handleChange}
//                                             className="w-full mt-1 px-4 py-3 rounded-lg border"
//                                         />
//                                         {errors.startDate && (
//                                             <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <label className="text-sm font-medium">End Date</label>
//                                         <input
//                                             type="date"
//                                             name="endDate"
//                                             min={formData.startDate || getTodayDate()}
//                                             value={formData.endDate}
//                                             onChange={handleChange}
//                                             className="w-full mt-1 px-4 py-3 rounded-lg border"
//                                         />
//                                         {errors.endDate && (
//                                             <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Reason */}
//                                 <div>
//                                     <label className="text-sm font-medium">Reason</label>
//                                     <textarea
//                                         name="reason"
//                                         rows="4"
//                                         value={formData.reason}
//                                         onChange={handleChange}
//                                         className="w-full mt-1 px-4 py-3 rounded-lg border resize-none"
//                                         placeholder="Explain your reason..."
//                                     />
//                                     {errors.reason && (
//                                         <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Footer */}
//                             <div className="p-6 flex justify-end gap-3 border-t">
//                                 <button
//                                     type="button"
//                                     onClick={onClose}
//                                     className="px-5 py-2 rounded-lg bg-gray-200"
//                                 >
//                                     Cancel
//                                 </button>

//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className={`px-5 py-2 rounded-lg text-white flex items-center gap-2 ${
//                                         loading
//                                             ? "bg-indigo-300 cursor-not-allowed"
//                                             : "bg-indigo-600 hover:bg-indigo-700"
//                                     }`}
//                                 >
//                                     {loading ? "Submitting..." : <> <Send size={16} /> Submit</>}
//                                 </button>
//                             </div>
//                         </form>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default LeaveRequestModal;