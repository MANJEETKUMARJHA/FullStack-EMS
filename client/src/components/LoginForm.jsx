

// // const LoginForm = () => {
// //     return (
// //         <div>LoginForm</div>
// //     )
// // }

// // export default LoginForm;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import LoginLeftSide from "./LoginLeftSide";

// const LoginForm = ({ role, title, subtitle }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     // New state to toggle password visibility
//     const [showPassword, setShowPassword] = useState(false); 
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // TODO: Replace this with your actual backend authentication logic
//         console.log(`Simulating login for role: ${role}`);
//         console.log("Credentials:", { email, password });
        
//         // Route the user to the dashboard
//         navigate("/dashboard");
//     };

//     return (
//         <div className="flex min-h-screen bg-white font-['Outfit']">
//             {/* Left Side: Your Animated Brand Panel */}
//             <LoginLeftSide />

//             {/* Right Side: The Form */}
//             <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative">
                
//                 {/* Back Button */}
//                 <div className="absolute top-8 left-8 lg:left-12">
//                     <Link 
//                         to="/login" 
//                         className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                         </svg>
//                         Back to Portals
//                     </Link>
//                 </div>

//                 <div className="max-w-md w-full mx-auto animate-fade-in">
//                     {/* Header */}
//                     <div className="mb-10 text-center lg:text-left">
//                         <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
//                             role === 'admin' 
//                                 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
//                                 : 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200'
//                         }`}>
//                             {role} Portal
//                         </span>
//                         <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
//                         <p className="text-slate-500">{subtitle}</p>
//                     </div>

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-2">
//                                 Email Address
//                             </label>
//                             <input 
//                                 type="email" 
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="name@company.com"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <div className="flex items-center justify-between mb-2">
//                                 <label className="block text-sm font-medium text-slate-700">
//                                     Password
//                                 </label>
//                                 <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
//                                     Forgot password?
//                                 </a>
//                             </div>
                            
//                             {/* Password Input Wrapper */}
//                             <div className="relative">
//                                 <input 
//                                     // Dynamically change input type
//                                     type={showPassword ? "text" : "password"} 
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="••••••••"
//                                     className="pr-10" // Added right padding so text doesn't overlap the icon
//                                     required
//                                 />
                                
//                                 {/* Toggle Button */}
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
//                                 >
//                                     {showPassword ? (
//                                         // Eye Off Icon (Slashed)
//                                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                                         </svg>
//                                     ) : (
//                                         // Eye Open Icon
//                                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="flex items-center">
//                             <input
//                                 id="remember-me"
//                                 name="remember-me"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
//                             />
//                             <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-600">
//                                 Remember me for 30 days
//                             </label>
//                         </div>

//                         <button 
//                             type="submit" 
//                             className="btn-primary w-full py-3 text-base flex justify-center items-center gap-2"
//                         >
//                             Sign In
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                             </svg>
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginLeftSide from "./LoginLeftSide";

const LoginForm = ({ role, title, subtitle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. SAVE THE ROLE: Store the user's role in the browser
        localStorage.setItem("userRole", role);
        
        console.log(`Simulating login for role: ${role}`);
        
        // Route the user to the dashboard
        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen bg-white font-['Outfit']">
            {/* Left Side */}
            <LoginLeftSide />

            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative">
                
                <div className="absolute top-8 left-8 lg:left-12">
                    <Link to="/login" className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Portals
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto animate-fade-in">
                    <div className="mb-10 text-center lg:text-left">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
                            role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200'
                        }`}>
                            {role} Portal
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
                        <p className="text-slate-500">{subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">Password</label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
                            </div>
                            
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pr-10" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none">
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base flex justify-center items-center gap-2">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;