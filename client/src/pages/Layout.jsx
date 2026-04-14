// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar"; // Adjust path if Sidebar is in a different folder

// const Layout = () => {
//     return (
//         <div className="flex h-screen bg-slate-50 font-['Outfit']">
//             {/* Standalone Sidebar Component */}
//             <Sidebar />

//             {/* Main Content Area */}
//             <main className="flex-1 overflow-y-auto relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 -z-10 pointer-events-none"></div>
//                 <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
//                     <Outlet />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
    return (
        // FIX 1: Added dark:bg-[#0a0f1c] to the root div
        <div className="flex h-screen bg-slate-50 dark:bg-[#0a0f1c] font-['Outfit'] transition-colors duration-300">
            <Sidebar />

            <main className="flex-1 overflow-y-auto relative">
                {/* FIX 2: Added dark mode gradient colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-[#0a0f1c] dark:via-[#0a0f1c] dark:to-[#1e1b4b]/20 -z-10 pointer-events-none transition-colors duration-300"></div>
                
                <div className="p-6 pt-20 lg:p-8 lg:pt-8 max-w-7xl mx-auto w-full animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;