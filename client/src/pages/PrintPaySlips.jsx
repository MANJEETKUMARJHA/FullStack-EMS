

// const PrintPaySlips = () => {
//     return (
//         <div>PrintPaySlips</div>
//     )
// }

// export default PrintPaySlips;

import React from 'react';
import { X, Printer, Building2, FileSpreadsheet } from 'lucide-react';

const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
};

const PrintPayslip = ({ payslip, onClose }) => {
    if (!payslip || !payslip.employeeInfo) return null;

    const { employeeInfo, month, year, basicSalary, allowances, deductions, netSalary, status } = payslip;

    // --- PDF / Print Handler ---
    const handlePrint = () => {
        window.print(); // Triggers browser print dialog where user can select "Save as PDF"
    };

    // --- Excel (CSV) Export Handler ---
    const handleExportExcel = () => {
        // Create the rows for our Excel file
        const csvRows = [
            ["Company", "TechFlow Solutions"],
            ["Payslip For", `${getMonthName(month)} ${year}`],
            ["Status", status],
            [],
            ["--- EMPLOYEE DETAILS ---"],
            ["Name", `${employeeInfo.firstName} ${employeeInfo.lastName}`],
            ["Employee ID", `EMP-${employeeInfo._id.substring(employeeInfo._id.length - 6).toUpperCase()}`],
            ["Department", employeeInfo.department],
            ["Designation", employeeInfo.position],
            [],
            ["--- SALARY BREAKDOWN ---"],
            ["Basic Salary", basicSalary],
            ["Allowances & Bonuses", allowances],
            ["Gross Earnings", basicSalary + allowances],
            ["Taxes & Deductions", deductions],
            ["Net Pay", netSalary]
        ];

        // Convert the array to a CSV string
        const csvContent = csvRows.map(row => row.join(",")).join("\n");

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Payslip_${employeeInfo.firstName}_${getMonthName(month)}_${year}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        // z-[99999] ensures this modal sits on top of everything, including your sidebar!
        <div className="fixed inset-0 z-[99999] bg-slate-900/80 backdrop-blur-sm flex justify-center overflow-y-auto p-4 sm:p-8 print:p-0 print:bg-white print:block">
            
            {/* The A4 style paper container */}
            <div className="bg-white text-slate-900 w-full max-w-4xl min-h-[1056px] shadow-2xl relative flex flex-col print:shadow-none print:w-full print:max-w-none print:min-h-0 rounded-lg overflow-hidden">
                
                {/* --- NON-PRINTABLE CONTROLS --- */}
                <div className="bg-slate-100 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 print:hidden sticky top-0 z-10">
                    <h2 className="font-semibold text-slate-700">Payslip Preview</h2>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer">
                            <X size={16} /> Close
                        </button>
                        <button onClick={handleExportExcel} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md cursor-pointer">
                            <FileSpreadsheet size={16} /> Excel
                        </button>
                        <button onClick={handlePrint} className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-colors flex items-center gap-2 shadow-md cursor-pointer">
                            <Printer size={16} /> PDF / Print
                        </button>
                    </div>
                </div>

                {/* --- PRINTABLE CONTENT START --- */}
                <div className="p-10 md:p-16 flex-1 bg-white">
                    {/* Header: Company Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-800 pb-8 mb-8 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#4f46e5] text-white rounded-lg flex items-center justify-center shrink-0">
                                <Building2 size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">TechFlow Solutions</h1>
                                <p className="text-slate-500 text-sm">123 Tech Avenue, Silicon Valley, CA 94025</p>
                                <p className="text-slate-500 text-sm">contact@techflow.com | +1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <h2 className="text-3xl font-light text-slate-400 uppercase tracking-widest mb-2">Payslip</h2>
                            <p className="font-semibold text-lg text-slate-800">{getMonthName(month)} {year}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 border border-slate-300 text-slate-500 text-xs font-bold uppercase tracking-wider rounded">
                                Status: {status}
                            </span>
                        </div>
                    </div>

                    {/* Employee Details Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12 bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Employee Name</p>
                            <p className="font-semibold text-slate-900">{employeeInfo.firstName} {employeeInfo.lastName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Employee ID</p>
                            <p className="font-semibold text-slate-900">EMP-{employeeInfo._id.substring(employeeInfo._id.length - 6).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Department</p>
                            <p className="font-semibold text-slate-900">{employeeInfo.department}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Designation</p>
                            <p className="font-semibold text-slate-900">{employeeInfo.position}</p>
                        </div>
                    </div>

                    {/* Salary Breakdown Tables */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Earnings */}
                        <div>
                            <h3 className="font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Earnings</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Basic Salary</span>
                                    <span className="font-medium text-slate-900">${basicSalary.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Allowances & Bonuses</span>
                                    <span className="font-medium text-slate-900">${allowances.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4 pt-4 border-t border-slate-200">
                                <span className="font-bold text-slate-800">Gross Earnings</span>
                                <span className="font-bold text-slate-900">${(basicSalary + allowances).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div>
                            <h3 className="font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Deductions</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Taxes & Provident Fund</span>
                                    <span className="font-medium text-slate-900">${deductions.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4 pt-4 border-t border-slate-200">
                                <span className="font-bold text-slate-800">Total Deductions</span>
                                <span className="font-bold text-slate-900">${deductions.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Net Pay Total */}
                    <div className="bg-slate-800 text-white p-6 rounded-lg flex justify-between items-center mb-16 print:bg-slate-100 print:text-slate-900 print:border print:border-slate-300">
                        <span className="text-lg font-medium uppercase tracking-wider">Net Pay</span>
                        <span className="text-3xl font-bold">${netSalary.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>

                    {/* Footer Signatures */}
                    <div className="grid grid-cols-2 gap-8 mt-auto pt-16">
                        <div className="text-center">
                            <div className="border-b border-slate-300 w-48 mx-auto mb-2"></div>
                            <p className="text-sm font-medium text-slate-600">Employer Signature</p>
                        </div>
                        <div className="text-center">
                            <div className="border-b border-slate-300 w-48 mx-auto mb-2"></div>
                            <p className="text-sm font-medium text-slate-600">Employee Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintPayslip;