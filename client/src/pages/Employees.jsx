// // // import { useState } from "react";
// // // import toast from "react-hot-toast";
// // // import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

// // // const Employees = () => {
// // //     const userRole = localStorage.getItem("userRole") || "employee";
    
// // //     const [employees] = useState(dummyEmployeeData);
// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const [filterDept, setFilterDept] = useState("all");
// // //     const [filterStatus, setFilterStatus] = useState("all");

// // //     const handleAddEmployee = () => {
// // //         toast.success("Add Employee form coming soon!");
// // //     };

// // //     const filteredEmployees = employees.filter(emp => {
// // //         const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
// // //         const matchesSearch = 
// // //             fullName.includes(searchTerm.toLowerCase()) || 
// // //             emp.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
// // //             emp.position.toLowerCase().includes(searchTerm.toLowerCase());
            
// // //         const matchesDept = filterDept === "all" || emp.department === filterDept;
// // //         const matchesStatus = filterStatus === "all" || emp.employmentStatus.toLowerCase() === filterStatus.toLowerCase();
        
// // //         return matchesSearch && matchesDept && matchesStatus;
// // //     });

// // //     return (
// // //         <div className="animate-fade-in pb-8 font-['Outfit']">
// // //             {/* Page Header */}
// // //             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
// // //                 <div>
// // //                     <h1 className="page-title">Employee Directory</h1>
// // //                     <p className="page-subtitle">Manage your team members and their account access.</p>
// // //                 </div>
                
// // //                 {userRole === 'admin' && (
// // //                     <button onClick={handleAddEmployee} className="btn-primary flex items-center justify-center gap-2 cursor-pointer">
// // //                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
// // //                         Add Employee
// // //                     </button>
// // //                 )}
// // //             </div>

// // //             {/* Filter & Search Toolbar */}
// // //             <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
// // //                 <div className="relative w-full sm:w-96">
// // //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
// // //                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
// // //                     </div>
// // //                     <input type="text" placeholder="Search by name, role, or department..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //                 </div>
                
// // //                 <div className="w-full sm:w-auto flex gap-3">
// // //                     <select className="cursor-pointer" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
// // //                         <option value="all">All Depts</option>
// // //                         {DEPARTMENTS.map(dept => (
// // //                             <option key={dept} value={dept}>{dept}</option>
// // //                         ))}
// // //                     </select>
// // //                     <select className="cursor-pointer" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
// // //                         <option value="all">All Statuses</option>
// // //                         <option value="active">Active</option>
// // //                         <option value="inactive">Inactive</option>
// // //                     </select>
// // //                 </div>
// // //             </div>

// // //             {/* Employee Table */}
// // //             <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
// // //                 <div className="overflow-x-auto">
// // //                     <table className="table-modern">
// // //                         <thead>
// // //                             <tr>
// // //                                 <th>Employee</th>
// // //                                 <th>ID</th>
// // //                                 <th>Role & Dept</th>
// // //                                 <th>Status</th>
// // //                                 <th className="text-right">Actions</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {filteredEmployees.length > 0 ? (
// // //                                 filteredEmployees.map((emp) => (
// // //                                     <tr key={emp._id} className="group">
// // //                                         <td>
// // //                                             <div className="flex items-center gap-3">
// // //                                                 <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
// // //                                                     {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
// // //                                                 </div>
// // //                                                 <div>
// // //                                                     <div className="font-medium text-slate-900 dark:text-white">{emp.firstName} {emp.lastName}</div>
// // //                                                     <div className="text-sm text-slate-500 dark:text-slate-400">{emp.email}</div>
// // //                                                 </div>
// // //                                             </div>
// // //                                         </td>
// // //                                         <td className="text-sm font-medium text-slate-600 dark:text-slate-400">EMP-{emp._id.slice(-4).toUpperCase()}</td>
// // //                                         <td>
// // //                                             <div className="text-sm text-slate-900 dark:text-slate-200">{emp.position}</div>
// // //                                             <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{emp.department}</div>
// // //                                         </td>
// // //                                         <td>
// // //                                             <span className={`badge ${ emp.employmentStatus === 'ACTIVE' ? 'badge-success' : 'badge-danger' }`}>
// // //                                                 {emp.employmentStatus}
// // //                                             </span>
// // //                                         </td>
// // //                                         <td className="text-right">
// // //                                             {userRole === 'admin' && (
// // //                                                 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
// // //                                                     <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer" title="Edit">
// // //                                                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
// // //                                                     </button>
// // //                                                     <button className="p-2 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer" title="Delete">
// // //                                                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
// // //                                                     </button>
// // //                                                 </div>
// // //                                             )}
// // //                                         </td>
// // //                                     </tr>
// // //                                 ))
// // //                             ) : (
// // //                                 <tr>
// // //                                     <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
// // //                                         No employees found matching your active filters.
// // //                                     </td>
// // //                                 </tr>
// // //                             )}
// // //                         </tbody>
// // //                     </table>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Employees;

// // import { useState } from "react";
// // import toast from "react-hot-toast";
// // import { Search, Filter, Plus, Edit2, Trash2, AlertTriangle, Briefcase } from 'lucide-react';
// // import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

// // const Employees = () => {
// //     const userRole = localStorage.getItem("userRole") || "employee";
    
// //     // States
// //     const [employees, setEmployees] = useState(dummyEmployeeData);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [filterDept, setFilterDept] = useState("all");
// //     const [filterStatus, setFilterStatus] = useState("all");
    
// //     // New State for the Delete Confirmation Modal
// //     const [employeeToDelete, setEmployeeToDelete] = useState(null);

// //     // Handlers
// //     const handleAddEmployee = () => {
// //         toast.success("Add Employee form coming soon!");
// //     };

// //     const handleEditEmployee = (emp) => {
// //         toast.success(`Editing profile for ${emp.firstName}`);
// //     };

// //     const confirmDelete = () => {
// //         if (employeeToDelete) {
// //             // Filter out the deleted employee from the state
// //             setEmployees(employees.filter(emp => emp._id !== employeeToDelete._id));
// //             toast.success(`${employeeToDelete.firstName} has been removed from the system.`);
// //             setEmployeeToDelete(null); // Close the modal
// //         }
// //     };

// //     // Filter Logic
// //     const filteredEmployees = employees.filter(emp => {
// //         const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
// //         const matchesSearch = 
// //             fullName.includes(searchTerm.toLowerCase()) || 
// //             emp.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
// //             emp.position.toLowerCase().includes(searchTerm.toLowerCase());
            
// //         const matchesDept = filterDept === "all" || emp.department === filterDept;
// //         const matchesStatus = filterStatus === "all" || emp.employmentStatus.toLowerCase() === filterStatus.toLowerCase();
        
// //         return matchesSearch && matchesDept && matchesStatus;
// //     });

// //     return (
// //         <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
// //             {/* Page Header */}
// //             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
// //                 <div>
// //                     <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Employees</h1>
// //                     <p className="page-subtitle text-slate-500 mt-1">Manage your team members and their account access.</p>
// //                 </div>
                
// //                 {userRole === 'admin' && (
// //                     <button onClick={handleAddEmployee} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
// //                         <Plus size={18} /> Add Employee
// //                     </button>
// //                 )}
// //             </div>

// //             {/* Filter & Search Toolbar */}
// //             <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
// //                 <div className="relative w-full sm:w-96">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
// //                         <Search size={18} />
// //                     </div>
// //                     <input 
// //                         type="text" 
// //                         placeholder="Search employees..." 
// //                         className="pl-10 w-full" 
// //                         value={searchTerm} 
// //                         onChange={(e) => setSearchTerm(e.target.value)} 
// //                     />
// //                 </div>
                
// //                 <div className="w-full sm:w-auto flex gap-3">
// //                     <div className="relative">
// //                         <select className="cursor-pointer pl-4 pr-8" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
// //                             <option value="all">All Departments</option>
// //                             {DEPARTMENTS.map(dept => (
// //                                 <option key={dept} value={dept}>{dept}</option>
// //                             ))}
// //                         </select>
// //                     </div>
// //                     <div className="relative">
// //                         <select className="cursor-pointer pl-4 pr-8" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
// //                             <option value="all">All Statuses</option>
// //                             <option value="active">Active</option>
// //                             <option value="inactive">Inactive</option>
// //                         </select>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Employee Grid View */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
// //                 {filteredEmployees.length > 0 ? (
// //                     filteredEmployees.map((emp) => (
// //                         <div key={emp._id} className="card bg-white dark:bg-[#121829] border border-slate-100 dark:border-slate-800 p-0 relative group overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
                            
// //                             {/* Card Content Area */}
// //                             <div className="p-6 flex flex-col items-center flex-1">
// //                                 {/* Department Pill - Top Left */}
// //                                 <div className="absolute top-4 left-4">
// //                                     <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider rounded-md border border-slate-200 dark:border-slate-700">
// //                                         {emp.department}
// //                                     </span>
// //                                 </div>
                                
// //                                 {/* Status Dot - Top Right */}
// //                                 <div className="absolute top-4 right-4 flex items-center gap-1.5">
// //                                     <span className={`w-2 h-2 rounded-full ${emp.employmentStatus === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-rose-500'}`}></span>
// //                                 </div>

// //                                 {/* Avatar */}
// //                                 <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl font-bold mt-6 mb-4 shadow-sm border-2 border-white dark:border-[#121829] ring-4 ring-indigo-50 dark:ring-indigo-900/20">
// //                                     {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
// //                                 </div>

// //                                 {/* Details */}
// //                                 <div className="text-center w-full mt-auto">
// //                                     <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{emp.firstName} {emp.lastName}</h3>
// //                                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{emp.position}</p>
// //                                     <p className="text-xs text-slate-400 mt-2 font-mono">ID: EMP-{emp._id.slice(-4).toUpperCase()}</p>
// //                                 </div>
// //                             </div>

// //                             {/* Hover Actions Bar (Admin Only) */}
// //                             {userRole === 'admin' && (
// //                                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-indigo-50/95 via-indigo-50/80 to-transparent dark:from-slate-800/95 dark:via-slate-800/80 pt-12 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
// //                                     <button 
// //                                         onClick={() => handleEditEmployee(emp)} 
// //                                         className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-indigo-600 dark:text-indigo-400 shadow-md hover:scale-110 hover:text-indigo-700 flex items-center justify-center transition-all cursor-pointer border border-indigo-100 dark:border-indigo-900"
// //                                         title="Edit"
// //                                     >
// //                                         <Edit2 size={16} />
// //                                     </button>
// //                                     <button 
// //                                         onClick={() => setEmployeeToDelete(emp)} 
// //                                         className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-rose-500 shadow-md hover:scale-110 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer border border-rose-100 dark:border-rose-900/30"
// //                                         title="Delete"
// //                                     >
// //                                         <Trash2 size={16} />
// //                                     </button>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121829] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
// //                         <Briefcase size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
// //                         <p className="text-lg font-medium">No employees found.</p>
// //                         <p className="text-sm mt-1">Try adjusting your search or filters.</p>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* --- DELETE CONFIRMATION MODAL --- */}
// //             {employeeToDelete && (
// //                 <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
// //                     <div className="bg-white dark:bg-[#121829] rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-800">
// //                         <div className="p-6">
// //                             <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
// //                                 <AlertTriangle size={32} className="text-rose-500 dark:text-rose-400" />
// //                             </div>
                            
// //                             <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
// //                                 Delete Employee
// //                             </h3>
                            
// //                             <p className="text-center text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
// //                                 Are you sure you want to remove <strong className="text-slate-800 dark:text-slate-200">{employeeToDelete.firstName} {employeeToDelete.lastName}</strong> from the system? This action cannot be undone.
// //                             </p>
                            
// //                             <div className="flex gap-3">
// //                                 <button 
// //                                     onClick={() => setEmployeeToDelete(null)} 
// //                                     className="btn-secondary flex-1 cursor-pointer"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button 
// //                                     onClick={confirmDelete} 
// //                                     className="bg-rose-500 hover:bg-rose-600 text-white flex-1 rounded-lg font-medium transition-colors cursor-pointer shadow-md"
// //                                 >
// //                                     Yes, Delete
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //         </div>
// //     );
// // };

// // export default Employees;

// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Search, Filter, Plus, Edit2, Trash2, AlertTriangle, Briefcase } from 'lucide-react';
// import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

// const Employees = () => {
//     const userRole = localStorage.getItem("userRole") || "employee";
    
//     // States
//     const [employees, setEmployees] = useState(dummyEmployeeData);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterDept, setFilterDept] = useState("all");
//     const [filterStatus, setFilterStatus] = useState("all");
    
//     // New State for the Delete Confirmation Modal
//     const [employeeToDelete, setEmployeeToDelete] = useState(null);

//     // Handlers
//     const handleAddEmployee = () => {
//         toast.success("Add Employee form coming soon!");
//     };

//     const handleEditEmployee = (emp) => {
//         toast.success(`Editing profile for ${emp.firstName}`);
//     };

//     const confirmDelete = () => {
//         if (employeeToDelete) {
//             // Filter out the deleted employee from the state
//             setEmployees(employees.filter(emp => emp._id !== employeeToDelete._id));
//             toast.success(`${employeeToDelete.firstName} has been removed from the system.`);
//             setEmployeeToDelete(null); // Close the modal
//         }
//     };

//     // Filter Logic
//     const filteredEmployees = employees.filter(emp => {
//         const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
//         const matchesSearch = 
//             fullName.includes(searchTerm.toLowerCase()) || 
//             emp.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
//             emp.position.toLowerCase().includes(searchTerm.toLowerCase());
            
//         const matchesDept = filterDept === "all" || emp.department === filterDept;
//         const matchesStatus = filterStatus === "all" || emp.employmentStatus.toLowerCase() === filterStatus.toLowerCase();
        
//         return matchesSearch && matchesDept && matchesStatus;
//     });

//     return (
//         <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            
//             {/* Page Header */}
//             <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                 <div>
//                     <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Employees</h1>
//                     <p className="page-subtitle text-slate-500 mt-1">Manage your team members and their account access.</p>
//                 </div>
                
//                 {userRole === 'admin' && (
//                     <button onClick={handleAddEmployee} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
//                         <Plus size={18} /> Add Employee
//                     </button>
//                 )}
//             </div>

//             {/* Filter & Search Toolbar */}
//             <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
//                 <div className="relative w-full sm:w-96">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                         <Search size={18} />
//                     </div>
//                     <input 
//                         type="text" 
//                         placeholder="Search employees..." 
//                         className="pl-10 w-full" 
//                         value={searchTerm} 
//                         onChange={(e) => setSearchTerm(e.target.value)} 
//                     />
//                 </div>
                
//                 <div className="w-full sm:w-auto flex gap-3">
//                     <div className="relative">
//                         <select className="cursor-pointer pl-4 pr-8" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
//                             <option value="all">All Departments</option>
//                             {DEPARTMENTS.map(dept => (
//                                 <option key={dept} value={dept}>{dept}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="relative">
//                         <select className="cursor-pointer pl-4 pr-8" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//                             <option value="all">All Statuses</option>
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* Employee Grid View */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
//                 {filteredEmployees.length > 0 ? (
//                     filteredEmployees.map((emp) => (
//                         <div key={emp._id} className="card bg-white dark:bg-[#121829] border border-slate-100 dark:border-slate-800 p-0 relative group overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
                            
//                             {/* Card Content Area */}
//                             <div className="p-6 flex flex-col items-center flex-1">
//                                 {/* Department Pill - Top Left */}
//                                 <div className="absolute top-4 left-4">
//                                     <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider rounded-md border border-slate-200 dark:border-slate-700">
//                                         {emp.department}
//                                     </span>
//                                 </div>
                                
//                                 {/* Status Text Pill - Top Right */}
//                                 <div className="absolute top-4 right-4">
//                                     <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${
//                                         emp.employmentStatus === 'ACTIVE' 
//                                         ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' 
//                                         : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
//                                     }`}>
//                                         {emp.employmentStatus}
//                                     </span>
//                                 </div>

//                                 {/* Avatar */}
//                                 <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl font-bold mt-6 mb-4 shadow-sm border-2 border-white dark:border-[#121829] ring-4 ring-indigo-50 dark:ring-indigo-900/20">
//                                     {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
//                                 </div>

//                                 {/* Details */}
//                                 <div className="text-center w-full mt-auto">
//                                     <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{emp.firstName} {emp.lastName}</h3>
//                                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{emp.position}</p>
//                                     <p className="text-xs text-slate-400 mt-2 font-mono">ID: EMP-{emp._id.slice(-4).toUpperCase()}</p>
//                                 </div>
//                             </div>

//                             {/* Hover Actions Bar (Admin Only) */}
//                             {userRole === 'admin' && (
//                                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-indigo-50/95 via-indigo-50/80 to-transparent dark:from-slate-800/95 dark:via-slate-800/80 pt-12 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
//                                     <button 
//                                         onClick={() => handleEditEmployee(emp)} 
//                                         className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-indigo-600 dark:text-indigo-400 shadow-md hover:scale-110 hover:text-indigo-700 flex items-center justify-center transition-all cursor-pointer border border-indigo-100 dark:border-indigo-900"
//                                         title="Edit"
//                                     >
//                                         <Edit2 size={16} />
//                                     </button>
//                                     <button 
//                                         onClick={() => setEmployeeToDelete(emp)} 
//                                         className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-rose-500 shadow-md hover:scale-110 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer border border-rose-100 dark:border-rose-900/30"
//                                         title="Delete"
//                                     >
//                                         <Trash2 size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121829] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
//                         <Briefcase size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
//                         <p className="text-lg font-medium">No employees found.</p>
//                         <p className="text-sm mt-1">Try adjusting your search or filters.</p>
//                     </div>
//                 )}
//             </div>

//             {/* --- DELETE CONFIRMATION MODAL --- */}
//             {employeeToDelete && (
//                 <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
//                     <div className="bg-white dark:bg-[#121829] rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-800">
//                         <div className="p-6">
//                             <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
//                                 <AlertTriangle size={32} className="text-rose-500 dark:text-rose-400" />
//                             </div>
                            
//                             <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
//                                 Delete Employee
//                             </h3>
                            
//                             <p className="text-center text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
//                                 Are you sure you want to remove <strong className="text-slate-800 dark:text-slate-200">{employeeToDelete.firstName} {employeeToDelete.lastName}</strong> from the system? This action cannot be undone.
//                             </p>
                            
//                             <div className="flex gap-3">
//                                 <button 
//                                     onClick={() => setEmployeeToDelete(null)} 
//                                     className="btn-secondary flex-1 cursor-pointer"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     onClick={confirmDelete} 
//                                     className="bg-rose-500 hover:bg-rose-600 text-white flex-1 rounded-lg font-medium transition-colors cursor-pointer shadow-md"
//                                 >
//                                     Yes, Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Employees;

import { useState } from "react";
import toast from "react-hot-toast";
import { Search, Plus, Edit2, Trash2, AlertTriangle, Briefcase } from 'lucide-react';
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import EmployeeFormModal from "../components/EmployeeFormModal" // <-- Import the new modal!

const Employees = () => {
    const userRole = localStorage.getItem("userRole") || "employee";
    
    // States
    const [employees, setEmployees] = useState(dummyEmployeeData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDept, setFilterDept] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    
    // Modal States
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    // --- HANDLERS ---
    
    // Opens the modal with a blank form
    const handleAddEmployeeClick = () => {
        setEmployeeToEdit(null); // Ensure it's null so the form is blank
        setIsFormModalOpen(true);
    };

    // Opens the modal with pre-filled data
    const handleEditEmployeeClick = (emp) => {
        setEmployeeToEdit(emp); // Pass the specific employee object
        setIsFormModalOpen(true);
    };

    // Receives data back from the modal when user clicks "Save"
    const handleSaveEmployee = (formData) => {
        if (employeeToEdit) {
            // EDIT EXISTING: Map over employees and replace the one with the matching ID
            setEmployees(employees.map(emp => emp._id === employeeToEdit._id ? { ...emp, ...formData } : emp));
            toast.success("Employee updated successfully!");
        } else {
            // ADD NEW: Create a fake ID and push to the array
            const newEmployee = {
                ...formData,
                _id: `emp-new-${Date.now()}` // Generate a temporary ID
            };
            setEmployees([newEmployee, ...employees]);
            toast.success("New employee added successfully!");
        }
        setIsFormModalOpen(false); // Close modal
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            setEmployees(employees.filter(emp => emp._id !== employeeToDelete._id));
            toast.success(`${employeeToDelete.firstName} has been removed.`);
            setEmployeeToDelete(null);
        }
    };

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
            
            {/* Page Header */}
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Employees</h1>
                    <p className="page-subtitle text-slate-500 mt-1">Manage your team members and their account access.</p>
                </div>
                
                {userRole === 'admin' && (
                    <button onClick={handleAddEmployeeClick} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-[0_4px_14px_0_rgb(79,70,229,0.3)] hover:-translate-y-0.5 cursor-pointer">
                        <Plus size={18} /> Add Employee
                    </button>
                )}
            </div>

            {/* Filter & Search Toolbar */}
            <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search size={18} />
                    </div>
                    <input type="text" placeholder="Search employees..." className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

                            {userRole === 'admin' && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-indigo-50/95 via-indigo-50/80 to-transparent dark:from-slate-800/95 dark:via-slate-800/80 pt-12 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <button 
                                        onClick={() => handleEditEmployeeClick(emp)} 
                                        className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-indigo-600 dark:text-indigo-400 shadow-md hover:scale-110 hover:text-indigo-700 flex items-center justify-center transition-all cursor-pointer border border-indigo-100 dark:border-indigo-900"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => setEmployeeToDelete(emp)} 
                                        className="w-10 h-10 rounded-full bg-white dark:bg-[#121829] text-rose-500 shadow-md hover:scale-110 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer border border-rose-100 dark:border-rose-900/30"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121829] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <Briefcase size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                        <p className="text-lg font-medium">No employees found.</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* --- FORM MODAL FOR ADD/EDIT --- */}
            <EmployeeFormModal 
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                employeeData={employeeToEdit}
                onSave={handleSaveEmployee}
            />

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {employeeToDelete && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#121829] rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-800">
                        <div className="p-6">
                            <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
                                <AlertTriangle size={32} className="text-rose-500 dark:text-rose-400" />
                            </div>
                            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                                Delete Employee
                            </h3>
                            <p className="text-center text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                Are you sure you want to remove <strong className="text-slate-800 dark:text-slate-200">{employeeToDelete.firstName} {employeeToDelete.lastName}</strong> from the system? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setEmployeeToDelete(null)} className="btn-secondary flex-1 cursor-pointer">
                                    Cancel
                                </button>
                                <button onClick={confirmDelete} className="bg-rose-500 hover:bg-rose-600 text-white flex-1 rounded-lg font-medium transition-colors cursor-pointer shadow-md">
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Employees;