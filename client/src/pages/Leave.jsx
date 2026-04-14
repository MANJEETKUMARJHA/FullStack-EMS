// import React, { useState } from "react";
// import { Plus, Check, X, Clock, Umbrella, Calendar } from 'lucide-react';
// import toast from "react-hot-toast";
// // 1. Importing the real dummy data from assets
// import { dummyLeaveData } from "../assets/assets";

// const Leave = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
    
//     // 2. Setting the state directly to the imported data (NO hardcoded LR-001 arrays here!)
//     const [leaveRequests, setLeaveRequests] = useState(dummyLeaveData);

//     const handleAction = (action, id) => {
//         toast.success(`Leave request ${action} successfully!`);
//     };

//     // 3. Filter logic for employee vs admin views
//     // We use a specific employeeId from your assets file to simulate the employee view
//     const displayRequests = userRole === 'admin' 
//         ? leaveRequests 
//         : leaveRequests.filter(req => req.employeeId === "69b41439f8a807df391d7b52"); 

//     return (
//         <div className="animate-fade-in pb-8 font-['Outfit'] transition-colors duration-300">
//             {/* Header */}
//             <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Leave Management</h1>
//                     <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
//                         {userRole === 'admin' ? "Review and manage employee time-off requests." : "Track your leave balance and submit new requests."}
//                     </p>
//                 </div>
                
//                 {userRole === 'employee' && (
//                     <button 
//                         onClick={() => toast.success("Leave request form opening soon!")}
//                         className="btn-primary flex items-center justify-center gap-2 cursor-pointer"
//                     >
//                         <Plus size={18} />
//                         Request Leave
//                     </button>
//                 )}
//             </div>

//             {/* Quick Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="card p-6 flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"><Clock size={24} /></div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Requests</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{userRole === 'admin' ? '1' : '0'}</h3>
//                     </div>
//                 </div>
//                 <div className="card p-6 flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><Check size={24} /></div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Approved</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{userRole === 'admin' ? '2' : '1'}</h3>
//                     </div>
//                 </div>
//                 <div className="card p-6 flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0"><Umbrella size={24} /></div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Your Leave Balance</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">14 Days</h3>
//                     </div>
//                 </div>
//             </div>

//             {/* Leave Requests Table */}
//             <div className="card overflow-hidden">
//                 <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
//                     <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Leave History</h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="table-modern">
//                         <thead>
//                             <tr>
//                                 <th>Employee</th>
//                                 <th>Leave Details</th>
//                                 <th>Applied On</th>
//                                 <th>Status</th>
//                                 {userRole === 'admin' && <th className="text-right">Actions</th>}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {displayRequests.map((request) => {
//                                 // Safely handle array or object from assets
//                                 const empData = Array.isArray(request.employee) ? request.employee[0] : request.employee;
                                
//                                 return (
//                                     <tr key={request._id}>
//                                         <td>
//                                             <p className="font-medium text-slate-900 dark:text-white">{empData?.firstName} {empData?.lastName}</p>
//                                             <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">REQ-{request._id.slice(-4).toUpperCase()}</p>
//                                         </td>
//                                         <td>
//                                             <p className="text-slate-800 dark:text-slate-200 font-medium">{request.type}</p>
//                                             <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
//                                                 <Calendar size={12} />
//                                                 <span>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</span>
//                                             </div>
//                                         </td>
//                                         <td className="text-slate-600 dark:text-slate-300">{new Date(request.createdAt).toLocaleDateString()}</td>
//                                         <td>
//                                             <span className={`badge ${
//                                                 request.status === 'APPROVED' ? 'badge-success' : 
//                                                 request.status === 'REJECTED' ? 'badge-danger' : 
//                                                 'badge-warning'
//                                             }`}>
//                                                 {request.status}
//                                             </span>
//                                         </td>
//                                         {userRole === 'admin' && (
//                                             <td className="text-right">
//                                                 {request.status === 'PENDING' ? (
//                                                     <div className="flex items-center justify-end gap-2">
//                                                         <button onClick={() => handleAction('approved', request._id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-md transition-colors cursor-pointer" title="Approve">
//                                                             <Check size={18} />
//                                                         </button>
//                                                         <button onClick={() => handleAction('rejected', request._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer" title="Reject">
//                                                             <X size={18} />
//                                                         </button>
//                                                     </div>
//                                                 ) : <span className="text-slate-400 text-sm">—</span>}
//                                             </td>
//                                         )}
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Leave;

import React, { useState, useMemo } from "react";
import { Plus, Check, X, Clock, Calendar, Search, Filter, AlertTriangle, ShieldAlert } from 'lucide-react';
import toast from "react-hot-toast";
import { dummyLeaveData, dummyEmployeeData } from "../assets/assets";

// Helper function to calculate days between two dates
const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
};

const Leave = () => {
    const userRole = localStorage.getItem("userRole") || "employee";
    const loggedInUserId = "69b411e6f8a807df391d7b13"; // John Doe's ID from our assets
    
    const [leaveRequests, setLeaveRequests] = useState(dummyLeaveData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    // Form states for the Modal
    const [leaveType, setLeaveType] = useState("CASUAL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    // --- DATA PREPARATION ---
    
    // 1. Enrich leave requests with full employee data
    const enrichedRequests = useMemo(() => {
        return leaveRequests.map(request => {
            // Handle standardizing the employee object/array from assets
            const empId = request.employeeId;
            const employeeInfo = dummyEmployeeData.find(e => e._id === empId);
            return { ...request, employeeInfo, duration: calculateDays(request.startDate, request.endDate) };
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [leaveRequests]);

    // 2. Separate Data for Roles
    const employeeRequests = enrichedRequests.filter(req => req.employeeId === loggedInUserId);
    const adminPendingQueue = enrichedRequests.filter(req => req.status === "PENDING");
    
    // 3. Employee Leave Balances (Mock allowances for the visual bars)
    const allowances = { ANNUAL: 15, CASUAL: 10, SICK: 5 };
    const usedLeaves = employeeRequests.reduce((acc, req) => {
        if (req.status === "APPROVED") acc[req.type] = (acc[req.type] || 0) + req.duration;
        return acc;
    }, { ANNUAL: 0, CASUAL: 0, SICK: 0 });

    // 4. Smart Overlap Detection (Admin Feature)
    const checkOverlap = (pendingReq) => {
        return enrichedRequests.some(approvedReq => {
            if (approvedReq.status !== "APPROVED" || approvedReq._id === pendingReq._id) return false;
            // Check if same department
            if (approvedReq.employeeInfo?.department !== pendingReq.employeeInfo?.department) return false;
            
            // Date overlap logic
            const pStart = new Date(pendingReq.startDate);
            const pEnd = new Date(pendingReq.endDate);
            const aStart = new Date(approvedReq.startDate);
            const aEnd = new Date(approvedReq.endDate);
            
            return (pStart <= aEnd && pEnd >= aStart);
        });
    };

    // --- HANDLERS ---
    
    const handleAction = (action, id) => {
        setLeaveRequests(prev => prev.map(req => 
            req._id === id ? { ...req, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : req
        ));
        toast.success(`Leave request ${action}d successfully!`);
    };

    const handleSubmitLeave = (e) => {
        e.preventDefault();
        toast.success("Leave request submitted successfully!");
        setIsModalOpen(false);
        // In a real app, you would add the new object to the leaveRequests state here
    };

    // --- TABLE FILTERING ---
    const displayRequests = (userRole === 'admin' ? enrichedRequests : employeeRequests).filter(req => {
        if (statusFilter !== "all" && req.status !== statusFilter) return false;
        if (typeFilter !== "all" && req.type !== typeFilter) return false;
        if (userRole === 'admin' && searchTerm) {
            const fullName = `${req.employeeInfo?.firstName} ${req.employeeInfo?.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) return false;
        }
        return true;
    });

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative">
            {/* Header */}
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Leave Management</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
                        {userRole === 'admin' ? "Review and manage employee time-off requests." : "Track your leave balance and submit new requests."}
                    </p>
                </div>
                
                {userRole === 'employee' && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Plus size={18} />
                        Request Leave
                    </button>
                )}
            </div>

            {/* --- ROLE BASED TOP SECTION --- */}
            {userRole === 'employee' ? (
                /* EMPLOYEE VISUAL BALANCES */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    {[
                        { type: 'ANNUAL', name: 'Annual Leave', color: 'indigo' },
                        { type: 'CASUAL', name: 'Casual Leave', color: 'emerald' },
                        { type: 'SICK', name: 'Sick Leave', color: 'amber' }
                    ].map(leave => {
                        const used = usedLeaves[leave.type];
                        const total = allowances[leave.type];
                        const percent = Math.min(100, (used / total) * 100);
                        return (
                            <div key={leave.type} className="card p-6">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{leave.name}</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{total - used} <span className="text-sm font-normal text-slate-500">days left</span></h3>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{used} / {total} used</div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                                    <div className={`bg-${leave.color}-500 h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* ADMIN PRIORITY QUEUE */
                <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-amber-500" />
                        Action Needed ({adminPendingQueue.length})
                    </h2>
                    {adminPendingQueue.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {adminPendingQueue.map(req => {
                                const hasOverlap = checkOverlap(req);
                                return (
                                    <div key={`pending-${req._id}`} className="card p-5 border-l-4 border-l-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm shrink-0">
                                                {req.employeeInfo?.firstName.charAt(0)}{req.employeeInfo?.lastName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{req.employeeInfo?.firstName} {req.employeeInfo?.lastName}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{req.type} Leave • {req.duration} Days</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleAction('approve', req._id)} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-md hover:bg-emerald-100 transition-colors cursor-pointer">Approve</button>
                                                <button onClick={() => handleAction('reject', req._id)} className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-md hover:bg-rose-100 transition-colors cursor-pointer">Reject</button>
                                            </div>
                                            {hasOverlap && (
                                                <span className="text-[10px] flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                                                    <AlertTriangle size={12} /> Dept overlap detected
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="card p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0a0f1c]">
                            All caught up! No pending leave requests.
                        </div>
                    )}
                </div>
            )}

            {/* --- FILTER BAR --- */}
            <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                {userRole === 'admin' ? (
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search size={18} /></div>
                        <input type="text" placeholder="Search employee..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                ) : (
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Leave History</div>
                )}
                
                <div className="w-full sm:w-auto flex gap-3">
                    <div className="relative w-full sm:w-40">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Filter size={14} /></div>
                        <select className="pl-8 w-full cursor-pointer" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="ANNUAL">Annual</option>
                            <option value="CASUAL">Casual</option>
                            <option value="SICK">Sick</option>
                        </select>
                    </div>
                    <select className="w-full sm:w-36 cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            {/* --- HISTORY TABLE --- */}
            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="overflow-x-auto">
                    <table className="table-modern w-full">
                        <thead>
                            <tr>
                                {userRole === 'admin' && <th>Employee</th>}
                                <th>Leave Details</th>
                                <th>Reason</th>
                                <th>Applied On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayRequests.length > 0 ? displayRequests.map((request) => (
                                <tr key={request._id}>
                                    {userRole === 'admin' && (
                                        <td>
                                            <p className="font-medium text-slate-900 dark:text-white">{request.employeeInfo?.firstName} {request.employeeInfo?.lastName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{request.employeeInfo?.department}</p>
                                        </td>
                                    )}
                                    <td>
                                        <p className="text-slate-800 dark:text-slate-200 font-medium">{request.type} <span className="text-slate-400 font-normal">({request.duration}d)</span></p>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            <Calendar size={12} />
                                            <span>{new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit'})}</span>
                                        </div>
                                    </td>
                                    <td className="max-w-[200px] truncate text-slate-600 dark:text-slate-400" title={request.reason}>
                                        {request.reason}
                                    </td>
                                    <td className="text-slate-600 dark:text-slate-400">{new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</td>
                                    <td>
                                        <span className={`badge uppercase tracking-wider text-[10px] ${
                                            request.status === 'APPROVED' ? 'badge-success' : 
                                            request.status === 'REJECTED' ? 'badge-danger' : 
                                            'badge-warning'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={userRole === 'admin' ? 5 : 4} className="text-center py-12 text-slate-500">
                                        No leave records found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- EMPLOYEE REQUEST LEAVE MODAL --- */}
            {isModalOpen && userRole === 'employee' && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Request Time Off</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitLeave} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Leave Type</label>
                                <select required value={leaveType} onChange={e => setLeaveType(e.target.value)} className="cursor-pointer">
                                    <option value="ANNUAL">Annual Leave</option>
                                    <option value="CASUAL">Casual Leave</option>
                                    <option value="SICK">Sick Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Start Date</label>
                                    <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="cursor-pointer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">End Date</label>
                                    <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="cursor-pointer" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reason for leave</label>
                                <textarea required value={reason} onChange={e => setReason(e.target.value)} placeholder="Please briefly explain why you are requesting this time off..." rows="3" className="resize-none"></textarea>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary w-full text-center cursor-pointer">Cancel</button>
                                <button type="submit" className="btn-primary w-full cursor-pointer">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leave;