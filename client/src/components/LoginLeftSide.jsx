

// const LoginLeftSide = () => {
//     return (
//         <div className="hidden md:flex w-1/2 bg-indigo-950 relative overflow-hidden border-r borer-slate-200">
//             <div className="">

//             </div>
//         </div>
//     )
// }

// export default LoginLeftSide;

const LoginLeftSide = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f0c29] via-[#1b173e] to-[#302b63] relative overflow-hidden flex-col justify-center p-16 xl:p-24 text-white shadow-2xl z-10 border-r border-slate-800/50">
            
            {/* 1. Large Rotating Dashed Rings */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] border border-indigo-500/20 rounded-full animate-[spin_30s_linear_infinite] border-dashed"></div>
            <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] border border-purple-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse] border-dashed"></div>
            
            {/* 2. Expanding "Pop up / Radar" Rings */}
            <div className="absolute top-[30%] left-[15%] flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-indigo-500 rounded-full"></div>
                <div className="absolute w-12 h-12 bg-indigo-500/40 rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
            </div>
            <div className="absolute bottom-[25%] right-[25%] flex items-center justify-center">
                <div className="absolute w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                <div className="absolute w-10 h-10 bg-fuchsia-500/40 rounded-full animate-[ping_4s_ease-in-out_infinite] delay-1000"></div>
            </div>

            {/* 3. Floating / Bouncing Particles */}
            <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-[15%] left-[30%] w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.8)] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>

            {/* 4. Ambient Glowing Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse duration-[4000ms]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/20 blur-[100px] rounded-full animate-pulse duration-[5000ms]"></div>
            
            {/* Foreground Text Content (Glassmorphism) */}
            <div className="relative z-10 max-w-lg backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.3)]">
                <div className="animate-slide-up">
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-300">
                        Employee <br /> Management System
                    </h1>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                    <p className="text-indigo-100/80 text-lg font-light leading-relaxed pr-8">
                        Streamline your workforce operations, track attendance, manage payroll, and empower your team securely.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginLeftSide;