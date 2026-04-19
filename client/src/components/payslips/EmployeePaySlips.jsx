import React, { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Download, FileText } from 'lucide-react';
import { dummyPayslipData, dummyEmployeeData } from "../../assets/assets";
import PrintPaySlips from "../../pages/PrintPaySlips"; 

const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
};

const EmployeePaySlips = () => {
    const loggedInUserId = "69b411e6f8a807df391d7b13"; 

    const initialPayslips = dummyPayslipData.map(p => ({ ...p, status: "PAID" }));
    const [payslipData] = useState(initialPayslips);
    const [selectedPayslipToPrint, setSelectedPayslipToPrint] = useState(null);

    const enrichedPayslips = useMemo(() => {
        return payslipData.map(slip => {
            const employeeInfo = dummyEmployeeData.find(e => e._id === slip.employeeId);
            return { ...slip, employeeInfo };
        }).sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            return b.month - a.month;
        });
    }, [payslipData]);

    const employeePayslips = enrichedPayslips.filter(slip => slip.employeeId === loggedInUserId);
    const latestPayslip = employeePayslips.length > 0 ? employeePayslips[0] : null;
    const recentThreePayslips = employeePayslips.slice(0, 3);

    const handleDownload = (slipObject) => {
        setSelectedPayslipToPrint(slipObject);
    };

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">My Payslips</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">View your recent earnings and download salary slips.</p>
                </div>
            </div>

            {latestPayslip && (
                <div className="card p-6 md:p-8 bg-gradient-to-br from-[#0f0c29] via-[#1b173e] to-[#302b63] border-none mb-8 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <p className="text-indigo-200 font-medium">Latest Salary Slip</p>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${latestPayslip.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                    {latestPayslip.status}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                ${latestPayslip.netSalary.toLocaleString()}
                            </h2>
                            <p className="text-indigo-300 text-sm">For {getMonthName(latestPayslip.month)} {latestPayslip.year}</p>
                        </div>

                        <div className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-indigo-100 flex items-center gap-2"><TrendingUp size={14} className="text-emerald-400"/> Basic + Allowances</span>
                                    <span className="text-white font-medium">${(latestPayslip.basicSalary + latestPayslip.allowances).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                    <span className="text-indigo-100 flex items-center gap-2"><TrendingDown size={14} className="text-rose-400"/> Deductions</span>
                                    <span className="text-white font-medium">-${latestPayslip.deductions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm pt-1">
                                    <span className="text-indigo-200 font-medium">Net Salary</span>
                                    <span className="text-emerald-400 font-bold">${latestPayslip.netSalary.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => handleDownload(latestPayslip)} className="w-full lg:w-auto bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors shadow-lg cursor-pointer shrink-0">
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>
            )}

            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileText size={20} className="text-indigo-500" />
                        Full Payslip Archive
                    </h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table-modern w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-4">Period</th>
                                <th className="p-4">Basic Salary</th>
                                <th className="p-4">Net Pay</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentThreePayslips.length > 0 ? (
                                recentThreePayslips.map((slip) => (
                                    <tr key={slip._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4">
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{getMonthName(slip.month)} {slip.year}</p>
                                        </td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">${slip.basicSalary.toLocaleString()}</td>
                                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                                            ${slip.netSalary.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${slip.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'}`}>
                                                {slip.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleDownload(slip)} className="p-2 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer inline-flex items-center" title="Download PDF">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-slate-500">
                                        No payslip records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPayslipToPrint && (
                <PrintPaySlips payslip={selectedPayslipToPrint} onClose={() => setSelectedPayslipToPrint(null)} />
            )}
        </div>
    );
};

export default EmployeePaySlips;