import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const LeaveRequestModal = ({ isOpen, onClose, onSave }) => {
    const getTodayDate = () => new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        type: "ANNUAL",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({ type: "ANNUAL", startDate: "", endDate: "", reason: "" });
            setErrors({});
        }
    }, [isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        if (!formData.endDate) newErrors.endDate = "End date is required";
        if (formData.startDate && formData.endDate) {
            if (new Date(formData.endDate) < new Date(formData.startDate)) {
                newErrors.endDate = "End date must be after start date";
            }
        }
        if (!formData.reason.trim()) {
            newErrors.reason = "Reason is required";
        } else if (formData.reason.length < 10) {
            newErrors.reason = "Minimum 10 characters required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fix the errors");
            return;
        }
        try {
            setLoading(true);
            await onSave(formData);
            toast.success("Leave request submitted!");
            onClose();
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white/95 dark:bg-[#121829]/95 backdrop-blur-xl rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] border border-white/20 dark:border-slate-700/50 overflow-hidden"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold dark:text-white">Request Leave</h2>
                                <p className="text-sm text-slate-500">Submit a request for approval</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            <div className="p-6 space-y-5 overflow-y-auto flex-1">
                                <div>
                                    <label className="text-sm font-medium dark:text-slate-300">Leave Type</label>
                                    <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1.5 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0f1c] shadow-inner dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="ANNUAL">Annual</option>
                                        <option value="CASUAL">Casual</option>
                                        <option value="SICK">Sick</option>
                                    </select>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium dark:text-slate-300">Start Date</label>
                                        <input type="date" name="startDate" min={getTodayDate()} value={formData.startDate} onChange={handleChange} className="w-full mt-1.5 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0f1c] shadow-inner dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:light] dark:[color-scheme:dark]" />
                                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium dark:text-slate-300">End Date</label>
                                        <input type="date" name="endDate" min={formData.startDate || getTodayDate()} value={formData.endDate} onChange={handleChange} className="w-full mt-1.5 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0f1c] shadow-inner dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:light] dark:[color-scheme:dark]" />
                                        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium dark:text-slate-300">Reason</label>
                                    <textarea name="reason" rows="4" value={formData.reason} onChange={handleChange} className="w-full mt-1.5 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0f1c] shadow-inner dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Explain your reason..." />
                                    {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                                </div>
                            </div>

                            <div className="p-6 flex justify-end gap-3 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-[#0a0f1c]/50">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className={`px-6 py-2.5 rounded-lg text-white flex items-center gap-2 transition-all shadow-lg ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-[#4f46e5] hover:bg-[#4338ca] hover:shadow-indigo-500/30 active:scale-95"}`}>
                                    {loading ? "Submitting..." : <> <Send size={16} /> Submit Request</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LeaveRequestModal;