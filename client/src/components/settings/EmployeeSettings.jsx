import React, { useState } from "react";
import { User, Lock, Save, X, Bell } from "lucide-react";
import toast from "react-hot-toast";
import { dummyEmployeeData } from "../../assets/assets";

const EmployeeSettings = () => {
    // Get the logged-in user's full data (Using John Doe for testing)
    const loggedInUserId = "69b411e6f8a807df391d7b13"; 
    const employeeInfo = dummyEmployeeData.find(emp => emp._id === loggedInUserId);

    // Navigation State
    const [activeTab, setActiveTab] = useState("profile");

    // Profile State (Only Bio is truly editable by the employee)
    const [bio, setBio] = useState(employeeInfo?.bio || "");

    // Password Modal State
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

    // --- HANDLERS ---
    const handleSaveProfile = (e) => {
        e.preventDefault();
        toast.success("Profile bio updated successfully!");
    };

    const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleSavePassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match!");
            return;
        }
        toast.success("Password changed securely!");
        setPasswords({ current: "", new: "", confirm: "" });
        setIsPasswordModalOpen(false);
    };

    // --- TAB CONFIGURATION ---
    const tabs = [
        { id: "profile", label: "My Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] min-h-[80vh] max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="page-header mb-8">
                <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
                <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">
                    Manage your account and system preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* --- SIDEBAR NAVIGATION --- */}
                <div className="w-full lg:w-64 shrink-0">
                    <div className="card p-2 space-y-1 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        activeTab === tab.id
                                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    }`}
                                >
                                    <Icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="flex-1 space-y-6">
                    
                    {/* 1. PROFILE TAB */}
                    {activeTab === "profile" && (
                        <>
                            {/* Public Profile Card */}
                            <div className="card p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <User size={20} className="text-slate-500" />
                                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Public Profile</h2>
                                </div>

                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                            <input type="text" value={`${employeeInfo?.firstName} ${employeeInfo?.lastName}`} disabled className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700 border-dashed outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                                            <input type="email" value={employeeInfo?.email} disabled className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700 border-dashed outline-none" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Position</label>
                                            <input type="text" value={`${employeeInfo?.position} - ${employeeInfo?.department}`} disabled className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700 border-dashed outline-none" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                                            <textarea rows="4" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a brief bio..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
                                            <p className="text-xs text-slate-500 mt-2">This will be displayed on your profile.</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex justify-end border-t border-slate-100 dark:border-slate-800">
                                        <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md cursor-pointer active:scale-[0.98]">
                                            <Save size={16} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Password Change Card */}
                            <div className="card p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                                            <Lock size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Password</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Update your account password</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsPasswordModalOpen(true)} className="btn-secondary cursor-pointer px-6">
                                        Change
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 2. NOTIFICATIONS TAB */}
                    {activeTab === "notifications" && (
                        <div className="card p-6 md:p-8 animate-slide-up">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Email Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Monthly Payslips", desc: "Receive an email when your monthly payslip is generated." },
                                    { title: "Leave Updates", desc: "Get notified when your leave requests are approved or rejected." },
                                    { title: "System Announcements", desc: "Important updates regarding the EMS platform." }
                                ].map((notif, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div>
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{notif.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- PASSWORD MODAL --- */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#121829] rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Change Password</h2>
                            <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSavePassword} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Password</label>
                                <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
                                <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm New Password</label>
                                <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121829] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="btn-secondary w-full text-center cursor-pointer">Cancel</button>
                                <button type="submit" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2.5 rounded-lg w-full font-medium transition-all cursor-pointer">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeSettings;