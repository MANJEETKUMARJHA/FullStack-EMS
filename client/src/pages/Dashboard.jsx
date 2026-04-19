// import { Link } from "react-router-dom";
// import { Users, Building2, CalendarDays, FileText, CircleDollarSign } from 'lucide-react';
// // We are now importing all your central data sets!
// import { 
//     dummyAdminDashboardData, 
//     dummyEmployeeDashboardData, 
//     dummyAttendanceData, 
//     dummyLeaveData, 
//     dummyEmployeeData 
// } from "../assets/assets";

// const Dashboard = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
//     const data = userRole === 'admin' ? dummyAdminDashboardData : dummyEmployeeDashboardData;

//     // --- DYNAMIC RECENT ACTIVITY ENGINE ---
    
//     // 1. Helper function to find an employee's name by their ID
//     const getEmpName = (id) => {
//         const emp = dummyEmployeeData.find(e => e._id === id);
//         return emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";
//     };

//     // 2. Convert raw Attendance data into a standard "Activity" format
//     const attendanceActivity = dummyAttendanceData.map(record => ({
//         id: `att-${record._id}`,
//         empId: record.employeeId,
//         name: getEmpName(record.employeeId),
//         action: "Clocked In",
//         time: new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         timestamp: new Date(record.checkIn).getTime(),
//         statusClass: "badge-success",
//         statusText: "Success"
//     }));

//     // 3. Convert raw Leave data into a standard "Activity" format
//     const leaveActivity = dummyLeaveData.map(record => ({
//         id: `leave-${record._id}`,
//         empId: record.employeeId,
//         name: getEmpName(record.employeeId),
//         action: "Leave Request",
//         time: new Date(record.createdAt).toLocaleDateString(), // Shows date for leave requests
//         timestamp: new Date(record.createdAt).getTime(),
//         statusClass: record.status === 'APPROVED' ? "badge-success" : record.status === 'REJECTED' ? "badge-danger" : "badge-warning",
//         statusText: record.status.charAt(0).toUpperCase() + record.status.slice(1).toLowerCase()
//     }));

//     // 4. Combine both lists, sort them by newest first
//     let recentActivity = [...attendanceActivity, ...leaveActivity].sort((a, b) => b.timestamp - a.timestamp);

//     // 5. ROLE-BASED FILTERING: If it's an employee, strip out everyone else's data!
//     if (userRole !== 'admin') {
//         // John Doe's ID from your dummyProfileData
//         const loggedInUserId = "69b411e6f8a807df391d7b13";
//         recentActivity = recentActivity.filter(activity => activity.empId === loggedInUserId);
//     }

//     // Only keep the top 5 most recent actions
//     recentActivity = recentActivity.slice(0, 5);


//     // --- STAT CARDS ENGINE ---
//     const summaryCards = userRole === 'admin' ? [
//         { title: "Total Employees", value: data.totalEmployees, icon: <Users className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Departments", value: data.totalDepartments, icon: <Building2 className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Today's Attendance", value: data.todayAttendance, icon: <CalendarDays className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Pending Leaves", value: data.pendingLeaves, icon: <FileText className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//     ] : [
//         { title: "Days Present", value: data.currentMonthAttendance, icon: <CalendarDays className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Pending Leaves", value: data.pendingLeaves, icon: <FileText className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Latest Payslip", value: `$${data.latestPayslip?.netSalary || 0}`, icon: <CircleDollarSign className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//         { title: "Department", value: data.employee?.department || "N/A", icon: <Building2 className="w-8 h-8 text-slate-600 dark:text-indigo-400" strokeWidth={1.5} /> },
//     ];

//     return (
//         <div className="animate-fade-in pb-8 transition-colors duration-300 font-['Outfit']">
//             {/* Page Header */}
//             <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     {userRole === 'admin' ? (
//                         <>
//                             <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
//                             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back, Admin — here's your overview</p>
//                         </>
//                     ) : (
//                         <>
//                             <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Welcome, {data.employee?.firstName}!</h1>
//                             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
//                                 {data.employee?.position} - {data.employee?.department}
//                             </p>
//                         </>
//                     )}
//                 </div>
                
//                 {userRole === 'admin' && (
//                     <Link to="/employees" className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto">
//                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                         </svg>
//                         Add New Employee
//                     </Link>
//                 )}
//             </div>

//             {/* Stat Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                 {summaryCards.map((card, index) => (
//                     <div 
//                         key={index} 
//                         className="bg-white dark:bg-[#121829] rounded-lg border border-slate-200 dark:border-slate-800 border-l-[3px] border-l-slate-400 dark:border-l-indigo-500 p-6 flex justify-between items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all duration-200"
//                     >
//                         <div className="flex flex-col">
//                             <h3 className="text-[13px] font-medium text-slate-600 dark:text-slate-400 mb-2">{card.title}</h3>
//                             <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{card.value}</p>
//                         </div>
//                         <div className="p-2">{card.icon}</div>
//                     </div>
//                 ))}
//             </div>

//             {/* Quick Action Buttons for Employees Only */}
//             {userRole !== 'admin' && (
//                 <div className="flex flex-wrap gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
//                     <Link to="/attendance" className="btn-primary flex items-center gap-2">
//                         Mark Attendance 
//                         <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                         </svg>
//                     </Link>
//                     <Link to="/leave" className="btn-secondary flex items-center gap-2">
//                         Apply for Leave
//                     </Link>
//                 </div>
//             )}

//             {/* Main Content Area: Split View */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                
//                 {/* Left Side: Recent Activity Table */}
//                 <div className="lg:col-span-2">
//                     <div className="card overflow-hidden">
//                         <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
//                             <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
//                             <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer">View All</button>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="table-modern w-full text-left">
//                                 <thead>
//                                     <tr>
//                                         {/* Conditionally hide the Employee name column if the user is an employee! */}
//                                         {userRole === 'admin' && <th>Employee</th>}
//                                         <th>Action</th>
//                                         <th>Time / Date</th>
//                                         <th>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {recentActivity.length > 0 ? recentActivity.map((activity) => (
//                                         <tr key={activity.id}>
//                                             {userRole === 'admin' && (
//                                                 <td className="font-medium text-slate-800 dark:text-slate-200">{activity.name}</td>
//                                             )}
//                                             <td className="text-slate-600 dark:text-slate-400">{activity.action}</td>
//                                             <td className="text-slate-500">{activity.time}</td>
//                                             <td>
//                                                 <span className={`badge ${activity.statusClass}`}>
//                                                     {activity.statusText}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     )) : (
//                                         <tr>
//                                             <td colSpan={userRole === 'admin' ? 4 : 3} className="text-center py-8 text-slate-500">
//                                                 No recent activity found.
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Side: System Notifications */}
//                 <div className="space-y-6">
//                     <div className="card dark:border-none p-6 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-none relative overflow-hidden">
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
//                         <div className="relative z-10">
//                             <h2 className="text-lg font-semibold mb-2">Payroll Due Soon</h2>
//                             <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
//                                 Don't forget to review and approve timesheets before the 25th to ensure timely payouts.
//                             </p>
//                             <Link to="/payslips" className="inline-block bg-white text-indigo-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
//                                 Review Timesheets
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React from 'react';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';

const Dashboard = () => {
    const userRole = localStorage.getItem("userRole") || "employee";

    if (userRole === 'admin') {
        return <AdminDashboard />;
    }

    return <EmployeeDashboard />;
};

export default Dashboard;