import { useState } from "react";
import toast from "react-hot-toast";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

const Employees = () => {
    const userRole = localStorage.getItem("userRole") || "employee";
    
    const [employees] = useState(dummyEmployeeData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDept, setFilterDept] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const handleAddEmployee = () => {
        toast.success("Add Employee form coming soon!");
    };

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
        <div className="animate-fade-in pb-8 font-['Outfit']">
            {/* Page Header */}
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title">Employee Directory</h1>
                    <p className="page-subtitle">Manage your team members and their account access.</p>
                </div>
                
                {userRole === 'admin' && (
                    <button onClick={handleAddEmployee} className="btn-primary flex items-center justify-center gap-2 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Employee
                    </button>
                )}
            </div>

            {/* Filter & Search Toolbar */}
            <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" placeholder="Search by name, role, or department..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                
                <div className="w-full sm:w-auto flex gap-3">
                    <select className="cursor-pointer" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                        <option value="all">All Depts</option>
                        {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <select className="cursor-pointer" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Employee Table */}
            <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="overflow-x-auto">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>ID</th>
                                <th>Role & Dept</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp) => (
                                    <tr key={emp._id} className="group">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                                                    {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-white">{emp.firstName} {emp.lastName}</div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-400">{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm font-medium text-slate-600 dark:text-slate-400">EMP-{emp._id.slice(-4).toUpperCase()}</td>
                                        <td>
                                            <div className="text-sm text-slate-900 dark:text-slate-200">{emp.position}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{emp.department}</div>
                                        </td>
                                        <td>
                                            <span className={`badge ${ emp.employmentStatus === 'ACTIVE' ? 'badge-success' : 'badge-danger' }`}>
                                                {emp.employmentStatus}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            {userRole === 'admin' && (
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer" title="Edit">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer" title="Delete">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        No employees found matching your active filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Employees;