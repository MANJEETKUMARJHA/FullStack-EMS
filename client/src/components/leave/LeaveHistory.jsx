// import React, { useState } from 'react';
// import { Search, Filter, Calendar, ChevronDown, ChevronUp } from "lucide-react";

// const LeaveHistory = ({ role, baseRequests }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [typeFilter, setTypeFilter] = useState("all");
//     const [expandedRow, setExpandedRow] = useState(null);

//     const displayRequests = baseRequests.filter(req => {
//         if (statusFilter !== "all" && req.status !== statusFilter) return false;
//         if (typeFilter !== "all" && req.type !== typeFilter) return false;
//         if (role === 'admin' && searchTerm) {
//             const fullName = `${req.employeeInfo?.firstName} ${req.employeeInfo?.lastName}`.toLowerCase();
//             if (!fullName.includes(searchTerm.toLowerCase())) return false;
//         }
//         return true;
//     });

//     const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);

//     return (
//         <>
//             <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
//                 {role === 'admin' ? (
//                     <div className="relative w-full sm:w-96">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search size={18} /></div>
//                         <input type="text" placeholder="Search employee..." className="pl-10 pr-4 text-sm w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                     </div>
//                 ) : (
//                     <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Leave History</div>
//                 )}
                
//                 <div className="w-full sm:w-auto flex gap-3">
//                     <div className="relative w-full sm:w-40">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Filter size={14} /></div>
//                         <select className="pl-10 pr-4 w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition-all" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//                             <option value="all">All Types</option>
//                             <option value="ANNUAL">Annual</option>
//                             <option value="CASUAL">Casual</option>
//                             <option value="SICK">Sick</option>
//                         </select>
//                     </div>
//                     <select className="px-4 w-full sm:w-36 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition-all" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//                         <option value="all">All Statuses</option>
//                         <option value="APPROVED">Approved</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="REJECTED">Rejected</option>
//                     </select>
//                 </div>
//             </div>

//             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 <div className="overflow-x-auto">
//                     <table className="table-modern w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
//                                 {role === 'admin' && <th className="p-4 font-medium">Employee</th>}
//                                 <th className="p-4 font-medium">Details</th>
//                                 <th className="p-4 font-medium">Applied</th>
//                                 <th className="p-4 font-medium">Status</th>
//                                 <th className="p-4 w-10"></th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                             {displayRequests.length > 0 ? displayRequests.map((request) => (
//                                 <React.Fragment key={request._id}>
//                                     <tr onClick={() => toggleRow(request._id)} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors group">
//                                         {role === 'admin' && (
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
//                                                         {request.employeeInfo?.firstName.charAt(0)}{request.employeeInfo?.lastName.charAt(0)}
//                                                     </div>
//                                                     <div>
//                                                         <p className="font-semibold text-slate-900 dark:text-white leading-tight">{request.employeeInfo?.firstName} {request.employeeInfo?.lastName}</p>
//                                                         <p className="text-xs text-slate-500">{request.employeeInfo?.department}</p>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         )}
//                                         <td className="p-4">
//                                             <p className="font-medium text-slate-800 dark:text-slate-200">{request.type} <span className="text-slate-400 font-normal">({request.duration}d)</span></p>
//                                             <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
//                                                 <Calendar size={12} /> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
//                                             </div>
//                                         </td>
//                                         <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">{new Date(request.createdAt).toLocaleDateString()}</td>
//                                         <td className="p-4">
//                                             <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
//                                                 request.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 
//                                                 request.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
//                                                 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
//                                             }`}>
//                                                 {request.status}
//                                             </span>
//                                         </td>
//                                         <td className="p-4 text-slate-400 group-hover:text-indigo-500 transition-colors">
//                                             {expandedRow === request._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                                         </td>
//                                     </tr>
//                                     {expandedRow === request._id && (
//                                         <tr className="bg-slate-50/50 dark:bg-slate-800/10 border-none">
//                                             <td colSpan={role === 'admin' ? 5 : 4} className="p-6 pt-2">
//                                                 <div className="bg-white dark:bg-[#121829] p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
//                                                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reason for Request</h4>
//                                                     <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-indigo-200 dark:border-indigo-900/50 pl-3">"{request.reason}"</p>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             )) : (
//                                 <tr><td colSpan={role === 'admin' ? 5 : 4} className="text-center py-12 text-slate-500">No leave records found matching your filters.</td></tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default LeaveHistory;.

