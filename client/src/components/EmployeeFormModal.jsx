// // // import React, { useState, useEffect } from "react";
// // // import { X, Save } from "lucide-react";
// // // import { DEPARTMENTS } from "../assets/assets";

// // // const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSave }) => {
    
// // //     // Helper to get today's date in YYYY-MM-DD format
// // //     const getTodayDate = () => new Date().toISOString().split('T')[0];

// // //     // Helper to generate a random 5-digit Employee ID
// // //     const generateRandomId = () => `EMP-${Math.floor(10000 + Math.random() * 90000)}`;

// // //     const [formData, setFormData] = useState({
// // //         employeeId: "",
// // //         firstName: "",
// // //         lastName: "",
// // //         phone: "",
// // //         joinDate: getTodayDate(), // Defaults to today!
// // //         bio: "",
// // //         email: "",
// // //         department: DEPARTMENTS[0],
// // //         position: "",
// // //         employmentStatus: "ACTIVE"
// // //     });

// // //     useEffect(() => {
// // //         if (employeeData) {
// // //             // EDIT MODE: Populate with existing data
// // //             setFormData({
// // //                 ...employeeData,
// // //                 joinDate: employeeData.joinDate || getTodayDate(),
// // //                 phone: employeeData.phone || "",
// // //                 // If they don't have a specific employeeId field, derive it from their MongoDB _id
// // //                 employeeId: employeeData.employeeId || (employeeData._id ? `EMP-${employeeData._id.slice(-5).toUpperCase()}` : generateRandomId())
// // //             });
// // //         } else {
// // //             // ADD MODE: Reset form, auto-generate ID, and set date to today
// // //             setFormData({
// // //                 employeeId: generateRandomId(),
// // //                 firstName: "", 
// // //                 lastName: "", 
// // //                 phone: "", 
// // //                 joinDate: getTodayDate(), 
// // //                 bio: "",
// // //                 email: "", 
// // //                 department: DEPARTMENTS[0], 
// // //                 position: "", 
// // //                 employmentStatus: "ACTIVE"
// // //             });
// // //         }
// // //     }, [employeeData, isOpen]);

// // //     if (!isOpen) return null;

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = (e) => {
// // //         e.preventDefault();
// // //         onSave(formData);
// // //     };

// // //     const isEditing = !!employeeData;

// // //     return (
// // //         <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
// // //             <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-3xl shadow-2xl animate-slide-up my-8 border border-slate-200 dark:border-slate-800">
                
// // //                 {/* Header */}
// // //                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
// // //                     <div>
// // //                         <h2 className="text-xl font-bold text-slate-900 dark:text-white">
// // //                             {isEditing ? "Edit Employee" : "Add New Employee"}
// // //                         </h2>
// // //                         <p className="text-sm text-slate-500 mt-1">
// // //                             {isEditing ? "Update user account and employee profile" : "Create a user account and employee profile"}
// // //                         </p>
// // //                     </div>
// // //                     <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
// // //                         <X size={20} />
// // //                     </button>
// // //                 </div>

// // //                 {/* Form Body */}
// // //                 <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    
// // //                     {/* Section 1: Personal Info */}
// // //                     <div>
// // //                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
// // //                             Personal Information
// // //                         </h3>
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
// // //                                 <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
// // //                                 <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
// // //                                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. +1 234 567 8900" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Join Date</label>
// // //                                 {/* Note the [color-scheme:light] dark:[color-scheme:dark] which forces the calendar pop-up to match your theme! */}
// // //                                 <input 
// // //                                     type="date" 
// // //                                     name="joinDate" 
// // //                                     value={formData.joinDate} 
// // //                                     onChange={handleChange} 
// // //                                     className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
// // //                                 />
// // //                             </div>
// // //                             <div className="md:col-span-2">
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio (Optional)</label>
// // //                                 <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Brief description..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Section 2: Professional Info */}
// // //                     <div>
// // //                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
// // //                             Professional Information
// // //                         </h3>
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee ID</label>
// // //                                 <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
// // //                                 <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
// // //                                 <select name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
// // //                                     {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
// // //                                 </select>
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position / Title</label>
// // //                                 <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Software Engineer" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Status</label>
// // //                                 <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
// // //                                     <option value="ACTIVE">Active</option>
// // //                                     <option value="INACTIVE">Inactive</option>
// // //                                 </select>
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Footer Actions */}
// // //                     <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800">
// // //                         <button type="button" onClick={onClose} className="btn-secondary px-6 cursor-pointer">
// // //                             Cancel
// // //                         </button>
// // //                         <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 cursor-pointer">
// // //                             <Save size={18} /> {isEditing ? "Save Changes" : "Create Employee"}
// // //                         </button>
// // //                     </div>
// // //                 </form>

// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default EmployeeFormModal;

// // import React, { useState, useEffect } from "react";
// // import { X, Save } from "lucide-react";
// // import { DEPARTMENTS } from "../assets/assets";

// // const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSave }) => {
    
// //     const [formData, setFormData] = useState({
// //         employeeId: "",
// //         firstName: "",
// //         lastName: "",
// //         phone: "",
// //         joinDate: "", 
// //         bio: "",
// //         email: "",
// //         department: DEPARTMENTS[0],
// //         position: "",
// //         employmentStatus: "ACTIVE",
// //         basicSalary: "" // Added new salary field!
// //     });

// //     useEffect(() => {
// //         if (employeeData) {
// //             // EDIT MODE: Populate with the specific employee's existing data
// //             setFormData({
// //                 ...employeeData,
// //                 joinDate: employeeData.joinDate || "",
// //                 phone: employeeData.phone || "",
// //                 employeeId: employeeData.employeeId || (employeeData._id ? `EMP-${employeeData._id.slice(-5).toUpperCase()}` : ""),
// //                 basicSalary: employeeData.basicSalary || ""
// //             });
// //         } else {
// //             // ADD MODE: Completely blank slate
// //             setFormData({
// //                 employeeId: "",
// //                 firstName: "", 
// //                 lastName: "", 
// //                 phone: "", 
// //                 joinDate: "", 
// //                 bio: "",
// //                 email: "", 
// //                 department: DEPARTMENTS[0], 
// //                 position: "", 
// //                 employmentStatus: "ACTIVE",
// //                 basicSalary: ""
// //             });
// //         }
// //     }, [employeeData, isOpen]);

// //     if (!isOpen) return null;

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         onSave(formData);
// //     };

// //     const isEditing = !!employeeData;

// //     return (
// //         <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
// //             <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-3xl shadow-2xl animate-slide-up my-8 border border-slate-200 dark:border-slate-800">
                
// //                 {/* Header */}
// //                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
// //                     <div>
// //                         <h2 className="text-xl font-bold text-slate-900 dark:text-white">
// //                             {isEditing ? "Edit Employee" : "Add New Employee"}
// //                         </h2>
// //                         <p className="text-sm text-slate-500 mt-1">
// //                             {isEditing ? "Update user account and employee profile" : "Create a user account and employee profile"}
// //                         </p>
// //                     </div>
// //                     <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
// //                         <X size={20} />
// //                     </button>
// //                 </div>

// //                 {/* Form Body */}
// //                 <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    
// //                     {/* Section 1: Personal Info */}
// //                     <div>
// //                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
// //                             Personal Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
// //                                 <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
// //                                 <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
// //                                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. +1 234 567 8900" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Join Date</label>
// //                                 <input 
// //                                     type="date" 
// //                                     name="joinDate" 
// //                                     required
// //                                     value={formData.joinDate} 
// //                                     onChange={handleChange} 
// //                                     className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
// //                                 />
// //                             </div>
// //                             <div className="md:col-span-2">
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio (Optional)</label>
// //                                 <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Brief description..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Section 2: Professional Info */}
// //                     <div>
// //                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
// //                             Professional Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee ID</label>
// //                                 <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="e.g. EMP-1001" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
// //                                 <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@company.com" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
// //                                 <select name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
// //                                     {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
// //                                 </select>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position / Title</label>
// //                                 <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Software Engineer" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Status</label>
// //                                 <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
// //                                     <option value="ACTIVE">Active</option>
// //                                     <option value="INACTIVE">Inactive</option>
// //                                 </select>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
// //                                 <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 5000" />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Footer Actions */}
// //                     <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800">
// //                         <button type="button" onClick={onClose} className="btn-secondary px-6 cursor-pointer">
// //                             Cancel
// //                         </button>
// //                         <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 cursor-pointer">
// //                             <Save size={18} /> {isEditing ? "Save Changes" : "Create Employee"}
// //                         </button>
// //                     </div>
// //                 </form>

// //             </div>
// //         </div>
// //     );
// // };

// // export default EmployeeFormModal;

// import React, { useState, useEffect } from "react";
// import { X, Save } from "lucide-react";
// import { DEPARTMENTS } from "../assets/assets";

// const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSave }) => {
    
//     const [isAddingNewDept, setIsAddingNewDept] = useState(false);

//     const [formData, setFormData] = useState({
//         employeeId: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         joinDate: "", 
//         bio: "",
//         email: "",
//         department: DEPARTMENTS[0],
//         position: "",
//         employmentStatus: "ACTIVE",
//         basicSalary: "" 
//     });

//     useEffect(() => {
//         setIsAddingNewDept(false);

//         if (employeeData) {
//             setFormData({
//                 ...employeeData,
//                 joinDate: employeeData.joinDate || "",
//                 phone: employeeData.phone || "",
//                 employeeId: employeeData.employeeId || (employeeData._id ? `EMP-${employeeData._id.slice(-5).toUpperCase()}` : ""),
//                 basicSalary: employeeData.basicSalary || ""
//             });
            
//             if (employeeData.department && !DEPARTMENTS.includes(employeeData.department)) {
//                 setIsAddingNewDept(true);
//             }
//         } else {
//             setFormData({
//                 employeeId: "",
//                 firstName: "", 
//                 lastName: "", 
//                 phone: "", 
//                 joinDate: "", 
//                 bio: "",
//                 email: "", 
//                 department: DEPARTMENTS[0], 
//                 position: "", 
//                 employmentStatus: "ACTIVE",
//                 basicSalary: ""
//             });
//         }
//     }, [employeeData, isOpen]);

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleDeptSelect = (e) => {
//         if (e.target.value === "ADD_NEW") {
//             setIsAddingNewDept(true);
//             setFormData({ ...formData, department: "" });
//         } else {
//             setFormData({ ...formData, department: e.target.value });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(formData);
//     };

//     const isEditing = !!employeeData;

//     return (
//         <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
//             {/* Added "relative" here so the close button anchors correctly to the corners of this box */}
//             <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-3xl shadow-2xl animate-slide-up my-8 border border-slate-200 dark:border-slate-800 relative">
                
//                 {/* --- ABSOLUTE TOP-RIGHT CLOSE BUTTON --- */}
//                 <button 
//                     onClick={onClose} 
//                     className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-full transition-all cursor-pointer z-10"
//                     title="Close"
//                 >
//                     <X size={20} />
//                 </button>

//                 {/* Header (Removed the old flexbox close button from here) */}
//                 <div className="p-6 border-b border-slate-100 dark:border-slate-800">
//                     <h2 className="text-xl font-bold text-slate-900 dark:text-white pr-12">
//                         {isEditing ? "Edit Employee" : "Add New Employee"}
//                     </h2>
//                     <p className="text-sm text-slate-500 mt-1 pr-12">
//                         {isEditing ? "Update user account and employee profile" : "Create a user account and employee profile"}
//                     </p>
//                 </div>

//                 {/* Form Body */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    
//                     {/* Section 1: Personal Info */}
//                     <div>
//                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
//                             Personal Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
//                                 <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
//                                 <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
//                                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. +1 234 567 8900" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Join Date</label>
//                                 <input 
//                                     type="date" 
//                                     name="joinDate" 
//                                     required
//                                     value={formData.joinDate} 
//                                     onChange={handleChange} 
//                                     className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
//                                 />
//                             </div>
//                             <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio (Optional)</label>
//                                 <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Brief description..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Section 2: Professional Info */}
//                     <div>
//                         <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
//                             Professional Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee ID</label>
//                                 <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="e.g. EMP-1001" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
//                                 <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@company.com" />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
//                                 {!isAddingNewDept ? (
//                                     <select value={formData.department} onChange={handleDeptSelect} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
//                                         {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
//                                         <option disabled>──────────</option>
//                                         <option value="ADD_NEW" className="font-bold text-indigo-600 dark:text-indigo-400">+ Add New Department...</option>
//                                     </select>
//                                 ) : (
//                                     <div className="flex gap-2">
//                                         <input 
//                                             type="text" 
//                                             name="department" 
//                                             value={formData.department} 
//                                             onChange={handleChange} 
//                                             placeholder="Type new department..." 
//                                             autoFocus
//                                             required
//                                             className="w-full bg-white dark:bg-slate-800 border border-indigo-500 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-[0_0_10px_rgba(79,70,229,0.2)]" 
//                                         />
//                                         <button 
//                                             type="button" 
//                                             onClick={() => {
//                                                 setIsAddingNewDept(false);
//                                                 setFormData({...formData, department: DEPARTMENTS[0]});
//                                             }} 
//                                             className="px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
//                                             title="Cancel"
//                                         >
//                                             <X size={18} />
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position / Title</label>
//                                 <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Software Engineer" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Status</label>
//                                 <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
//                                     <option value="ACTIVE">Active</option>
//                                     <option value="INACTIVE">Inactive</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
//                                 <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 5000" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Footer Actions */}
//                     <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800">
//                         <button type="button" onClick={onClose} className="btn-secondary px-6 cursor-pointer">
//                             Cancel
//                         </button>
//                         <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 cursor-pointer">
//                             <Save size={18} /> {isEditing ? "Save Changes" : "Create Employee"}
//                         </button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     );
// };

// export default EmployeeFormModal;

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { DEPARTMENTS } from "../assets/assets";

const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSave }) => {
    
    const [isAddingNewDept, setIsAddingNewDept] = useState(false);

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        phone: "",
        joinDate: "", 
        bio: "",
        email: "",
        department: DEPARTMENTS[0],
        position: "",
        employmentStatus: "ACTIVE",
        basicSalary: "" 
    });

    useEffect(() => {
        setIsAddingNewDept(false);

        if (employeeData) {
            setFormData({
                ...employeeData,
                joinDate: employeeData.joinDate || "",
                phone: employeeData.phone || "",
                employeeId: employeeData.employeeId || (employeeData._id ? `EMP-${employeeData._id.slice(-5).toUpperCase()}` : ""),
                basicSalary: employeeData.basicSalary || ""
            });
            
            if (employeeData.department && !DEPARTMENTS.includes(employeeData.department)) {
                setIsAddingNewDept(true);
            }
        } else {
            setFormData({
                employeeId: "",
                firstName: "", 
                lastName: "", 
                phone: "", 
                joinDate: "", 
                bio: "",
                email: "", 
                department: DEPARTMENTS[0], 
                position: "", 
                employmentStatus: "ACTIVE",
                basicSalary: ""
            });
        }
    }, [employeeData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeptSelect = (e) => {
        if (e.target.value === "ADD_NEW") {
            setIsAddingNewDept(true);
            setFormData({ ...formData, department: "" });
        } else {
            setFormData({ ...formData, department: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const isEditing = !!employeeData;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            
            {/* UPDATED: Modal Container - Fixed max height so it never exceeds the screen */}
            <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-3xl shadow-2xl animate-slide-up flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 overflow-hidden">
                
                {/* --- STICKY HEADER --- */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0 bg-white dark:bg-[#121829] z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {isEditing ? "Edit Employee" : "Add New Employee"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {isEditing ? "Update user account and employee profile" : "Create a user account and employee profile"}
                        </p>
                    </div>
                    {/* The Close Button is back in the flex header where it is safe! */}
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-full transition-all cursor-pointer shrink-0"
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Wrapper (Controls both the scrollable body and sticky footer) */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    
                    {/* --- SCROLLABLE FORM BODY --- */}
                    <div className="p-6 overflow-y-auto space-y-8 flex-1">
                        
                        {/* Section 1: Personal Info */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. +1 234 567 8900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Join Date</label>
                                    <input 
                                        type="date" 
                                        name="joinDate" 
                                        required
                                        value={formData.joinDate} 
                                        onChange={handleChange} 
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio (Optional)</label>
                                    <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Brief description..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Professional Info */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                                Professional Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee ID</label>
                                    <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="e.g. EMP-1001" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@company.com" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
                                    {!isAddingNewDept ? (
                                        <select value={formData.department} onChange={handleDeptSelect} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                                            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                            <option disabled>──────────</option>
                                            <option value="ADD_NEW" className="font-bold text-indigo-600 dark:text-indigo-400">+ Add New Department...</option>
                                        </select>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                name="department" 
                                                value={formData.department} 
                                                onChange={handleChange} 
                                                placeholder="Type new department..." 
                                                autoFocus
                                                required
                                                className="w-full bg-white dark:bg-slate-800 border border-indigo-500 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-[0_0_10px_rgba(79,70,229,0.2)]" 
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    setIsAddingNewDept(false);
                                                    setFormData({...formData, department: DEPARTMENTS[0]});
                                                }} 
                                                className="px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position / Title</label>
                                    <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Software Engineer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Status</label>
                                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
                                    <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 5000" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- STICKY FOOTER --- */}
                    <div className="p-6 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-[#121829]/90 backdrop-blur-sm z-10">
                        <button type="button" onClick={onClose} className="btn-secondary px-6 cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 cursor-pointer">
                            <Save size={18} /> {isEditing ? "Save Changes" : "Create Employee"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EmployeeFormModal;