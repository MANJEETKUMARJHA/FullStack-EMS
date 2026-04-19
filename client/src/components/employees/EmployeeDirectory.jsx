import React, { useState } from "react";
import { Search, Briefcase } from 'lucide-react';
import { dummyEmployeeData, DEPARTMENTS } from "../../assets/assets";

const EmployeeDirectory = () => {
    const [employees] = useState(dummyEmployeeData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDept, setFilterDept] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    // Filter Logic
    const filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        const matchesSearch = 
            fullName.includes(searchTerm.toLowerCase()) || 
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
            emp.position.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesDept = filterDept === "all" || emp.department === filterDept;
        const matchesStatus = filterStatus === "all" || emp.employmentStatus.toLowerCase() === filterStatus.toLowerCase();
        
        return matchesSearch && matchesDept && matchesStatus;
    });

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Team Directory</h1>
                    <p className="page-subtitle text-slate-500 mt-1">Find and connect with your colleagues.</p>
                </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search colleagues..." 
                        className="pl-10 w-full" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
                
                <div className="w-full sm:w-auto flex gap-3">
                    <div className="relative">
                        <select className="cursor-pointer pl-4 pr-8" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                            <option value="all">All Departments</option>
                            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                        </select>
                    </div>
                    <div className="relative">
                        <select className="cursor-pointer pl-4 pr-8" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Employee Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <div key={emp._id} className="card bg-white dark:bg-[#121829] border border-slate-100 dark:border-slate-800 p-0 relative group overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
                            
                            <div className="p-6 flex flex-col items-center flex-1">
                                <div className="absolute top-4 left-4">
                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider rounded-md border border-slate-200 dark:border-slate-700">
                                        {emp.department}
                                    </span>
                                </div>
                                
                                <div className="absolute top-4 right-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${
                                        emp.employmentStatus === 'ACTIVE' 
                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' 
                                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                                    }`}>
                                        {emp.employmentStatus}
                                    </span>
                                </div>

                                <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl font-bold mt-6 mb-4 shadow-sm border-2 border-white dark:border-[#121829] ring-4 ring-indigo-50 dark:ring-indigo-900/20">
                                    {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                                </div>

                                <div className="text-center w-full mt-auto">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{emp.firstName} {emp.lastName}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{emp.position}</p>
                                    <p className="text-xs text-slate-400 mt-2 font-mono">ID: EMP-{emp._id.slice(-4).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121829] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <Briefcase size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                        <p className="text-lg font-medium">No colleagues found.</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDirectory;