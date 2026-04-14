// import React, { useState, useMemo } from "react";
// import { DollarSign, TrendingUp, TrendingDown, Download, Eye, FileText, Search, Filter, PlayCircle, Plus, X, CheckCircle, Zap } from 'lucide-react';
// import toast from "react-hot-toast";
// import { dummyPayslipData, dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

// // Helper to convert month number to name
// const getMonthName = (monthNumber) => {
//     const date = new Date();
//     date.setMonth(monthNumber - 1);
//     return date.toLocaleString('en-US', { month: 'long' });
// };

// const PaySlips = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
//     const loggedInUserId = "69b411e6f8a807df391d7b13"; // John Doe's ID

//     // Inject a default "PAID" status into our dummy data
//     const initialPayslips = dummyPayslipData.map(p => ({ ...p, status: "PAID" }));
//     const [payslipData, setPayslipData] = useState(initialPayslips);

//     // Filters & Modal State
//     const [searchTerm, setSearchTerm] = useState("");
//     const [deptFilter, setDeptFilter] = useState("all");
//     const [monthFilter, setMonthFilter] = useState("all"); 
//     const [yearFilter, setYearFilter] = useState("all"); 
//     const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

//     // Manual Generate Form State
//     const [formData, setFormData] = useState({ employeeId: "", month: "3", year: "2026", basicSalary: "", allowances: "", deductions: "" });

//     // --- DATA PREPARATION ---
    
//     const enrichedPayslips = useMemo(() => {
//         return payslipData.map(slip => {
//             const employeeInfo = dummyEmployeeData.find(e => e._id === slip.employeeId);
//             return { ...slip, employeeInfo };
//         }).sort((a, b) => {
//             if (b.year !== a.year) return b.year - a.year;
//             return b.month - a.month;
//         });
//     }, [payslipData]);

//     const employeePayslips = enrichedPayslips.filter(slip => slip.employeeId === loggedInUserId);
//     const latestPayslip = employeePayslips.length > 0 ? employeePayslips[0] : null;
    
//     // Grabs exactly the last 3 months for the Employee table
//     const recentThreePayslips = employeePayslips.slice(0, 3);

//     const adminFilteredPayslips = enrichedPayslips.filter(slip => {
//         if (deptFilter !== "all" && slip.employeeInfo?.department !== deptFilter) return false;
//         if (monthFilter !== "all" && slip.month.toString() !== monthFilter) return false;
//         if (yearFilter !== "all" && slip.year.toString() !== yearFilter) return false;
//         if (searchTerm && slip.employeeInfo) {
//             const fullName = `${slip.employeeInfo.firstName} ${slip.employeeInfo.lastName}`.toLowerCase();
//             if (!fullName.includes(searchTerm.toLowerCase())) return false;
//         }
//         return true;
//     });

//     const adminTotals = adminFilteredPayslips.reduce((acc, slip) => {
//         acc.payroll += slip.netSalary;
//         acc.allowances += slip.allowances;
//         acc.deductions += slip.deductions;
//         return acc;
//     }, { payroll: 0, allowances: 0, deductions: 0 });

//     // Table Data Switcher
//     const displayPayslips = userRole === 'admin' ? adminFilteredPayslips : recentThreePayslips;

//     // --- HANDLERS ---
    
//     const handleDownload = (id) => toast.success("Downloading PDF format...");

//     const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Mark as Paid Action
//     const handleMarkAsPaid = (id) => {
//         setPayslipData(prev => prev.map(p => p._id === id ? { ...p, status: "PAID" } : p));
//         toast.success("Payslip marked as Paid!");
//     };

//     // Manual Single Generate
//     const handleGeneratePayslip = (e) => {
//         e.preventDefault();
//         if (!formData.employeeId) return toast.error("Please select an employee.");

//         const basic = parseFloat(formData.basicSalary) || 0;
//         const allow = parseFloat(formData.allowances) || 0;
//         const deduc = parseFloat(formData.deductions) || 0;

//         const newPayslip = {
//             _id: `ps-${Date.now()}`,
//             employeeId: formData.employeeId,
//             month: parseInt(formData.month),
//             year: parseInt(formData.year),
//             basicSalary: basic,
//             allowances: allow,
//             deductions: deduc,
//             netSalary: basic + allow - deduc,
//             status: "PROCESSING", 
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//         };

//         setPayslipData(prev => [newPayslip, ...prev]);
//         toast.success("Payslip generated successfully!");
//         setIsGenerateModalOpen(false);
//     };

//     // Auto Bulk Generate feature
//     const handleBulkGenerate = () => {
//         const month = parseInt(monthFilter !== "all" ? monthFilter : "3");
//         const year = parseInt(yearFilter !== "all" ? yearFilter : "2026");

//         const activeEmployees = dummyEmployeeData.filter(emp => emp.employmentStatus === 'ACTIVE');
//         const newPayslips = [];
        
//         activeEmployees.forEach(emp => {
//             const exists = payslipData.some(p => p.employeeId === emp._id && p.month === month && p.year === year);
//             if (!exists) {
//                 const basic = emp.basicSalary || 3500;
//                 const allow = emp.allowances || 200;
//                 const deduc = emp.deductions || 350;
                
//                 newPayslips.push({
//                     _id: `ps-bulk-${Date.now()}-${emp._id}`,
//                     employeeId: emp._id,
//                     month,
//                     year,
//                     basicSalary: basic,
//                     allowances: allow,
//                     deductions: deduc,
//                     netSalary: basic + allow - deduc,
//                     status: "PROCESSING",
//                     createdAt: new Date().toISOString(),
//                     updatedAt: new Date().toISOString()
//                 });
//             }
//         });

//         if (newPayslips.length > 0) {
//             setPayslipData(prev => [...newPayslips, ...prev]);
//             toast.success(`Successfully generated ${newPayslips.length} new payslips for ${getMonthName(month)} ${year}!`);
//         } else {
//             toast.error(`All active employees already have payslips for ${getMonthName(month)} ${year}.`);
//         }
//     };

//     const previewNetPay = (parseFloat(formData.basicSalary) || 0) + (parseFloat(formData.allowances) || 0) - (parseFloat(formData.deductions) || 0);

//     return (
//         <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
//             {/* Header */}
//             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                 <div>
//                     <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">
//                         {userRole === 'admin' ? 'Payroll Management' : 'My Payslips'}
//                     </h1>
//                     <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
//                         {userRole === 'admin' 
//                             ? 'Generate payslips, oversee deductions, and manage financial summaries.' 
//                             : 'View your recent earnings and download salary slips.'}
//                     </p>
//                 </div>
                
//                 {userRole === 'admin' && (
//                     <div className="flex gap-3">
//                         <button onClick={() => setIsGenerateModalOpen(true)} className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
//                             <Plus size={18} /> Single
//                         </button>
//                         <button onClick={handleBulkGenerate} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
//                             <Zap size={18} /> Auto-Payroll
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* --- ROLE BASED TOP SECTION --- */}
//             {userRole === 'employee' ? (
//                 /* EMPLOYEE LATEST PAYSLIP HIGHLIGHT */
//                 latestPayslip && (
//                     <div className="card p-6 md:p-8 bg-gradient-to-br from-[#0f0c29] via-[#1b173e] to-[#302b63] border-none mb-8 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                        
//                         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
//                             <div>
//                                 <div className="flex items-center gap-3 mb-1">
//                                     <p className="text-indigo-200 font-medium">Latest Salary Slip</p>
//                                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${latestPayslip.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
//                                         {latestPayslip.status}
//                                     </span>
//                                 </div>
//                                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
//                                     ${latestPayslip.netSalary.toLocaleString()}
//                                 </h2>
//                                 <p className="text-indigo-300 text-sm">For {getMonthName(latestPayslip.month)} {latestPayslip.year}</p>
//                             </div>

