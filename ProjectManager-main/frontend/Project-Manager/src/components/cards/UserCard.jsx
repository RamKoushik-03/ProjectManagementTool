import React from 'react';

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-4 md:p-6 bg-white shadow-sm rounded-lg"> {/* Enhanced padding and card styling */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4"> {/* Increased gap for better spacing */}
          <img
            src={userInfo?.profileImageUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <p className="text-sm md:text-base font-semibold text-gray-800">{userInfo?.name}</p>
            <p className="text-xs md:text-sm text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-4 mt-6"> {/* Increased gap and margin */}
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasksCount || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasksCount || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasksCount || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[18px] font-medium ${getStatusTagColor()} px-4 py-2 rounded-md shadow-sm`} 
    >
      <span className="text-[12px] md:text-sm font-semibold block">{count}</span>
      <span className="text-xs md:text-sm block mt-1">{label}</span> 
    </div>
  );
};