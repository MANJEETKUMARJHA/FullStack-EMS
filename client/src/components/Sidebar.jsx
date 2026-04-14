// import React, { useEffect, useState } from "react";
// import { useLocation, NavLink, useNavigate } from "react-router-dom";
// import { dummyProfileData } from "../assets/assets"; 
// import { 
//     Menu, 
//     LayoutDashboard, 
//     Users, 
//     CalendarDays, 
//     Umbrella, 
//     CircleDollarSign, 
//     Settings, 
//     LogOut,
//     Sun,     // Added Sun icon
//     Moon     // Added Moon icon
// } from 'lucide-react';

// const Sidebar = () => {
//     const { pathname } = useLocation();
//     const navigate = useNavigate();
//     const [userName, setUserName] = useState('Loading...');
//     const [userInitial, setUserInitial] = useState('U'); 
//     const [mobileOpen, setMobileOpen] = useState(false);
    
//     // --- DARK MODE STATE LOGIC ---
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     const userRole = localStorage.getItem("userRole") || "employee";

//     useEffect(() => {
//         const fName = dummyProfileData?.firstName || "Admin";
//         const lName = dummyProfileData?.lastName || "User";
//         setUserName(`${fName} ${lName}`);
//         setUserInitial(fName.charAt(0).toUpperCase()); 

//         // Check for saved dark mode preference when app loads
//         if (localStorage.getItem('theme') === 'dark') {
//             setIsDarkMode(true);
//             document.documentElement.classList.add('dark');
//         }
//     }, []);

//     useEffect(() => {
//         setMobileOpen(false);
//     }, [pathname]);

//     const handleLogout = () => {
//         localStorage.removeItem("userRole");
//         navigate("/login");
//     };

//     // --- DARK MODE TOGGLE HANDLER ---
//     const toggleTheme = () => {
//         if (isDarkMode) {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('theme', 'light');
//             setIsDarkMode(false);
//         } else {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('theme', 'dark');
//             setIsDarkMode(true);
//         }
//     };

//     const navItems = [
//         { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//         { name: "Employees", path: "/employees", icon: Users },
//         { name: "Attendance", path: "/attendance", icon: CalendarDays },
//         { name: "Leave", path: "/leave", icon: Umbrella },
//         { name: "PaySlips", path: "/payslips", icon: CircleDollarSign },
//         { name: "Settings", path: "/setting", icon: Settings },
//     ];

//     const slidebarContent = (
//         <div className="flex flex-col h-full bg-[#0a0f1c] text-slate-300 font-['Outfit'] border-r border-slate-800">
//             {/* Header / Logo */}
//             <div className="p-6 pb-4">
//                 <div className="flex items-center gap-3 mb-6">
//                     <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
//                         E
//                     </div>
//                     <div>
//                         <h2 className="text-lg font-bold text-white tracking-tight leading-tight">Employee MS</h2>
//                         <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Management System</p>
//                     </div>
//                 </div>

//                 {/* User Profile Card */}
//                 <div className="bg-[#121829] p-3 rounded-xl border border-slate-800 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-[#1e293b] rounded-lg flex items-center justify-center text-slate-300 font-semibold text-lg">
//                         {userInitial}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                         <p className="text-sm font-semibold text-white truncate">{userName}</p>
//                         <p className="text-xs text-slate-500 capitalize">{userRole}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="px-4 py-2 flex-1 overflow-y-auto custom-scrollbar">
//                 <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Navigation</p>
//                 <nav className="space-y-1">
//                     {navItems.map((item) => {
//                         const Icon = item.icon;
//                         return (
//                             <NavLink
//                                 key={item.name}
//                                 to={item.path}
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
//                                         isActive
//                                             ? "bg-[#1e1b4b] text-indigo-400 font-medium border border-indigo-900/50"
//                                             : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
//                                     }`
//                                 }
//                             >
//                                 {({ isActive }) => (
//                                     <>
//                                         {Icon && <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />}
//                                         <span>{item.name}</span>
//                                     </>
//                                 )}
//                             </NavLink>
//                         );
//                     })}
//                 </nav>
//             </div>

