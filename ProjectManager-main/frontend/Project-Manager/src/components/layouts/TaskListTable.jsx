import React from 'react';
import moment from 'moment';



const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-500 border border-green-200';
      case 'Pending':
        return 'bg-purple-100 text-purple-500 border border-purple-200';
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-500 border border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-500 border border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-500 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3 w-full">
    <table className="min-w-full w-full table-auto">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr className="text-left">
          <th className="px-4 py-3 text-gray-800 font-medium text-[13px]">Name</th>
          <th className="px-4 py-3 text-gray-800 font-medium text-[13px]">Status</th>
          <th className="px-4 py-3 text-gray-800 font-medium text-[13px]">Priority</th>
          <th className="px-4 py-3 text-gray-800 font-medium text-[13px] hidden md:table-cell">Created On</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((task) => (
          <tr key={task._id} className="border-t border-gray-200">
            <td className="px-4 py-2 text-gray-700 text-[13px] line-clamp-1">{task.title}</td>
            <td className="px-4 py-2">
              <span className={`w-[80px] text-center px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>
                {task.status}
              </span>
            </td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>
                {task.priority}
              </span>
            </td>
            <td className="px-4 py-2 text-gray-700 text-[13px] hidden md:table-cell">
              {task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default TaskListTable;
