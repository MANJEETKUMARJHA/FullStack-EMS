// import React, { useState, useMemo } from "react";
// import { Plus, Check, X, Clock, Calendar, Search, Filter, AlertTriangle, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
// import toast from "react-hot-toast";
// import { dummyLeaveData, dummyEmployeeData } from "../assets/assets";
// import LeaveRequestModal from "../components/LeaveRequestModa"; // Fixed the missing 'l' typo here!

// const calculateDays = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = Math.abs(endDate - startDate);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
// };

// // --- CUSTOM SVG CIRCULAR PROGRESS COMPONENT ---
// const CircularProgress = ({ used, total, colorClass, trailClass }) => {
//     const radius = 32;
//     const circumference = 2 * Math.PI * radius;
//     const percent = Math.min(100, (used / total) * 100) || 0;
//     const offset = circumference - (percent / 100) * circumference;

//     return (
//         <div className="relative w-20 h-20 flex items-center justify-center">
//             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
//                 <circle cx="40" cy="40" r={radius} className={`fill-none stroke-4 ${trailClass}`} strokeWidth="6" />
//                 <circle 
//                     cx="40" cy="40" r={radius} 
//                     className={`fill-none ${colorClass} transition-all duration-1000 ease-out`} 
//                     strokeWidth="6" 
//                     strokeDasharray={circumference} 
//                     strokeDashoffset={offset} 
//                     strokeLinecap="round" 
//                 />
//             </svg>
//             <div className="absolute flex flex-col items-center justify-center">
//                 <span className="text-xl font-bold text-slate-900 dark:text-white">{total - used}</span>
//             </div>
//         </div>
//     );
// };

// const Leave = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
//     const loggedInUserId = "69b411e6f8a807df391d7b13"; 
    
//     const [leaveRequests, setLeaveRequests] = useState(dummyLeaveData);
//     const [isModalOpen, setIsModalOpen] = useState(false);
    
//     // Filters & States
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [typeFilter, setTypeFilter] = useState("all");
//     const [expandedRow, setExpandedRow] = useState(null); 
//     const [selectedLeaves, setSelectedLeaves] = useState([]); 

//     // --- DATA PREPARATION ---
//     const enrichedRequests = useMemo(() => {
//         return leaveRequests.map(request => {
//             const empId = request.employeeId;
//             const employeeInfo = dummyEmployeeData.find(e => e._id === empId);
//             return { ...request, employeeInfo, duration: calculateDays(request.startDate, request.endDate) };
//         }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }, [leaveRequests]);

//     const employeeRequests = enrichedRequests.filter(req => req.employeeId === loggedInUserId);
//     const adminPendingQueue = enrichedRequests.filter(req => req.status === "PENDING");
    
//     const allowances = { ANNUAL: 15, CASUAL: 10, SICK: 5 };
//     const usedLeaves = employeeRequests.reduce((acc, req) => {
//         if (req.status === "APPROVED") acc[req.type] = (acc[req.type] || 0) + req.duration;
//         return acc;
//     }, { ANNUAL: 0, CASUAL: 0, SICK: 0 });

//     const checkOverlap = (pendingReq) => {
//         return enrichedRequests.some(approvedReq => {
//             if (approvedReq.status !== "APPROVED" || approvedReq._id === pendingReq._id) return false;
//             if (approvedReq.employeeInfo?.department !== pendingReq.employeeInfo?.department) return false;
//             const pStart = new Date(pendingReq.startDate), pEnd = new Date(pendingReq.endDate);
//             const aStart = new Date(approvedReq.startDate), aEnd = new Date(approvedReq.endDate);
//             return (pStart <= aEnd && pEnd >= aStart);
//         });
//     };

//     // --- HANDLERS ---
//     const handleSingleAction = (action, id) => {
//         setLeaveRequests(prev => prev.map(req => req._id === id ? { ...req, status: action } : req));
//         toast.success(`Leave request ${action.toLowerCase()}!`);
//     };

//     const handleBulkAction = (action) => {
//         if (selectedLeaves.length === 0) return;
//         setLeaveRequests(prev => prev.map(req => selectedLeaves.includes(req._id) ? { ...req, status: action } : req));
//         toast.success(`Processed ${selectedLeaves.length} requests!`);
//         setSelectedLeaves([]);
//     };

//     const toggleRow = (id) => {
//         setExpandedRow(expandedRow === id ? null : id);
//     };

//     const handleSelectAll = (e) => {
//         if (e.target.checked) setSelectedLeaves(adminPendingQueue.map(req => req._id));
//         else setSelectedLeaves([]);
//     };

//     const handleSelectOne = (e, id) => {
//         if (e.target.checked) setSelectedLeaves([...selectedLeaves, id]);
//         else setSelectedLeaves(selectedLeaves.filter(leafId => leafId !== id));
//     };

//     // FIX: Changed to async so the modal's loading animation works, and removed the duplicate toasts/closes!
//     const handleSubmitLeave = async (formData) => {
//         // Optional: A tiny 500ms delay so your cool "Submitting..." button animation is visible
//         await new Promise(resolve => setTimeout(resolve, 500)); 

//         const newRequest = {
//             _id: `lv-new-${Date.now()}`,
//             employeeId: loggedInUserId,
//             type: formData.type,
//             startDate: formData.startDate,
//             endDate: formData.endDate,
//             reason: formData.reason,
//             status: "PENDING",
//             createdAt: new Date().toISOString()
//         };
        
//         // Just update the data. The Modal will handle the success toast and closing itself!
//         setLeaveRequests([newRequest, ...leaveRequests]);
//     };

//     const displayRequests = (userRole === 'admin' ? enrichedRequests : employeeRequests).filter(req => {
//         if (statusFilter !== "all" && req.status !== statusFilter) return false;
//         if (typeFilter !== "all" && req.type !== typeFilter) return false;
//         if (userRole === 'admin' && searchTerm) {
//             const fullName = `${req.employeeInfo?.firstName} ${req.employeeInfo?.lastName}`.toLowerCase();
//             if (!fullName.includes(searchTerm.toLowerCase())) return false;
//         }
//         return true;
//     });

//     return (
//         <div className="animate-fade-in pb-8 font-['Outfit'] relative">
//             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                 <div>
//                     <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Leave Management</h1>
//                     <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
//                         {userRole === 'admin' ? "Review and manage employee time-off requests." : "Track your leave balance and submit new requests."}
//                     </p>
//                 </div>
//                 {userRole === 'employee' && (
//                     <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center justify-center gap-2 cursor-pointer shadow-indigo-500/30">
//                         <Plus size={18} /> Request Leave
//                     </button>
//                 )}
//             </div>

//             {/* --- VISUAL BALANCES (EMPLOYEE) --- */}
//             {userRole === 'employee' && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                     {[
//                         { type: 'ANNUAL', name: 'Annual Leave', stroke: 'stroke-indigo-500', trail: 'stroke-indigo-100 dark:stroke-indigo-900/30' },
//                         { type: 'CASUAL', name: 'Casual Leave', stroke: 'stroke-emerald-500', trail: 'stroke-emerald-100 dark:stroke-emerald-900/30' },
//                         { type: 'SICK', name: 'Sick Leave', stroke: 'stroke-amber-500', trail: 'stroke-amber-100 dark:stroke-amber-900/30' }
//                     ].map(leave => (
//                         <div key={leave.type} className="card p-6 flex items-center justify-between hover:shadow-lg transition-shadow">
//                             <div>
//                                 <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{leave.name}</p>
//                                 <p className="text-xs text-slate-400 mt-1">{usedLeaves[leave.type]} of {allowances[leave.type]} days used</p>
//                             </div>
//                             <CircularProgress used={usedLeaves[leave.type]} total={allowances[leave.type]} colorClass={leave.stroke} trailClass={leave.trail} />
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* --- BULK ACTION QUEUE (ADMIN) --- */}
//             {userRole === 'admin' && (
//                 <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                     <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
//                             <ShieldAlert size={20} className="text-amber-500" />
//                             Action Needed ({adminPendingQueue.length})
//                         </h2>
//                         {selectedLeaves.length > 0 && (
//                             <div className="flex gap-2 animate-fade-in">
//                                 <button onClick={() => handleBulkAction("APPROVED")} className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer">Approve ({selectedLeaves.length})</button>
//                                 <button onClick={() => handleBulkAction("REJECTED")} className="px-4 py-1.5 bg-rose-600 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer">Reject ({selectedLeaves.length})</button>
//                             </div>
//                         )}
//                     </div>

//                     {adminPendingQueue.length > 0 ? (
//                         <div className="card overflow-hidden">
//                             <table className="w-full text-left">
//                                 <thead>
//                                     <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
//                                         <th className="p-4 w-10"><input type="checkbox" onChange={handleSelectAll} checked={selectedLeaves.length === adminPendingQueue.length} className="cursor-pointer rounded border-slate-300 text-indigo-600" /></th>
//                                         <th className="p-4">Employee</th>
//                                         <th className="p-4">Duration</th>
//                                         <th className="p-4 text-right">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
//                                     {adminPendingQueue.map(req => {
//                                         const hasOverlap = checkOverlap(req);
//                                         return (
//                                             <tr key={`queue-${req._id}`} className={`${hasOverlap ? 'bg-amber-50/30 dark:bg-amber-500/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'}`}>
//                                                 <td className="p-4"><input type="checkbox" checked={selectedLeaves.includes(req._id)} onChange={(e) => handleSelectOne(e, req._id)} className="cursor-pointer rounded border-slate-300 text-indigo-600" /></td>
//                                                 <td className="p-4">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex justify-center items-center font-bold text-xs">{req.employeeInfo?.firstName.charAt(0)}{req.employeeInfo?.lastName.charAt(0)}</div>
//                                                         <div><p className="font-semibold text-slate-900 dark:text-white text-sm">{req.employeeInfo?.firstName} {req.employeeInfo?.lastName}</p></div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="p-4">
//                                                     <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{req.type} Leave <span className="text-slate-400">({req.duration}d)</span></p>
//                                                     {hasOverlap && <span className="text-[10px] text-amber-600 flex items-center gap-1 mt-1"><AlertTriangle size={10} /> Overlap Warning</span>}
//                                                 </td>
//                                                 <td className="p-4 text-right flex justify-end gap-2">
//                                                     <button onClick={() => handleSingleAction('APPROVED', req._id)} className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 rounded-md cursor-pointer"><Check size={16} /></button>
//                                                     <button onClick={() => handleSingleAction('REJECTED', req._id)} className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 rounded-md cursor-pointer"><X size={16} /></button>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         <div className="card p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0a0f1c]">All caught up! No pending leave requests.</div>
//                     )}
//                 </div>
//             )}

//             {/* --- FILTER BAR --- */}
//             <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
//                 {userRole === 'admin' ? (
//                     <div className="relative w-full sm:w-96">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search size={18} /></div>
//                         <input type="text" placeholder="Search employee..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                     </div>
//                 ) : (
//                     <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Leave History</div>
//                 )}
                
//                 <div className="w-full sm:w-auto flex gap-3">
//                     <div className="relative w-full sm:w-40">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Filter size={14} /></div>
//                         <select className="pl-8 w-full cursor-pointer" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//                             <option value="all">All Types</option>
//                             <option value="ANNUAL">Annual</option>
//                             <option value="CASUAL">Casual</option>
//                             <option value="SICK">Sick</option>
//                         </select>
//                     </div>
//                     <select className="w-full sm:w-36 cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                         <option value="all">All Statuses</option>
//                         <option value="APPROVED">Approved</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="REJECTED">Rejected</option>
//                     </select>
//                 </div>
//             </div>

//             {/* --- ACCORDION HISTORY TABLE --- */}
//             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 <div className="overflow-x-auto">
//                     <table className="table-modern w-full text-left">
//                         <thead>
//                             <tr className="bg-slate-50 dark:bg-slate-800/50">
//                                 {userRole === 'admin' && <th className="p-4">Employee</th>}
//                                 <th className="p-4">Details</th>
//                                 <th className="p-4">Applied</th>
//                                 <th className="p-4">Status</th>
//                                 <th className="p-4 w-10"></th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                             {displayRequests.length > 0 ? displayRequests.map((request) => (
//                                 <React.Fragment key={request._id}>
//                                     <tr onClick={() => toggleRow(request._id)} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors group">
//                                         {userRole === 'admin' && (
//                                             <td className="p-4">
//                                                 <p className="font-semibold text-slate-900 dark:text-white">{request.employeeInfo?.firstName} {request.employeeInfo?.lastName}</p>
//                                                 <p className="text-xs text-slate-500">{request.employeeInfo?.department}</p>
//                                             </td>
//                                         )}
//                                         <td className="p-4">
//                                             <p className="font-medium text-slate-800 dark:text-slate-200">{request.type} <span className="text-slate-400">({request.duration}d)</span></p>
//                                             <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
//                                                 <Calendar size={12} /> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
//                                             </div>
//                                         </td>
//                                         <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{new Date(request.createdAt).toLocaleDateString()}</td>
//                                         <td className="p-4">
//                                             <span className={`badge uppercase tracking-wider text-[10px] ${request.status === 'PENDING' && 'animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]'} ${request.status === 'APPROVED' ? 'badge-success' : request.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`}>
//                                                 {request.status}
//                                             </span>
//                                         </td>
//                                         <td className="p-4 text-slate-400 group-hover:text-indigo-500 transition-colors">
//                                             {expandedRow === request._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                                         </td>
//                                     </tr>
//                                     {/* EXPANDED ROW DETAIL VIEW */}
//                                     {expandedRow === request._id && (
//                                         <tr className="bg-slate-50/50 dark:bg-slate-800/10 border-none">
//                                             <td colSpan={userRole === 'admin' ? 5 : 4} className="p-6 pt-2">
//                                                 <div className="bg-white dark:bg-[#121829] p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
//                                                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reason for Request</h4>
//                                                     <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-indigo-200 dark:border-indigo-900/50 pl-3">
//                                                         "{request.reason}"
//                                                     </p>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             )) : (
//                                 <tr><td colSpan={userRole === 'admin' ? 5 : 4} className="text-center py-12 text-slate-500">No leave records found.</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <LeaveRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSubmitLeave} />
//         </div>
//     );
// };

// export default Leave;/

import React from 'react';
import AdminLeave from '../components/leave/AdminLeave';
import EmployeeLeave from '../components/leave/EmployeeLeave';

const Leave = () => {
    // 1. Get the user's role
    const userRole = localStorage.getItem("userRole") || "employee";

    // 2. Direct traffic to the completely separate component files
    if (userRole === 'admin') {
        return <AdminLeave />;
    }

    return <EmployeeLeave />;
};

export default Leave;