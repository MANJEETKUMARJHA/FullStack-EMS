import React from 'react';
import { LogIn, LogOut } from "lucide-react";

const AttendanceAction = ({ isClockedIn, onToggle }) => {
    return (
        <button 
            onClick={onToggle}
            className="fixed bottom-8 right-8 z-50 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] flex items-center gap-4 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer border border-indigo-400/20"
        >
            {isClockedIn ? <LogOut size={24} /> : <LogIn size={24} />}
            <div className="flex flex-col text-left pr-2">
                <span className="font-bold text-base leading-tight">
                    {isClockedIn ? 'Clock Out' : 'Clock In'}
                </span>
                <span className="text-indigo-200 text-[11px] tracking-wide">
                    {isClockedIn ? 'end your work day' : 'start your work day'}
                </span>
            </div>
        </button>
    );
};

export default AttendanceAction;