//                             <div className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between items-center text-sm">
//                                         <span className="text-indigo-100 flex items-center gap-2"><TrendingUp size={14} className="text-emerald-400"/> Basic + Allowances</span>
//                                         <span className="text-white font-medium">${(latestPayslip.basicSalary + latestPayslip.allowances).toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
//                                         <span className="text-indigo-100 flex items-center gap-2"><TrendingDown size={14} className="text-rose-400"/> Deductions</span>
//                                         <span className="text-white font-medium">-${latestPayslip.deductions.toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center text-sm pt-1">
//                                         <span className="text-indigo-200 font-medium">Net Salary</span>
//                                         <span className="text-emerald-400 font-bold">${latestPayslip.netSalary.toLocaleString()}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <button onClick={() => handleDownload(latestPayslip._id)} className="w-full lg:w-auto bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors shadow-lg cursor-pointer shrink-0">
//                                 <Download size={18} />
//                                 Download PDF
//                             </button>
//                         </div>
//                     </div>
//                 )
//             ) : (
//                 /* ADMIN PAYROLL DASHBOARD */
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                     <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-indigo-500 relative overflow-hidden group">
//                         <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><DollarSign size={80} /></div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Payroll Cost</p>
//                         <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">${adminTotals.payroll.toLocaleString()}</h3>
//                     </div>
//                     <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-emerald-500 relative overflow-hidden group">
//                         <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp size={80} /></div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Allowances</p>
//                         <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">+ ${adminTotals.allowances.toLocaleString()}</h3>
//                     </div>
//                     <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-rose-500 relative overflow-hidden group">
//                         <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingDown size={80} /></div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Deductions</p>
//                         <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">- ${adminTotals.deductions.toLocaleString()}</h3>
//                     </div>
//                 </div>
//             )}

//             {/* --- ADMIN FILTERS --- */}
//             {userRole === 'admin' && (
//                 <div className="card p-4 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
//                     <div className="relative w-full lg:w-96">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search size={18} /></div>
//                         <input type="text" placeholder="Search employee..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                     </div>
                    
//                     <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap gap-3">
//                         <div className="relative w-full sm:w-48">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Filter size={14} /></div>
//                             <select className="pl-8 w-full cursor-pointer" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
//                                 <option value="all">All Departments</option>
//                                 {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>
//                         <select className="w-full sm:w-32 cursor-pointer" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
//                             <option value="all">All Months</option>
//                             <option value="1">January</option>
//                             <option value="2">February</option>
//                             <option value="3">March</option>
//                         </select>
//                         <select className="w-full sm:w-28 cursor-pointer" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
//                             <option value="all">All Years</option>
//                             <option value="2026">2026</option>
//                             <option value="2025">2025</option>
//                         </select>
//                     </div>
//                 </div>
//             )}

//             {/* --- HISTORY TABLE --- */}
//             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
//                         <FileText size={20} className="text-indigo-500" />
//                         {userRole === 'admin' ? "Payroll Master Records" : "Full Payslip Archive"}
//                     </h2>
//                 </div>
                
//                 <div className="overflow-x-auto">
//                     <table className="table-modern w-full">
//                         <thead>
//                             <tr>
//                                 {userRole === 'admin' && <th>Employee</th>}
//                                 <th>Period</th>
//                                 <th>Basic Salary</th>
//                                 <th>Net Pay</th>
//                                 <th>Status</th>
//                                 <th className="text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {displayPayslips.length > 0 ? (
//                                 displayPayslips.map((slip) => (
//                                     <tr key={slip._id}>
//                                         {userRole === 'admin' && (
//                                             <td>
//                                                 <div className="flex items-center gap-3">
//                                                     <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
//                                                         {slip.employeeInfo?.firstName.charAt(0)}{slip.employeeInfo?.lastName.charAt(0)}
//                                                     </div>
//                                                     <div>
//                                                         <p className="font-medium text-slate-900 dark:text-white">{slip.employeeInfo?.firstName} {slip.employeeInfo?.lastName}</p>
//                                                         <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{slip.employeeInfo?.department}</p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         )}
//                                         <td>
//                                             <p className="font-medium text-slate-800 dark:text-slate-200">{getMonthName(slip.month)} {slip.year}</p>
//                                         </td>
//                                         <td className="text-slate-600 dark:text-slate-400">${slip.basicSalary.toLocaleString()}</td>
//                                         <td>
//                                             <span className="font-bold text-slate-800 dark:text-slate-200">
//                                                 ${slip.netSalary.toLocaleString()}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             <span className={`badge font-bold text-[10px] tracking-wider ${slip.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
//                                                 {slip.status}
//                                             </span>
//                                         </td>
//                                         <td className="text-right">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 {/* Admin Only: Mark as Paid Button */}
//                                                 {userRole === 'admin' && slip.status !== 'PAID' && (
//                                                     <button onClick={() => handleMarkAsPaid(slip._id)} className="p-2 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer" title="Mark as Paid">
//                                                         <CheckCircle size={18} />
//                                                     </button>
//                                                 )}
//                                                 <button onClick={() => toast("Details view coming soon!")} className="p-2 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer" title="View Details">
//                                                     <Eye size={18} />
//                                                 </button>
//                                                 <button onClick={() => handleDownload(slip._id)} className="p-2 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer" title="Download PDF">
//                                                     <Download size={18} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={userRole === 'admin' ? 6 : 5} className="text-center py-12 text-slate-500">
//                                         No payslip records found matching your filters.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* --- ADMIN GENERATE PAYSLIP MODAL --- */}
//             {isGenerateModalOpen && userRole === 'admin' && (
//                 <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//                     <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">
//                         <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
//                             <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generate Single Payslip</h2>
//                             <button onClick={() => setIsGenerateModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1">
//                                 <X size={20} />
//                             </button>
//                         </div>
//                         <form onSubmit={handleGeneratePayslip} className="p-6 space-y-5">
//                             <div>
//                                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee</label>
//                                 <select required name="employeeId" value={formData.employeeId} onChange={handleFormChange} className="cursor-pointer">
//                                     <option value="" disabled>Select an employee...</option>
//                                     {dummyEmployeeData.filter(emp => emp.employmentStatus === 'ACTIVE').map(emp => (
//                                         <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName} ({emp.department})</option>
//                                     ))}
//                                 </select>
//                             </div>
                            
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Month</label>
//                                     <select name="month" value={formData.month} onChange={handleFormChange} className="cursor-pointer">
//                                         <option value="1">January</option>
//                                         <option value="2">February</option>
//                                         <option value="3">March</option>
//                                         <option value="4">April</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Year</label>
//                                     <input type="number" name="year" required value={formData.year} onChange={handleFormChange} />
//                                 </div>
//                             </div>

//                             <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
//                                     <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleFormChange} placeholder="e.g. 3000" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Allowances / Bonuses ($)</label>
//                                     <input type="number" name="allowances" required value={formData.allowances} onChange={handleFormChange} placeholder="e.g. 500" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deductions / Taxes ($)</label>
//                                     <input type="number" name="deductions" required value={formData.deductions} onChange={handleFormChange} placeholder="e.g. 200" />
//                                 </div>
//                             </div>

//                             <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex justify-between items-center mt-4 border border-slate-100 dark:border-slate-700">
//                                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview Net Pay:</span>
//                                 <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${previewNetPay.toLocaleString()}</span>
//                             </div>

//                             <div className="pt-4 flex gap-3">
//                                 <button type="button" onClick={() => setIsGenerateModalOpen(false)} className="btn-secondary w-full text-center cursor-pointer">Cancel</button>
//                                 <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer">
//                                     <FileText size={16} /> Process Payslip
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaySlips;

import React, { useState, useMemo } from "react";
import { DollarSign, TrendingUp, TrendingDown, Download, Eye, FileText, Search, Filter, PlayCircle, Plus, X, CheckCircle, Zap } from 'lucide-react';
import toast from "react-hot-toast";
import { dummyPayslipData, dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import PrintPayslip from "./PrintPaySlips"; // <-- Importing our fixed component!

const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
};

const PaySlips = () => {
    const userRole = localStorage.getItem("userRole") || "employee";
    const loggedInUserId = "69b411e6f8a807df391d7b13"; 

    const initialPayslips = dummyPayslipData.map(p => ({ ...p, status: "PAID" }));
    const [payslipData, setPayslipData] = useState(initialPayslips);

    const [searchTerm, setSearchTerm] = useState("");
    const [deptFilter, setDeptFilter] = useState("all");
    const [monthFilter, setMonthFilter] = useState("all"); 
    const [yearFilter, setYearFilter] = useState("all"); 
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    
    // NEW: State to hold the specific payslip we want to print
    const [selectedPayslipToPrint, setSelectedPayslipToPrint] = useState(null);

    const [formData, setFormData] = useState({ employeeId: "", month: "3", year: "2026", basicSalary: "", allowances: "", deductions: "" });

    const enrichedPayslips = useMemo(() => {
        return payslipData.map(slip => {
            const employeeInfo = dummyEmployeeData.find(e => e._id === slip.employeeId);
            return { ...slip, employeeInfo };
        }).sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            return b.month - a.month;
        });
    }, [payslipData]);

    const employeePayslips = enrichedPayslips.filter(slip => slip.employeeId === loggedInUserId);
    const latestPayslip = employeePayslips.length > 0 ? employeePayslips[0] : null;
    const recentThreePayslips = employeePayslips.slice(0, 3);

    const adminFilteredPayslips = enrichedPayslips.filter(slip => {
        if (deptFilter !== "all" && slip.employeeInfo?.department !== deptFilter) return false;
        if (monthFilter !== "all" && slip.month.toString() !== monthFilter) return false;
        if (yearFilter !== "all" && slip.year.toString() !== yearFilter) return false;
        if (searchTerm && slip.employeeInfo) {
            const fullName = `${slip.employeeInfo.firstName} ${slip.employeeInfo.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) return false;
        }
        return true;
    });

    const adminTotals = adminFilteredPayslips.reduce((acc, slip) => {
        acc.payroll += slip.netSalary;
        acc.allowances += slip.allowances;
        acc.deductions += slip.deductions;
        return acc;
    }, { payroll: 0, allowances: 0, deductions: 0 });

    const displayPayslips = userRole === 'admin' ? adminFilteredPayslips : recentThreePayslips;

    // --- HANDLERS ---
    
    // UPDATED: Now it opens the modal instead of showing a toast!
    const handleDownload = (slipObject) => {
        setSelectedPayslipToPrint(slipObject);
    };

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleMarkAsPaid = (id) => {
        setPayslipData(prev => prev.map(p => p._id === id ? { ...p, status: "PAID" } : p));
        toast.success("Payslip marked as Paid!");
    };

    const handleGeneratePayslip = (e) => {
        e.preventDefault();
        if (!formData.employeeId) return toast.error("Please select an employee.");

        const basic = parseFloat(formData.basicSalary) || 0;
        const allow = parseFloat(formData.allowances) || 0;
        const deduc = parseFloat(formData.deductions) || 0;

        const newPayslip = {
            _id: `ps-${Date.now()}`,
            employeeId: formData.employeeId,
            month: parseInt(formData.month),
            year: parseInt(formData.year),
            basicSalary: basic,
            allowances: allow,
            deductions: deduc,
            netSalary: basic + allow - deduc,
            status: "PROCESSING", 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setPayslipData(prev => [newPayslip, ...prev]);
        toast.success("Payslip generated successfully!");
        setIsGenerateModalOpen(false);
    };

    const handleBulkGenerate = () => {
        const month = parseInt(monthFilter !== "all" ? monthFilter : "3");
        const year = parseInt(yearFilter !== "all" ? yearFilter : "2026");

        const activeEmployees = dummyEmployeeData.filter(emp => emp.employmentStatus === 'ACTIVE');
        const newPayslips = [];
        
        activeEmployees.forEach(emp => {
            const exists = payslipData.some(p => p.employeeId === emp._id && p.month === month && p.year === year);
            if (!exists) {
                const basic = emp.basicSalary || 3500;
                const allow = emp.allowances || 200;
                const deduc = emp.deductions || 350;
                
                newPayslips.push({
                    _id: `ps-bulk-${Date.now()}-${emp._id}`,
                    employeeId: emp._id,
                    month,
                    year,
                    basicSalary: basic,
                    allowances: allow,
                    deductions: deduc,
                    netSalary: basic + allow - deduc,
                    status: "PROCESSING",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
        });

        if (newPayslips.length > 0) {
            setPayslipData(prev => [...newPayslips, ...prev]);
            toast.success(`Successfully generated ${newPayslips.length} new payslips for ${getMonthName(month)} ${year}!`);
        } else {
            toast.error(`All active employees already have payslips for ${getMonthName(month)} ${year}.`);
        }
    };

    const previewNetPay = (parseFloat(formData.basicSalary) || 0) + (parseFloat(formData.allowances) || 0) - (parseFloat(formData.deductions) || 0);

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">
                        {userRole === 'admin' ? 'Payroll Management' : 'My Payslips'}
                    </h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
                        {userRole === 'admin' 
                            ? 'Generate payslips, oversee deductions, and manage financial summaries.' 
                            : 'View your recent earnings and download salary slips.'}
                    </p>
                </div>
                
                {userRole === 'admin' && (
                    <div className="flex gap-3">
                        <button onClick={() => setIsGenerateModalOpen(true)} className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
                            <Plus size={18} /> Single
                        </button>
                        <button onClick={handleBulkGenerate} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
                            <Zap size={18} /> Auto-Payroll
                        </button>
                    </div>
                )}
            </div>

            {userRole === 'employee' ? (
                latestPayslip && (
                    <div className="card p-6 md:p-8 bg-gradient-to-br from-[#0f0c29] via-[#1b173e] to-[#302b63] border-none mb-8 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <p className="text-indigo-200 font-medium">Latest Salary Slip</p>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${latestPayslip.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                        {latestPayslip.status}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                    ${latestPayslip.netSalary.toLocaleString()}
                                </h2>
                                <p className="text-indigo-300 text-sm">For {getMonthName(latestPayslip.month)} {latestPayslip.year}</p>
                            </div>

                            <div className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-indigo-100 flex items-center gap-2"><TrendingUp size={14} className="text-emerald-400"/> Basic + Allowances</span>
                                        <span className="text-white font-medium">${(latestPayslip.basicSalary + latestPayslip.allowances).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                        <span className="text-indigo-100 flex items-center gap-2"><TrendingDown size={14} className="text-rose-400"/> Deductions</span>
                                        <span className="text-white font-medium">-${latestPayslip.deductions.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-1">
                                        <span className="text-indigo-200 font-medium">Net Salary</span>
                                        <span className="text-emerald-400 font-bold">${latestPayslip.netSalary.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => handleDownload(latestPayslip)} className="w-full lg:w-auto bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors shadow-lg cursor-pointer shrink-0">
                                <Download size={18} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-indigo-500 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><DollarSign size={80} /></div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Payroll Cost</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">${adminTotals.payroll.toLocaleString()}</h3>
                    </div>
                    <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-emerald-500 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp size={80} /></div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Allowances</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">+ ${adminTotals.allowances.toLocaleString()}</h3>
                    </div>
                    <div className="card p-6 flex flex-col justify-between h-32 border-l-4 border-l-rose-500 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingDown size={80} /></div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">Filtered Deductions</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">- ${adminTotals.deductions.toLocaleString()}</h3>
                    </div>
                </div>
            )}

            {userRole === 'admin' && (
                <div className="card p-4 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    <div className="relative w-full lg:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search size={18} /></div>
                        <input type="text" placeholder="Search employee..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    
                    <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap gap-3">
                        <div className="relative w-full sm:w-48">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Filter size={14} /></div>
                            <select className="pl-8 w-full cursor-pointer" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                                <option value="all">All Departments</option>
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <select className="w-full sm:w-32 cursor-pointer" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
                            <option value="all">All Months</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                        </select>
                        <select className="w-full sm:w-28 cursor-pointer" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                            <option value="all">All Years</option>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileText size={20} className="text-indigo-500" />
                        {userRole === 'admin' ? "Payroll Master Records" : "Full Payslip Archive"}
                    </h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table-modern w-full">
                        <thead>
                            <tr>
                                {userRole === 'admin' && <th>Employee</th>}
                                <th>Period</th>
                                <th>Basic Salary</th>
                                <th>Net Pay</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayPayslips.length > 0 ? (
                                displayPayslips.map((slip) => (
                                    <tr key={slip._id}>
                                        {userRole === 'admin' && (
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {slip.employeeInfo?.firstName.charAt(0)}{slip.employeeInfo?.lastName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900 dark:text-white">{slip.employeeInfo?.firstName} {slip.employeeInfo?.lastName}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{slip.employeeInfo?.department}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                        <td>
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{getMonthName(slip.month)} {slip.year}</p>
                                        </td>
                                        <td className="text-slate-600 dark:text-slate-400">${slip.basicSalary.toLocaleString()}</td>
                                        <td>
                                            <span className="font-bold text-slate-800 dark:text-slate-200">
                                                ${slip.netSalary.toLocaleString()}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge font-bold text-[10px] tracking-wider ${slip.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                                                {slip.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {userRole === 'admin' && slip.status !== 'PAID' && (
                                                    <button onClick={() => handleMarkAsPaid(slip._id)} className="p-2 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer" title="Mark as Paid">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                <button onClick={() => handleDownload(slip)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button onClick={() => handleDownload(slip)} className="p-2 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer" title="Download PDF">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={userRole === 'admin' ? 6 : 5} className="text-center py-12 text-slate-500">
                                        No payslip records found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isGenerateModalOpen && userRole === 'admin' && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generate Single Payslip</h2>
                            <button onClick={() => setIsGenerateModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleGeneratePayslip} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employee</label>
                                <select required name="employeeId" value={formData.employeeId} onChange={handleFormChange} className="cursor-pointer">
                                    <option value="" disabled>Select an employee...</option>
                                    {dummyEmployeeData.filter(emp => emp.employmentStatus === 'ACTIVE').map(emp => (
                                        <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName} ({emp.department})</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Month</label>
                                    <select name="month" value={formData.month} onChange={handleFormChange} className="cursor-pointer">
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Year</label>
                                    <input type="number" name="year" required value={formData.year} onChange={handleFormChange} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Basic Salary ($)</label>
                                    <input type="number" name="basicSalary" required value={formData.basicSalary} onChange={handleFormChange} placeholder="e.g. 3000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Allowances / Bonuses ($)</label>
                                    <input type="number" name="allowances" required value={formData.allowances} onChange={handleFormChange} placeholder="e.g. 500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deductions / Taxes ($)</label>
                                    <input type="number" name="deductions" required value={formData.deductions} onChange={handleFormChange} placeholder="e.g. 200" />
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex justify-between items-center mt-4 border border-slate-100 dark:border-slate-700">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Preview Net Pay:</span>
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${previewNetPay.toLocaleString()}</span>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsGenerateModalOpen(false)} className="btn-secondary w-full text-center cursor-pointer">Cancel</button>
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer">
                                    <FileText size={16} /> Process Payslip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- THIS IS WHERE THE PRINT MODAL SHOWS UP --- */}
            {selectedPayslipToPrint && (
                <PrintPayslip 
                    payslip={selectedPayslipToPrint} 
                    onClose={() => setSelectedPayslipToPrint(null)} 
                />
            )}

        </div>
    );
};

export default PaySlips;