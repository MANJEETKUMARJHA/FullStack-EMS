import React, { useMemo } from "react";
import { Download } from "lucide-react";
import { dummyAttendanceData, dummyEmployeeData } from "../../assets/assets";
import AttendanceStats from "./AttendanceStats";
import AttendanceHistory from "./AttendanceHistory";

const AdminAttendance = () => {
    
    // Generate Admin Daily Roster Data
    const adminDailyRoster = useMemo(() => {
        return dummyEmployeeData.map((emp, index) => {
            const record = dummyAttendanceData.find(att => att.employeeId === emp._id);
            if (record) return { ...record, employeeInfo: emp };

            let status = "ABSENT";
            let checkIn = null;
            
            if (emp.employmentStatus === "ON LEAVE" || emp.employmentStatus === "INACTIVE") {
                status = "ON LEAVE";
            } else if (index % 3 === 0) { 
                status = "PRESENT";
                checkIn = "2026-03-15T08:50:00.000Z";
            } else if (index % 7 === 0) { 
                status = "LATE";
                checkIn = "2026-03-15T10:15:00.000Z";
            }

            return {
                _id: `roster-${emp._id}`,
                employeeId: emp._id,
                employeeInfo: emp,
                date: "2026-03-15T18:30:00.000Z",
                checkIn: checkIn,
                checkOut: null,
                status: status,
                workingHours: checkIn ? 8 : null,
                dayType: checkIn ? "Full Day" : null
            };
        });
    }, []);

    // Admin Stats
    const adminStats = {
        present: 10,
        late: 2,
        absent: 8
    };

    return (
        <div className="animate-fade-in pb-8 font-['Outfit'] relative min-h-[80vh]">
            <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title text-2xl font-semibold text-slate-900 dark:text-white">Attendance Tracking</h1>
                    <p className="page-subtitle text-slate-500 dark:text-slate-400 mt-1">Monitor daily check-ins and working hours across your team.</p>
                </div>
                <button className="btn-secondary flex items-center justify-center gap-2 cursor-pointer">
                    <Download size={16} /> Export Report
                </button>
            </div>

            <AttendanceStats role="admin" stats={adminStats} />
            <AttendanceHistory role="admin" baseRecords={adminDailyRoster} />
        </div>
    );
};

export default AdminAttendance;