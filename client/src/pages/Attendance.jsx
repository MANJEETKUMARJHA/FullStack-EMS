// import { useState } from "react";
// import toast from "react-hot-toast";
// import { dummyAttendanceData, dummyEmployeeData, getWorkingHoursDisplay, getDayTypeDisplay } from "../assets/assets";
// import { CalendarDays, AlertCircle, Clock, LogIn, LogOut, Download, Search } from "lucide-react";

// const Attendance = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
    
//     const [isClockedIn, setIsClockedIn] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleClockToggle = () => {
//         const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         if (isClockedIn) {
//             toast.success(`Successfully clocked out at ${time}`);
//         } else {
//             toast.success(`Successfully clocked in at ${time}`);
//         }
//         setIsClockedIn(!isClockedIn);
//     };

//     // Combine Attendance data with Employee data so we can see their names
//     const enrichedAttendance = dummyAttendanceData.map(record => {
//         const employeeInfo = dummyEmployeeData.find(emp => emp._id === record.employeeId);
//         return { ...record, employeeInfo };
//     });

//     // Filter records based on role
//     const filteredRecords = enrichedAttendance.filter(record => {
//         // If employee, ONLY show their specific ID (using John Doe's ID from assets)
//         if (userRole === "employee" && record.employeeId !== "69b411e6f8a807df391d7b13") return false;
        
//         // If admin is searching, filter by name
//         if (searchTerm && record.employeeInfo) {
//             const fullName = `${record.employeeInfo.firstName} ${record.employeeInfo.lastName}`.toLowerCase();
//             return fullName.includes(searchTerm.toLowerCase());
//         }
//         return true;
//     });

//     return (
//         <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
//             {/* Page Header */}
//             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                 <div>
//                     <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">
//                         {userRole === 'admin' ? 'Attendance Tracking' : 'Attendance'}
//                     </h1>
//                     <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
//                         {userRole === 'admin' 
//                             ? 'Monitor daily check-ins and working hours across your team.' 
//                             : 'Track your work hours and daily check-ins'}
//                     </p>
//                 </div>
                
//                 {/* Admin Export Button (Employee button is now floating at the bottom) */}
//                 {userRole === 'admin' && (
//                     <button className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
//                         <Download size={16} />
//                         Export Report
//                     </button>
//                 )}
//             </div>

//             {/* --- ROLE BASED STAT CARDS --- */}
//             {userRole === 'employee' ? (
//                 // EMPLOYEE STAT CARDS (Matching your first image)
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                     <div className="card p-6 flex items-center gap-5">
//                         <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                             <CalendarDays size={24} strokeWidth={1.5} />
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Days Present</p>
//                             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">2</h3>
//                         </div>
//                     </div>
//                     <div className="card p-6 flex items-center gap-5">
//                         <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                             <AlertCircle size={24} strokeWidth={1.5} />
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
//                             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">0</h3>
//                         </div>
//                     </div>
//                     <div className="card p-6 flex items-center gap-5">
//                         <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
//                             <Clock size={24} strokeWidth={1.5} />
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Work Hrs</p>
//                             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">8.5 Hrs</h3>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 // ADMIN STAT CARDS & SEARCH
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                         <div className="card p-5 border-l-4 border-l-emerald-500">
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present Today</p>
//                             <div className="flex items-baseline gap-2 mt-1">
//                                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">118</h3>
//                                 <span className="text-xs text-slate-400">employees</span>
//                             </div>
//                         </div>
//                         <div className="card p-5 border-l-4 border-l-amber-500">
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
//                             <div className="flex items-baseline gap-2 mt-1">
//                                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">4</h3>
//                                 <span className="text-xs text-slate-400">employees</span>
//                             </div>
//                         </div>
//                         <div className="card p-5 border-l-4 border-l-rose-500">
//                             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent</p>
//                             <div className="flex items-baseline gap-2 mt-1">
//                                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">2</h3>
//                                 <span className="text-xs text-slate-400">employees</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
//                         <div className="relative w-full sm:w-96">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                                 <Search size={18} />
//                             </div>
//                             <input 
//                                 type="text" 
//                                 placeholder="Search by employee name..." 
//                                 className="pl-10 w-full" 
//                                 value={searchTerm} 
//                                 onChange={(e) => setSearchTerm(e.target.value)} 
//                             />
//                         </div>
//                     </div>
//                 </>
//             )}

//             {/* --- ATTENDANCE TABLE --- */}
//             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 <div className="p-5 border-b border-slate-100 dark:border-slate-800">
//                     <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="table-modern w-full">
//                         <thead>
//                             <tr>
//                                 <th>Date</th>
//                                 {/* Admin sees the Employee Name, Employees do not */}
//                                 {userRole === 'admin' && <th>Employee</th>}
//                                 <th>Check In</th>
//                                 <th>Check Out</th>
//                                 <th>Working Hours</th>
//                                 <th>Day Type</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredRecords.length > 0 ? filteredRecords.map((record) => {
//                                 const dayDisplay = getDayTypeDisplay(record);
//                                 return (
//                                     <tr key={record._id}>
//                                         <td className="font-medium text-slate-800 dark:text-slate-200">
//                                             {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
//                                         </td>
                                        
//                                         {userRole === 'admin' && (
//                                             <td>
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
                                        
//                                         <td className="text-slate-600 dark:text-slate-400">
//                                             {new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                                         </td>
//                                         <td className="text-slate-600 dark:text-slate-400">
//                                             {new Date(record.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                                         </td>
//                                         <td className="font-medium text-slate-700 dark:text-slate-300">
//                                             {getWorkingHoursDisplay(record)}
//                                         </td>
//                                         <td>
//                                             <span className="text-emerald-600 dark:text-emerald-400 text-sm">{dayDisplay.label}</span>
//                                         </td>
//                                         <td>
//                                             <span className="badge badge-success uppercase tracking-wider text-[10px]">
//                                                 {record.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 );
//                             }) : (
//                                 <tr>
//                                     <td colSpan={userRole === 'admin' ? 7 : 6} className="text-center py-8 text-slate-500">
//                                         No attendance records found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* --- FLOATING CLOCK IN BUTTON (EMPLOYEES ONLY) --- */}
//             {userRole === 'employee' && (
//                 <button 
//                     onClick={handleClockToggle}
//                     className="fixed bottom-8 right-8 z-50 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] flex items-center gap-4 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer border border-indigo-400/20"
//                 >
//                     {isClockedIn ? <LogOut size={24} /> : <LogIn size={24} />}
//                     <div className="flex flex-col text-left pr-2">
//                         <span className="font-bold text-base leading-tight">
//                             {isClockedIn ? 'Clock Out' : 'Clock In'}
//                         </span>
//                         <span className="text-indigo-200 text-[11px] tracking-wide">
//                             {isClockedIn ? 'end your work day' : 'start your work day'}
//                         </span>
//                     </div>
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Attendance;

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { dummyAttendanceData, dummyEmployeeData, getWorkingHoursDisplay, getDayTypeDisplay } from "../assets/assets";
import { CalendarDays, AlertCircle, Clock, LogIn, LogOut, Download, Search, Filter } from "lucide-react";

const Attendance = () => {
    const userRole = localStorage.getItem("userRole") || "employee";
    
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // NEW: Status filter state for the Admin portal
    const [statusFilter, setStatusFilter] = useState("all");

    const handleClockToggle = () => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (isClockedIn) {
            toast.success(`Successfully clocked out at ${time}`);
        } else {
            toast.success(`Successfully clocked in at ${time}`);
        }
        setIsClockedIn(!isClockedIn);
    };

    // --- DATA GENERATION ENGINE ---
    
    // 1. Employee View: Only show their specific historical records
    const employeeHistory = useMemo(() => {
        return dummyAttendanceData
            .filter(record => record.employeeId === "69b411e6f8a807df391d7b13") // John Doe's ID
            .map(record => {
                const employeeInfo = dummyEmployeeData.find(emp => emp._id === record.employeeId);
                return { ...record, employeeInfo };
            });
    }, []);

    // 2. Admin View: Create a comprehensive "Daily Roster" of all 20 employees
    const adminDailyRoster = useMemo(() => {
        return dummyEmployeeData.map((emp, index) => {
            // Check if they have a real record in the database
            const record = dummyAttendanceData.find(att => att.employeeId === emp._id);
            if (record) return { ...record, employeeInfo: emp };

            // If no record exists, dynamically determine their status so the Admin sees everyone!
            let status = "ABSENT";
            let checkIn = null;
            
            if (emp.employmentStatus === "ON LEAVE" || emp.employmentStatus === "INACTIVE") {
                status = "ON LEAVE";
            } else if (index % 3 === 0) { // Simulating some users being present
                status = "PRESENT";
                checkIn = "2026-03-15T08:50:00.000Z";
            } else if (index % 7 === 0) { // Simulating some users being late
                status = "LATE";
                checkIn = "2026-03-15T10:15:00.000Z";
            }

            return {
                _id: `roster-${emp._id}`,
                employeeId: emp._id,
                employeeInfo: emp,
                date: "2026-03-15T18:30:00.000Z", // Fixed "Today" date for the mock
                checkIn: checkIn,
                checkOut: null,
                status: status,
                workingHours: checkIn ? 8 : null,
                dayType: checkIn ? "Full Day" : null
            };
        });
    }, []);

    // 3. Apply Filters based on Role
    const baseRecords = userRole === 'admin' ? adminDailyRoster : employeeHistory;

    const filteredRecords = baseRecords.filter(record => {
        // Apply Search Filter
        if (searchTerm && record.employeeInfo) {
            const fullName = `${record.employeeInfo.firstName} ${record.employeeInfo.lastName}`.toLowerCase();
            if (!fullName.includes(searchTerm.toLowerCase())) return false;
        }
        
        // NEW: Apply Status Filter (Admin Only)
        if (userRole === 'admin' && statusFilter !== "all") {
            if (record.status !== statusFilter) return false;
        }
        
        return true;
    });

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
            {/* Page Header */}
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">
                        {userRole === 'admin' ? 'Attendance Tracking' : 'Attendance'}
                    </h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
                        {userRole === 'admin' 
                            ? 'Monitor daily check-ins and working hours across your team.' 
                            : 'Track your work hours and daily check-ins'}
                    </p>
                </div>
                
                {userRole === 'admin' && (
                    <button className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
                        <Download size={16} />
                        Export Report
                    </button>
                )}
            </div>

            {/* --- ROLE BASED STAT CARDS & CONTROLS --- */}
            {userRole === 'employee' ? (
                // EMPLOYEE UI
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <div className="card p-6 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <CalendarDays size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Days Present</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">2</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <AlertCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">0</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <Clock size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Work Hrs</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">8.5 Hrs</h3>
                        </div>
                    </div>
                </div>
            ) : (
                // ADMIN UI: Stats & NEW Filters
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        <div className="card p-5 border-l-4 border-l-emerald-500">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Present Today</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">10</h3>
                                <span className="text-xs text-slate-400">employees</span>
                            </div>
                        </div>
                        <div className="card p-5 border-l-4 border-l-amber-500">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Late Arrivals</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">2</h3>
                                <span className="text-xs text-slate-400">employees</span>
                            </div>
                        </div>
                        <div className="card p-5 border-l-4 border-l-rose-500">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent / Not Clocked In</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">8</h3>
                                <span className="text-xs text-slate-400">employees</span>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Admin Filter Bar */}
                    <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full sm:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Search size={18} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by employee name..." 
                                className="pl-10 w-full" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                            />
                        </div>
                        
                        <div className="w-full sm:w-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Filter size={16} />
                            </div>
                            <select 
                                className="pl-10 w-full sm:w-56 cursor-pointer" 
                                value={statusFilter} 
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="PRESENT">Present</option>
                                <option value="LATE">Late</option>
                                <option value="ABSENT">Absent</option>
                                <option value="ON LEAVE">On Leave</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            {/* --- ATTENDANCE TABLE --- */}
            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {userRole === 'admin' ? "Today's Daily Roster" : "Recent Activity"}
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-modern w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                {userRole === 'admin' && <th>Employee</th>}
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Working Hours</th>
                                <th>Day Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? filteredRecords.map((record) => {
                                const dayDisplay = getDayTypeDisplay(record);
                                return (
                                    <tr key={record._id}>
                                        <td className="font-medium text-slate-800 dark:text-slate-200">
                                            {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                                        </td>
                                        
                                        {userRole === 'admin' && (
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {record.employeeInfo?.firstName.charAt(0)}{record.employeeInfo?.lastName.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-slate-900 dark:text-white">
                                                        {record.employeeInfo?.firstName} {record.employeeInfo?.lastName}
                                                    </span>
                                                </div>
                                            </td>
                                        )}
                                        
                                        {/* Updated to safely handle ABSENT employees with no CheckIn data */}
                                        <td className="text-slate-600 dark:text-slate-400">
                                            {record.checkIn ? new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                                        </td>
                                        <td className="text-slate-600 dark:text-slate-400">
                                            {record.checkOut ? new Date(record.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                                        </td>
                                        <td className="font-medium text-slate-700 dark:text-slate-300">
                                            {getWorkingHoursDisplay(record)}
                                        </td>
                                        <td>
                                            <span className="text-emerald-600 dark:text-emerald-400 text-sm">
                                                {dayDisplay.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge uppercase tracking-wider text-[10px] ${
                                                record.status === 'PRESENT' ? 'badge-success' :
                                                record.status === 'ABSENT' ? 'badge-danger' :
                                                record.status === 'LATE' ? 'badge-warning' :
                                                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={userRole === 'admin' ? 7 : 6} className="text-center py-12 text-slate-500">
                                        No attendance records found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- FLOATING CLOCK IN BUTTON (EMPLOYEES ONLY) --- */}
            {userRole === 'employee' && (
                <button 
                    onClick={handleClockToggle}
                    className="fixed bottom-8 right-8 z-50 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] flex items-center gap-4 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer border border-indigo-400/20"
                >
                    {isClockedIn ? <LogOut size={24} /> : <LogIn size={24} />}
                    <div className="flex flex-col text-left pr-2">
                        <span className="font-bold text-base leading-tight">
                            {isClockedIn ? 'Clock Out' : 'Clock In'}
                        </span>
                        <span className="text-indigo-200 text-[11px] tracking-wide">
                            {isClockedIn ? 'end your work day' : 'start your work day'}
                        </span>
                    </div>
                </button>
            )}
        </div>
    );
};

export default Attendance;