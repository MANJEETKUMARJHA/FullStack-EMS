// import React from 'react';
// import { CalendarDays, AlertCircle, Clock } from "lucide-react";

// const AttendanceStats = ({ role, stats }) => {
//     if (role === 'employee') {
//         return (
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                 <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
//                     <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                         <CalendarDays size={24} strokeWidth={1.5} />
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Days Present</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.daysPresent}</h3>
//                     </div>
//                 </div>
//                 <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
//                     <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                         <AlertCircle size={24} strokeWidth={1.5} />
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lateArrivals}</h3>
//                     </div>
//                 </div>
//                 <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
//                     <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                         <Clock size={24} strokeWidth={1.5} />
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Work Hrs</p>
//                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.avgHours}</h3>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//             <div className="card p-5 border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
//                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present Today</p>
//                 <div className="flex items-baseline gap-2 mt-1">
//                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.present}</h3>
//                     <span className="text-xs text-slate-400">employees</span>
//                 </div>
//             </div>
//             <div className="card p-5 border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
//                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
//                 <div className="flex items-baseline gap-2 mt-1">
//                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.late}</h3>
//                     <span className="text-xs text-slate-400">employees</span>
//                 </div>
//             </div>
//             <div className="card p-5 border-l-4 border-l-rose-500 hover:shadow-md transition-shadow">
//                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent / Not Clocked In</p>
//                 <div className="flex items-baseline gap-2 mt-1">
//                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.absent}</h3>
//                     <span className="text-xs text-slate-400">employees</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AttendanceStats;

import React from 'react';
import { CalendarDays, AlertCircle, Clock, Users, UserX, TrendingUp, TrendingDown, Minus } from "lucide-react";

const AttendanceStats = ({ role, stats }) => {
    
    // --- EMPLOYEE VIEW ---
    if (role === 'employee') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                        <CalendarDays size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Days Present</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.daysPresent}</h3>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                        <AlertCircle size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lateArrivals}</h3>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                        <Clock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Work Hrs</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.avgHours}</h3>
                    </div>
                </div>
            </div>
        );
    }

    // --- PREMIUM ADMIN VIEW ---
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            
            {/* Present Card */}
            <div className="card p-5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-4 border-t-emerald-500 isolate">
                <div 
                    className="absolute -right-4 -bottom-4 pointer-events-none transition-transform duration-500 group-hover:scale-110" 
                    style={{ zIndex: -1, opacity: 0.1 }}
                >
                    <Users size={120} className="text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="relative">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present Today</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.present}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                        <TrendingUp size={14} /> <span>+5% vs yesterday</span>
                    </div>
                </div>
            </div>

            {/* Late Card */}
            <div className="card p-5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-4 border-t-amber-500 isolate">
                <div 
                    className="absolute -right-4 -bottom-4 pointer-events-none transition-transform duration-500 group-hover:scale-110" 
                    style={{ zIndex: -1, opacity: 0.1 }}
                >
                    <Clock size={120} className="text-amber-500" strokeWidth={1.5} />
                </div>
                <div className="relative">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.late}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 w-fit px-2 py-1 rounded-md">
                        <Minus size={14} /> <span>Same as yesterday</span>
                    </div>
                </div>
            </div>

            {/* Absent Card */}
            <div className="card p-5 relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-4 border-t-rose-500 isolate">
                <div 
                    className="absolute -right-4 -bottom-4 pointer-events-none transition-transform duration-500 group-hover:scale-110" 
                    style={{ zIndex: -1, opacity: 0.1 }}
                >
                    <UserX size={120} className="text-rose-500" strokeWidth={1.5} />
                </div>
                <div className="relative">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent / Not Clocked In</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.absent}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                        <TrendingDown size={14} /> <span>-2% vs yesterday</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AttendanceStats;