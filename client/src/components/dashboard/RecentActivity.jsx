import React from 'react';

const RecentActivity = ({ role, activities }) => {
    return (
        <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
                <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-modern w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                            {role === 'admin' && <th className="p-4 font-medium">Employee</th>}
                            <th className="p-4 font-medium">Action</th>
                            <th className="p-4 font-medium">Time / Date</th>
                            <th className="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {activities.length > 0 ? activities.map((activity) => (
                            <tr key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                {role === 'admin' && (
                                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{activity.name}</td>
                                )}
                                <td className="p-4 text-slate-600 dark:text-slate-400">{activity.action}</td>
                                <td className="p-4 text-slate-500 text-sm">{activity.time}</td>
                                <td className="p-4">
                                    <span className={`badge ${activity.statusClass} text-[10px] uppercase tracking-wider font-bold`}>
                                        {activity.statusText}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={role === 'admin' ? 4 : 3} className="text-center py-8 text-slate-500">
                                    No recent activity found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentActivity;