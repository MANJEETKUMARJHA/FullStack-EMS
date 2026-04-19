// import React, { useState } from 'react';
// import { Search, Filter } from "lucide-react";
// import { getWorkingHoursDisplay, getDayTypeDisplay } from "../../assets/assets";

// const AttendanceHistory = ({ role, baseRecords }) => {
    
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");

//     const filteredRecords = baseRecords.filter(record => {
//         if (searchTerm && record.employeeInfo) {
//             const fullName = `${record.employeeInfo.firstName} ${record.employeeInfo.lastName}`.toLowerCase();
//             if (!fullName.includes(searchTerm.toLowerCase())) return false;
//         }
//         if (role === 'admin' && statusFilter !== "all") {
//             if (record.status !== statusFilter) return false;
//         }
//         return true;
//     });

//     return (
//         <>
//             {/* Filter Bar (Admin Only) */}
//             {role === 'admin' && (
//                 <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
//                     <div className="relative w-full sm:w-96">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                             <Search size={18} />
//                         </div>
//                         <input 
//                             type="text" 
//                             placeholder="Search by employee name..." 
//                             className="pl-10 w-full" 
//                             value={searchTerm} 
//                             onChange={(e) => setSearchTerm(e.target.value)} 
//                         />
//                     </div>
                    
//                     <div className="w-full sm:w-auto relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                             <Filter size={16} />
//                         </div>
//                         <select 
//                             className="pl-10 w-full sm:w-56 cursor-pointer" 
//                             value={statusFilter} 
//                             onChange={(e) => setStatusFilter(e.target.value)}
//                         >
//                             <option value="all">All Statuses</option>
//                             <option value="PRESENT">Present</option>
//                             <option value="LATE">Late</option>
//                             <option value="ABSENT">Absent</option>
//                             <option value="ON LEAVE">On Leave</option>
//                         </select>
//                     </div>
//                 </div>
//             )}

//             {/* The Table */}
//             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 <div className="p-5 border-b border-slate-100 dark:border-slate-800">
//                     <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//                         {role === 'admin' ? "Today's Daily Roster" : "Recent Activity"}
//                     </h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="table-modern w-full">
//                         <thead>
//                             <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider text-left">
//                                 <th className="p-4 font-medium">Date</th>
//                                 {role === 'admin' && <th className="p-4 font-medium">Employee</th>}
//                                 <th className="p-4 font-medium">Check In</th>
//                                 <th className="p-4 font-medium">Check Out</th>
//                                 <th className="p-4 font-medium">Working Hours</th>
//                                 <th className="p-4 font-medium">Day Type</th>
//                                 <th className="p-4 font-medium">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                             {filteredRecords.length > 0 ? filteredRecords.map((record) => {
//                                 const dayDisplay = getDayTypeDisplay(record);
//                                 return (
//                                     <tr key={record._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
//                                         <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
//                                             {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
//                                         </td>
                                        
//                                         {role === 'admin' && (
//                                             <td className="p-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
//                                                         {record.employeeInfo?.firstName.charAt(0)}{record.employeeInfo?.lastName.charAt(0)}
//                                                     </div>
//                                                     <span className="font-medium text-slate-900 dark:text-white">
//                                                         {record.employeeInfo?.firstName} {record.employeeInfo?.lastName}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                         )}
                                        
//                                         <td className="p-4 text-slate-600 dark:text-slate-400">
//                                             {record.checkIn ? new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
//                                         </td>
//                                         <td className="p-4 text-slate-600 dark:text-slate-400">
//                                             {record.checkOut ? new Date(record.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
//                                         </td>
//                                         <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
//                                             {getWorkingHoursDisplay(record)}
//                                         </td>
//                                         <td className="p-4">
//                                             <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
//                                                 {dayDisplay.label}
//                                             </span>
//                                         </td>
//                                         <td className="p-4">
//                                             <span className={`badge uppercase tracking-wider text-[10px] ${
//                                                 record.status === 'PRESENT' ? 'badge-success' :
//                                                 record.status === 'ABSENT' ? 'badge-danger' :
//                                                 record.status === 'LATE' ? 'badge-warning' :
//                                                 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
//                                             }`}>
//                                                 {record.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 );
//                             }) : (
//                                 <tr>
//                                     <td colSpan={role === 'admin' ? 7 : 6} className="text-center py-12 text-slate-500">
//                                         No attendance records found matching your filters.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AttendanceHistory;

import React, { useState } from 'react';
import { Search, Calendar, Mail, Edit2 } from "lucide-react";
import { getWorkingHoursDisplay, getDayTypeDisplay } from "../../assets/assets";

const AttendanceHistory = ({ role, baseRecords }) => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Apply filters
    const filteredRecords = baseRecords.filter(record => {
        if (searchTerm && record.employeeInfo) {
            const fullName = `${record.employeeInfo.firstName} ${record.employeeInfo.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) return false;
        }
        if (role === 'admin' && statusFilter !== "all") {
            if (record.status !== statusFilter) return false;
        }
        return true;
    });

    // Helper for Status Dots
    const getStatusColor = (status) => {
        switch(status) {
            case 'PRESENT': return 'bg-emerald-500 border-emerald-100 dark:border-[#121829]';
            case 'LATE': return 'bg-amber-500 border-amber-100 dark:border-[#121829]';
            case 'ABSENT': return 'bg-rose-500 border-rose-100 dark:border-[#121829]';
            default: return 'bg-slate-400 border-slate-100 dark:border-[#121829]';
        }
    };

    return (
        <>
            {/* --- UPGRADED ADMIN FILTER BAR --- */}
            {role === 'admin' && (
                <div className="card p-3 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-[#121829] shadow-sm">
                    
                    {/* Search & Date Picker Group */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div className="relative w-full sm:w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Search size={16} />
                            </div>
                            {/* FIX: Added proper border width classes and pl-10 for padding */}
                            <input 
                                type="text" 
                                placeholder="Search employee..." 
                                className="pl-10 pr-4 text-sm w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                            />
                        </div>
                        <div className="relative w-full sm:w-48">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Calendar size={16} />
                            </div>
                            {/* FIX: Added proper border width classes and pl-10 for padding */}
                            <input 
                                type="date" 
                                className="pl-10 pr-4 text-sm w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition-all [color-scheme:light] dark:[color-scheme:dark]" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)} 
                            />
                        </div>
                    </div>
                    
                    {/* Segmented Pill Filters */}
                    <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
                        {['all', 'PRESENT', 'LATE', 'ABSENT', 'ON LEAVE'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setStatusFilter(filter)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize whitespace-nowrap transition-all ${
                                    statusFilter === filter 
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                            >
                                {filter.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- UPGRADED TABLE --- */}
            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {role === 'admin' ? "Daily Roster" : "Recent Activity"}
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-modern w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-left">
                                <th className="p-4 font-medium">Date</th>
                                {role === 'admin' && <th className="p-4 font-medium">Employee</th>}
                                <th className="p-4 font-medium">Check In</th>
                                <th className="p-4 font-medium">Check Out</th>
                                <th className="p-4 font-medium">Working Hours</th>
                                <th className="p-4 font-medium">Status</th>
                                {role === 'admin' && <th className="p-4 font-medium text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredRecords.length > 0 ? filteredRecords.map((record) => {
                                const isAbsent = record.status === 'ABSENT' || record.status === 'ON LEAVE';
                                const isLate = record.status === 'LATE';
                                
                                return (
                                    <tr key={record._id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors relative">
                                        
                                        {/* Date */}
                                        <td className="p-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                                            {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}
                                        </td>
                                        
                                        {/* Employee with Live Status Dot */}
                                        {role === 'admin' && (
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-9 w-9 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100 dark:border-indigo-800">
                                                        {record.employeeInfo?.firstName.charAt(0)}{record.employeeInfo?.lastName.charAt(0)}
                                                        {/* The Status Dot */}
                                                        <span className={`absolute bottom-0 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${getStatusColor(record.status)}`}></span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-sm text-slate-900 dark:text-white block leading-tight">
                                                            {record.employeeInfo?.firstName} {record.employeeInfo?.lastName}
                                                        </span>
                                                        <span className="text-[11px] text-slate-500">{record.employeeInfo?.position || 'Employee'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                        
                                        {/* Colored Time Indicators */}
                                        <td className={`p-4 text-sm font-medium ${isAbsent ? 'text-slate-300 dark:text-slate-600' : isLate ? 'text-amber-600 dark:text-amber-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {record.checkIn ? new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                                        </td>
                                        <td className={`p-4 text-sm font-medium ${isAbsent ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {record.checkOut ? new Date(record.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                                        </td>
                                        
                                        {/* De-emphasized missing data */}
                                        <td className={`p-4 text-sm font-semibold ${isAbsent ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {getWorkingHoursDisplay(record) || '—'}
                                        </td>
                                        
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                                                record.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                                                record.status === 'ABSENT' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' :
                                                record.status === 'LATE' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                                                'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            }`}>
                                                {record.status}
                                            </span>
                                        </td>

                                        {/* FIX: Removed opacity-0 so actions are always visible */}
                                        {role === 'admin' && (
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2 transition-opacity duration-200">
                                                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-colors" title="Message Employee">
                                                        <Mail size={16} />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md transition-colors" title="Edit Record">
                                                        <Edit2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={role === 'admin' ? 7 : 6} className="text-center py-16 text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Calendar size={32} className="text-slate-300 dark:text-slate-600 mb-2" />
                                            <p>No attendance records found matching your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AttendanceHistory;