import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { dummyAttendanceData, dummyEmployeeData } from "../../assets/assets";
import AttendanceStats from "./AttendanceStats";
import AttendanceHistory from "./AttendanceHistory";
import AttendanceAction from "./AttendanceAction";

const EmployeeAttendance = () => {
    const loggedInUserId = "69b411e6f8a807df391d7b13"; // John Doe's ID
    const [isClockedIn, setIsClockedIn] = useState(false);

    // 1. Handle Clock In/Out
    const handleClockToggle = () => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (isClockedIn) {
            toast.success(`Successfully clocked out at ${time}`);
        } else {
            toast.success(`Successfully clocked in at ${time}`);
        }
        setIsClockedIn(!isClockedIn);
    };

    // 2. Fetch Employee specific data
    const employeeHistory = useMemo(() => {
        return dummyAttendanceData
            .filter(record => record.employeeId === loggedInUserId)
            .map(record => {
                const employeeInfo = dummyEmployeeData.find(emp => emp._id === record.employeeId);
                return { ...record, employeeInfo };
            });
    }, []);

    // 3. Employee Stats
    const employeeStats = {
        daysPresent: 2,
        lateArrivals: 0,
        avgHours: "8.5 Hrs"
    };

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Attendance</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">Track your work hours and daily check-ins.</p>
                </div>
            </div>

            <AttendanceStats role="employee" stats={employeeStats} />
            <AttendanceHistory role="employee" baseRecords={employeeHistory} />
            <AttendanceAction isClockedIn={isClockedIn} onToggle={handleClockToggle} />
        </div>
    );
};

export default EmployeeAttendance;