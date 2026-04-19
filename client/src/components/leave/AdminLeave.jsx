import React, { useState, useMemo } from "react";
import { Check, X, AlertTriangle, ShieldAlert } from 'lucide-react';
import toast from "react-hot-toast";
import { dummyLeaveData, dummyEmployeeData } from "../../assets/assets";
import LeaveHistory from "./LeaveHistory";

const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
};

const AdminLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState(dummyLeaveData);
    const [selectedLeaves, setSelectedLeaves] = useState([]); 

    const enrichedRequests = useMemo(() => {
        return leaveRequests.map(request => {
            const employeeInfo = dummyEmployeeData.find(e => e._id === request.employeeId);
            return { ...request, employeeInfo, duration: calculateDays(request.startDate, request.endDate) };
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [leaveRequests]);

    const adminPendingQueue = enrichedRequests.filter(req => req.status === "PENDING");

    const checkOverlap = (pendingReq) => {
        return enrichedRequests.some(approvedReq => {
            if (approvedReq.status !== "APPROVED" || approvedReq._id === pendingReq._id) return false;
            if (approvedReq.employeeInfo?.department !== pendingReq.employeeInfo?.department) return false;
            const pStart = new Date(pendingReq.startDate), pEnd = new Date(pendingReq.endDate);
            const aStart = new Date(approvedReq.startDate), aEnd = new Date(approvedReq.endDate);
            return (pStart <= aEnd && pEnd >= aStart);
        });
    };

    const handleSingleAction = (action, id) => {
        setLeaveRequests(prev => prev.map(req => req._id === id ? { ...req, status: action } : req));
        toast.success(`Leave request ${action.toLowerCase()}!`);
    };

    const handleBulkAction = (action) => {
        if (selectedLeaves.length === 0) return;
        setLeaveRequests(prev => prev.map(req => selectedLeaves.includes(req._id) ? { ...req, status: action } : req));
        toast.success(`Processed ${selectedLeaves.length} requests!`);
        setSelectedLeaves([]);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) setSelectedLeaves(adminPendingQueue.map(req => req._id));
        else setSelectedLeaves([]);
    };

    const handleSelectOne = (e, id) => {
        if (e.target.checked) setSelectedLeaves([...selectedLeaves, id]);
        else setSelectedLeaves(selectedLeaves.filter(leafId => leafId !== id));
    };

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Leave Requests</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">Review and manage employee time-off requests.</p>
                </div>
            </div>

            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <ShieldAlert size={20} className="text-amber-500" />
                        Action Needed ({adminPendingQueue.length})
                    </h2>
                    {selectedLeaves.length > 0 && (
                        <div className="flex gap-2 animate-fade-in">
                            <button onClick={() => handleBulkAction("APPROVED")} className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer hover:bg-emerald-700 transition-colors">Approve ({selectedLeaves.length})</button>
                            <button onClick={() => handleBulkAction("REJECTED")} className="px-4 py-1.5 bg-rose-600 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer hover:bg-rose-700 transition-colors">Reject ({selectedLeaves.length})</button>
                        </div>
                    )}
                </div>

                {adminPendingQueue.length > 0 ? (
                    <div className="card overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                                    <th className="p-4 w-10"><input type="checkbox" onChange={handleSelectAll} checked={selectedLeaves.length === adminPendingQueue.length && adminPendingQueue.length > 0} className="cursor-pointer rounded border-slate-300 text-indigo-600" /></th>
                                    <th className="p-4 font-medium">Employee</th>
                                    <th className="p-4 font-medium">Duration</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {adminPendingQueue.map(req => {
                                    const hasOverlap = checkOverlap(req);
                                    return (
                                        <tr key={`queue-${req._id}`} className={`transition-colors ${hasOverlap ? 'bg-amber-50/30 dark:bg-amber-500/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'}`}>
                                            <td className="p-4"><input type="checkbox" checked={selectedLeaves.includes(req._id)} onChange={(e) => handleSelectOne(e, req._id)} className="cursor-pointer rounded border-slate-300 text-indigo-600" /></td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex justify-center items-center font-bold text-xs">{req.employeeInfo?.firstName.charAt(0)}{req.employeeInfo?.lastName.charAt(0)}</div>
                                                    <div><p className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{req.employeeInfo?.firstName} {req.employeeInfo?.lastName}</p></div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{req.type} Leave <span className="text-slate-400 font-normal">({req.duration}d)</span></p>
                                                {hasOverlap && <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1 font-medium"><AlertTriangle size={10} /> Overlap Warning</span>}
                                            </td>
                                            <td className="p-4 text-right flex justify-end gap-2">
                                                <button onClick={() => handleSingleAction('APPROVED', req._id)} className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 rounded-md cursor-pointer transition-colors"><Check size={16} /></button>
                                                <button onClick={() => handleSingleAction('REJECTED', req._id)} className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 rounded-md cursor-pointer transition-colors"><X size={16} /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="card p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0a0f1c]">All caught up! No pending leave requests.</div>
                )}
            </div>

            <LeaveHistory role="admin" baseRequests={enrichedRequests} />
        </div>
    );
};

export default AdminLeave;