//             {/* Footer / System Actions */}
//             <div className="p-4 border-t border-slate-800 space-y-1">
                
//                 {/* 1. Theme Toggle Button */}
//                 <button 
//                     onClick={toggleTheme}
//                     className="flex items-center justify-between px-3 py-2.5 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium cursor-pointer"
//                 >
//                     <div className="flex items-center gap-3">
//                         {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
//                         <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//                     </div>
//                 </button>

//                 {/* 2. Log Out Button */}
//                 <button 
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-3 py-2.5 w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-sm font-medium cursor-pointer"
//                 >
//                     <LogOut size={18} />
//                     <span>Log out</span>
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <>
//             <button 
//                 onClick={() => setMobileOpen(true)} 
//                 className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-slate-700 cursor-pointer"
//             >
//                 <Menu size={20} />
//             </button>

//             {mobileOpen && (
//                 <div 
//                     className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity' 
//                     onClick={() => setMobileOpen(false)}
//                 />
//             )}

//             <aside 
//                 className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
//                     mobileOpen ? 'translate-x-0' : '-translate-x-full'
//                 }`}
//             >
//                 {slidebarContent}
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { dummyProfileData } from "../assets/assets"; 
import { 
    Menu, 
    LayoutDashboard, 
    Users, 
    CalendarDays, 
    Umbrella, 
    CircleDollarSign, 
    Settings, 
    LogOut,
    Sun,     
    Moon     
} from 'lucide-react';

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Loading...');
    const [userInitial, setUserInitial] = useState('U'); 
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    const userRole = localStorage.getItem("userRole") || "employee";

    useEffect(() => {
        const fName = dummyProfileData?.firstName || "Admin";
        const lName = dummyProfileData?.lastName || "User";
        setUserName(`${fName} ${lName}`);
        setUserInitial(fName.charAt(0).toUpperCase()); 

        if (localStorage.getItem('theme') === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // 1. Define all possible navigation items
    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Employees", path: "/employees", icon: Users },
        { name: "Attendance", path: "/attendance", icon: CalendarDays },
        { name: "Leave", path: "/leave", icon: Umbrella },
        { name: "PaySlips", path: "/payslips", icon: CircleDollarSign },
        { name: "Settings", path: "/setting", icon: Settings },
    ];

    // 2. FILTER LOGIC: Remove "Employees" if the user is not an admin
    const filteredNavItems = navItems.filter(item => {
        if (item.name === "Employees" && userRole !== 'admin') {
            return false; // Hides the Employee tab
        }
        return true; // Keeps everything else
    });

    const slidebarContent = (
        <div className="flex flex-col h-full bg-[#0a0f1c] text-slate-300 font-['Outfit'] border-r border-slate-800">
            {/* Header / Logo */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                        E
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight leading-tight">Employee MS</h2>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Management System</p>
                    </div>
                </div>

                {/* User Profile Card */}
                <div className="bg-[#121829] p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e293b] rounded-lg flex items-center justify-center text-slate-300 font-semibold text-lg">
                        {userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{userName}</p>
                        <p className="text-xs text-slate-500 capitalize">{userRole}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-2 flex-1 overflow-y-auto custom-scrollbar">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Navigation</p>
                <nav className="space-y-1">
                    {/* 3. Use filteredNavItems instead of navItems here */}
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                                        isActive
                                            ? "bg-[#1e1b4b] text-indigo-400 font-medium border border-indigo-900/50"
                                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {Icon && <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />}
                                        <span>{item.name}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Footer / System Actions */}
            <div className="p-4 border-t border-slate-800 space-y-1">
                <button 
                    onClick={toggleTheme}
                    className="flex items-center justify-between px-3 py-2.5 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                </button>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button 
                onClick={() => setMobileOpen(true)} 
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-slate-700 cursor-pointer"
            >
                <Menu size={20} />
            </button>

            {mobileOpen && (
                <div 
                    className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity' 
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {slidebarContent}
            </aside>
        </>
    );
};

export default Sidebar;