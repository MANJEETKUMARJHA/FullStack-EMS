import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import { Users, Building2, CalendarDays, FileText } from 'lucide-react';
import { dummyAdminDashboardData, dummyAttendanceData, dummyLeaveData, dummyEmployeeData } from "../../assets/assets";
import RecentActivity from './RecentActivity';

const AdminDashboard = () => {
    
    // --- ACTIVITY ENGINE (Admin sees everyone) ---
    const recentActivity = useMemo(() => {
        const getEmpName = (id) => {
            const emp = dummyEmployeeData.find(e => e._id === id);
            return emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";
        };

        const attendanceActivity = dummyAttendanceData.map(record => ({
            id: `att-${record._id}`,
            empId: record.employeeId,
            name: getEmpName(record.employeeId),
            action: "Clocked In",
            time: new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date(record.checkIn).getTime(),
            statusClass: "badge-success",
            statusText: "Success"
        }));

        const leaveActivity = dummyLeaveData.map(record => ({
            id: `leave-${record._id}`,
            empId: record.employeeId,
            name: getEmpName(record.employeeId),
            action: "Leave Request",
            time: new Date(record.createdAt).toLocaleDateString(),
            timestamp: new Date(record.createdAt).getTime(),
            statusClass: record.status === 'APPROVED' ? "badge-success" : record.status === 'REJECTED' ? "badge-danger" : "badge-warning",
            statusText: record.status
        }));

        return [...attendanceActivity, ...leaveActivity]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5); // Top 5
    }, []);

    const cards = [
        { title: "Total Employees", value: dummyAdminDashboardData.totalEmployees, icon: <Users size={24} /> },
        { title: "Departments", value: dummyAdminDashboardData.totalDepartments, icon: <Building2 size={24} /> },
        { title: "Today's Attendance", value: dummyAdminDashboardData.todayAttendance, icon: <CalendarDays size={24} /> },
        { title: "Pending Leaves", value: dummyAdminDashboardData.pendingLeaves, icon: <FileText size={24} /> },
    ];

    return (
        <div className="animate-fade-in pb-8 font-['Outfit']">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back — here's your company overview.</p>
                </div>
                <Link to="/employees" className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto">
                    <Users size={16} /> Add New Employee
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                {cards.map((card, index) => (
                    <div key={index} className="card p-6 border-l-[3px] border-l-indigo-500 flex justify-between items-center group hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col">
                            <h3 className="text-[13px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">{card.title}</h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{card.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                {/* Left Side: Recent Activity */}
                <div className="lg:col-span-2">
                    <RecentActivity role="admin" activities={recentActivity} />
                </div>

                {/* Right Side: System Notifications */}
                <div className="space-y-6">
                    <div className="card dark:border-none p-6 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-none relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={18} className="text-indigo-300" />
                                <h2 className="text-lg font-semibold">Payroll Due Soon</h2>
                            </div>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                Don't forget to review and approve timesheets before the 25th to ensure timely payouts.
                            </p>
                            <Link to="/payslips" className="inline-block bg-white text-indigo-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer">
                                Review Timesheets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;