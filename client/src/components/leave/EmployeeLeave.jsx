import React, { useState, useMemo } from "react";
import { Plus } from 'lucide-react';
import { dummyLeaveData, dummyEmployeeData } from "../../assets/assets";
import LeaveRequestModal from "./LeaveRequestModal";
import LeaveHistory from "./LeaveHistory";

const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
};

// Custom Circular Progress for Employee Dashboard
const CircularProgress = ({ used, total, colorClass, trailClass }) => {
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min(100, (used / total) * 100) || 0;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} className={`fill-none stroke-4 ${trailClass}`} strokeWidth="6" />
                <circle cx="40" cy="40" r={radius} className={`fill-none ${colorClass} transition-all duration-1000 ease-out`} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-900 dark:text-white">{total - used}</span>
            </div>
        </div>
    );
};

const EmployeeLeave = () => {
    const loggedInUserId = "69b411e6f8a807df391d7b13"; 
    
    const [leaveRequests, setLeaveRequests] = useState(dummyLeaveData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const employeeRequests = useMemo(() => {
        return leaveRequests
            .filter(req => req.employeeId === loggedInUserId)
            .map(request => {
                const employeeInfo = dummyEmployeeData.find(e => e._id === request.employeeId);
                return { ...request, employeeInfo, duration: calculateDays(request.startDate, request.endDate) };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [leaveRequests]);
    
    const allowances = { ANNUAL: 15, CASUAL: 10, SICK: 5 };
    const usedLeaves = employeeRequests.reduce((acc, req) => {
        if (req.status === "APPROVED") acc[req.type] = (acc[req.type] || 0) + req.duration;
        return acc;
    }, { ANNUAL: 0, CASUAL: 0, SICK: 0 });

    const handleSubmitLeave = async (formData) => {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        const newRequest = {
            _id: `lv-new-${Date.now()}`,
            employeeId: loggedInUserId,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            reason: formData.reason,
            status: "PENDING",
            createdAt: new Date().toISOString()
        };
        setLeaveRequests([newRequest, ...leaveRequests]);
    };

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">My Leave</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">Track your leave balance and submit new requests.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
                    <Plus size={18} /> Request Leave
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                {[
                    { type: 'ANNUAL', name: 'Annual Leave', stroke: 'stroke-indigo-500', trail: 'stroke-indigo-100 dark:stroke-indigo-900/30' },
                    { type: 'CASUAL', name: 'Casual Leave', stroke: 'stroke-emerald-500', trail: 'stroke-emerald-100 dark:stroke-emerald-900/30' },
                    { type: 'SICK', name: 'Sick Leave', stroke: 'stroke-amber-500', trail: 'stroke-amber-100 dark:stroke-amber-900/30' }
                ].map(leave => (
                    <div key={leave.type} className="card p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{leave.name}</p>
                            <p className="text-xs text-slate-400 mt-1">{usedLeaves[leave.type]} of {allowances[leave.type]} days used</p>
                        </div>
                        <CircularProgress used={usedLeaves[leave.type]} total={allowances[leave.type]} colorClass={leave.stroke} trailClass={leave.trail} />
                    </div>
                ))}
            </div>

            <LeaveHistory role="employee" baseRequests={employeeRequests} />
            <LeaveRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSubmitLeave} />
        </div>
    );
};

export default EmployeeLeave;