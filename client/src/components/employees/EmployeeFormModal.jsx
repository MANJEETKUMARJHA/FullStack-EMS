import React, { useState, useEffect } from "react";
import { X, Save, Lock, Mail, ShieldAlert, User, Briefcase, DollarSign } from "lucide-react";
import { DEPARTMENTS } from "../../assets/assets";

const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSave }) => {
    
    const [isAddingNewDept, setIsAddingNewDept] = useState(false);

    const [formData, setFormData] = useState({
        // Personal
        firstName: "",
        lastName: "",
        phone: "",
        joinDate: "", 
        bio: "",
        // Employment Details
        employeeId: "",
        department: DEPARTMENTS[0],
        position: "",
        employmentStatus: "ACTIVE",
        basicSalary: "",
        allowances: "",
        deductions: "",
        // Account Setup
        email: "",
        password: "", // Left blank by default
        role: "employee" // Default system role
    });

    useEffect(() => {
        setIsAddingNewDept(false);

        if (employeeData) {
            setFormData({
                ...employeeData,
                joinDate: employeeData.joinDate || "",
                phone: employeeData.phone || "",
                employeeId: employeeData.employeeId || (employeeData._id ? `EMP-${employeeData._id.slice(-5).toUpperCase()}` : ""),
                basicSalary: employeeData.basicSalary || "",
                allowances: employeeData.allowances || "",
                deductions: employeeData.deductions || "",
                password: "", // Always leave password blank when editing unless they want to change it
                role: employeeData.role || "employee"
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
                department: DEPARTMENTS[0], 
                position: "", 
                employmentStatus: "ACTIVE",
                basicSalary: "",
                allowances: "",
                deductions: "",
                email: "",
                password: "",
                role: "employee"
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
        
        // Ensure financial numbers are passed as actual numbers
        const processedData = {
            ...formData,
            basicSalary: parseFloat(formData.basicSalary) || 0,
            allowances: parseFloat(formData.allowances) || 0,
            deductions: parseFloat(formData.deductions) || 0,
        };

        onSave(processedData);
    };

    const isEditing = !!employeeData;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            
            <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-3xl shadow-2xl animate-slide-up flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 overflow-hidden">
                
                {/* --- STICKY HEADER --- */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0 bg-slate-50/50 dark:bg-slate-800/20 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {isEditing ? "Edit Employee" : "Add New Employee"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {isEditing ? "Update user account and employee profile" : "Create a user account and employee profile"}
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 bg-white hover:bg-slate-100 dark:bg-[#121829] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-full transition-all cursor-pointer shrink-0"
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Wrapper */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    
                    {/* --- SCROLLABLE FORM BODY --- */}
                    <div className="p-6 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                        
                        {/* Section 1: Personal Info */}
                        <div>
                            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <User size={16} /> Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. +1 234 567 8900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Join Date</label>
                                    <input 
                                        type="date" 
                                        name="joinDate" 
                                        required
                                        value={formData.joinDate} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio (Optional)</label>
                                    <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Brief description..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 2: Employment Details */}
                        <div>
                            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Briefcase size={16} /> Employment Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee ID</label>
                                    <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" placeholder="e.g. EMP-1001" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
                                    {!isAddingNewDept ? (
                                        <select value={formData.department} onChange={handleDeptSelect} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
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
                                                className="w-full px-4 py-2.5 rounded-lg border border-indigo-500 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-[0_0_10px_rgba(79,70,229,0.2)]" 
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => { setIsAddingNewDept(false); setFormData({...formData, department: DEPARTMENTS[0]}); }} 
                                                className="px-3 bg-white dark:bg-[#121829] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position / Title</label>
                                    <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Software Developer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Status</label>
                                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                                        <option value="ACTIVE">Active</option>
                                        <option value="ON LEAVE">On Leave</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 3: Payroll Info */}
                        <div>
                            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <DollarSign size={16} /> Payroll Configurations
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
                                    <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 5000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Allowances ($)</label>
                                    <input type="number" name="allowances" value={formData.allowances} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deductions ($)</label>
                                    <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. 200" />
                                </div>
                            </div>
                            
                            {/* Auto-Calculating Net Pay Preview */}
                            <div className="mt-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex justify-between items-center">
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Estimated Net Pay Preview:</span>
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    ${((parseFloat(formData.basicSalary) || 0) + (parseFloat(formData.allowances) || 0) - (parseFloat(formData.deductions) || 0)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                        </div>

                        <hr className="border-slate-100 dark:border-slate-800" />

                        {/* Section 4: Account Setup */}
                        <div>
                            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <ShieldAlert size={16} /> Account Setup
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5"><Mail size={14} className="text-slate-400"/> Work Email</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@company.com" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <Lock size={14} className="text-slate-400"/> {isEditing ? "Change Password (Optional)" : "Temporary Password"}
                                    </label>
                                    <input type="text" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder={isEditing ? "Leave blank to keep current" : "Set initial password"} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">System Role</label>
                                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                                        <option value="employee">Employee</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- STICKY FOOTER --- */}
                    <div className="p-6 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-800/20 z-10">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg bg-white dark:bg-[#121829] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors cursor-pointer shadow-sm">
                            Cancel
                        </button>
                        <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
                            <Save size={18} /> {isEditing ? "Update Employee" : "Create Employee"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EmployeeFormModal;