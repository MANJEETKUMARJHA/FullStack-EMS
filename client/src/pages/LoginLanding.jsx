

// const LoginLanding = () => {
//     return (
//         <div>LoginLanding</div>
//     )
// }

// export default LoginLanding;


import { Link } from "react-router-dom";

const LoginLanding = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b173e] to-[#302b63] flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Outfit']">
            
            {/* Ambient Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse duration-[4000ms] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/20 blur-[100px] rounded-full animate-pulse duration-[5000ms] pointer-events-none"></div>
            
            {/* Central Content */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
                
                {/* Header Section */}
                <div className="animate-slide-up mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-300">
                        Welcome to EMS
                    </h1>
                    <p className="text-indigo-200/80 text-lg max-w-xl mx-auto font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                        Streamline operations, manage your workforce, and track performance seamlessly. Select your portal to continue.
                    </p>
                </div>

                {/* Portal Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                    
                    {/* Admin Portal Card */}
                    <Link 
                        to="/login/admin" 
                        className="group relative backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.3)] hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(79,70,229,0.4)] text-left flex flex-col h-full"
                    >
                        {/* Admin Icon */}
                        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-300 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all duration-300 border border-indigo-500/20">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Admin Portal</h2>
                        <p className="text-indigo-200/70 text-sm flex-1 leading-relaxed">
                            Access system settings, manage employee records, oversee attendance, and handle secure payroll processing.
                        </p>
                        
                        <div className="mt-8 flex items-center text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">
                            Continue as Administrator 
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>

                    {/* Employee Portal Card */}
                    <Link 
                        to="/login/employees" 
                        className="group relative backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-fuchsia-500/50 transition-all duration-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.3)] hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(192,132,252,0.4)] text-left flex flex-col h-full"
                    >
                        {/* Employee Icon */}
                        <div className="w-16 h-16 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center text-fuchsia-300 mb-6 group-hover:scale-110 group-hover:bg-fuchsia-500/30 transition-all duration-300 border border-fuchsia-500/20">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Employee Portal</h2>
                        <p className="text-indigo-200/70 text-sm flex-1 leading-relaxed">
                            View your dashboard, submit time-off requests, check attendance logs, and securely download your payslips.
                        </p>
                        
                        <div className="mt-8 flex items-center text-fuchsia-400 text-sm font-medium group-hover:text-fuchsia-300 transition-colors">
                            Continue as Employee 
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default LoginLanding;