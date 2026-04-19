import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import { CalendarDays, FileText, CircleDollarSign, Building2, CheckCircle, Plus } from 'lucide-react';
import { dummyEmployeeDashboardData, dummyAttendanceData, dummyLeaveData } from "../../assets/assets";
import RecentActivity from './RecentActivity';

const EmployeeDashboard = () => {
    const loggedInUserId = "69b411e6f8a807df391d7b13"; // John Doe's ID
    const data = dummyEmployeeDashboardData;

    // --- ACTIVITY ENGINE (Employee only sees their own) ---
    const recentActivity = useMemo(() => {
        const attendanceActivity = dummyAttendanceData
            .filter(r => r.employeeId === loggedInUserId)
            .map(record => ({
                id: `att-${record._id}`,
                action: "Clocked In",
                time: new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: new Date(record.checkIn).getTime(),
                statusClass: "badge-success",
                statusText: "Success"
            }));

        const leaveActivity = dummyLeaveData
            .filter(r => r.employeeId === loggedInUserId)
            .map(record => ({
                id: `leave-${record._id}`,
                action: "Leave Request",
                time: new Date(record.createdAt).toLocaleDateString(),
                timestamp: new Date(record.createdAt).getTime(),
                statusClass: record.status === 'APPROVED' ? "badge-success" : record.status === 'REJECTED' ? "badge-danger" : "badge-warning",
                statusText: record.status
            }));

        return [...attendanceActivity, ...leaveActivity]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5);
    }, []);

    const cards = [
        { title: "Days Present", value: data.currentMonthAttendance, icon: <CalendarDays size={24} /> },
        { title: "Pending Leaves", value: data.pendingLeaves, icon: <FileText size={24} /> },
        { title: "Latest Payslip", value: `$${data.latestPayslip?.netSalary || 0}`, icon: <CircleDollarSign size={24} /> },
        { title: "Department", value: data.employee?.department || "N/A", icon: <Building2 size={24} /> },
    ];

    return (
        <div className="animate-fade-in pb-8 font-['Outfit']">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Welcome, {data.employee?.firstName}!</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {data.employee?.position} - {data.employee?.department}
                    </p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                {cards.map((card, index) => (
                    <div key={index} className="card p-6 border-l-[3px] border-l-indigo-500 flex justify-between items-center group hover:shadow-md transition-shadow">
                        <div className="flex flex-col">
                            <h3 className="text-[13px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">{card.title}</h3>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{card.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                <Link to="/attendance" className="btn-primary flex items-center gap-2 shadow-md shadow-indigo-500/20">
                    <CheckCircle size={18} /> Mark Attendance
                </Link>
                <Link to="/leave" className="btn-secondary flex items-center gap-2">
                    <Plus size={18} /> Apply for Leave
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                
                {/* Left Side: Recent Activity */}
                <div className="lg:col-span-2">
                    <RecentActivity role="employee" activities={recentActivity} />
                </div>

                {/* Right Side: System Notifications */}
                <div className="space-y-6">
                    <div className="card dark:border-none p-6 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-none relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <CircleDollarSign size={18} className="text-indigo-300" />
                                <h2 className="text-lg font-semibold">Payslip Available</h2>
                            </div>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                Your payslip for the last month has been generated and is now available for download.
                            </p>
                            <Link to="/payslips" className="inline-block bg-white text-indigo-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer">
                                View Payslip
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;