import React, { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const LeaveHistory = ({ role, baseRequests }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [expandedRow, setExpandedRow] = useState(null);

    const displayRequests = baseRequests.filter(req => {
        if (statusFilter !== "all" && req.status !== statusFilter) return false;
        if (typeFilter !== "all" && req.type !== typeFilter) return false;
        if (role === 'admin' && searchTerm) {
            const fullName = `${req.employeeInfo?.firstName} ${req.employeeInfo?.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) return false;
        }
        return true;
    });

    const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);

    return (
        <>
            <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Search Bar */}
                {role === 'admin' ? (
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search employee..." 
                            className="pl-10 pr-4 text-sm w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                    </div>
                ) : (
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 px-2">Leave History</div>
                )}
                
                {/* Filters */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                    
                    {/* Type Filter */}
                    <div className="relative w-full sm:w-44">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Filter size={14} />
                        </div>
                        <select 
                            className="pl-9 pr-4 w-full bg-slate-50 dark:bg-[#1e2538] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition-all" 
                            value={typeFilter} 
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            {/* Explicitly styling the options forces the browser to respect the theme */}
                            <option value="all" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">All Types</option>
                            <option value="ANNUAL" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Annual</option>
                            <option value="CASUAL" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Casual</option>
                            <option value="SICK" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Sick</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <select 
                        className="px-4 w-full sm:w-40 bg-slate-50 dark:bg-[#1e2538] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition-all" 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {/* Explicitly styling the options forces the browser to respect the theme */}
                        <option value="all" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">All Statuses</option>
                        <option value="APPROVED" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Approved</option>
                        <option value="PENDING" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Pending</option>
                        <option value="REJECTED" className="bg-white dark:bg-[#1e2538] text-slate-900 dark:text-white">Rejected</option>
                    </select>
                </div>
            </div>

            {/* --- ACCORDION HISTORY TABLE --- */}
            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="overflow-x-auto">
                    <table className="table-modern w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                                {role === 'admin' && <th className="p-4 font-medium">Employee</th>}
                                <th className="p-4 font-medium">Details</th>
                                <th className="p-4 font-medium">Applied</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {displayRequests.length > 0 ? displayRequests.map((request) => (
                                <React.Fragment key={request._id}>
                                    <tr onClick={() => toggleRow(request._id)} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors group">
                                        {role === 'admin' && (
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-200 dark:border-indigo-800">
                                                        {request.employeeInfo?.firstName.charAt(0)}{request.employeeInfo?.lastName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-white leading-tight">{request.employeeInfo?.firstName} {request.employeeInfo?.lastName}</p>
                                                        <p className="text-xs text-slate-500">{request.employeeInfo?.department}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                        <td className="p-4">
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{request.type} <span className="text-slate-400 font-normal">({request.duration}d)</span></p>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                                <Calendar size={12} /> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">{new Date(request.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                                                request.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 
                                                request.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                                                'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                                            }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-400 group-hover:text-indigo-500 transition-colors">
                                            {expandedRow === request._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </td>
                                    </tr>
                                    {/* EXPANDED ROW DETAIL VIEW */}
                                    {expandedRow === request._id && (
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/10 border-none">
                                            <td colSpan={role === 'admin' ? 5 : 4} className="p-6 pt-2">
                                                <div className="bg-white dark:bg-[#121829] p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reason for Request</h4>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-indigo-200 dark:border-indigo-900/50 pl-3">"{request.reason}"</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) : (
                                <tr><td colSpan={role === 'admin' ? 5 : 4} className="text-center py-12 text-slate-500">No leave records found matching your filters.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeaveHistory;