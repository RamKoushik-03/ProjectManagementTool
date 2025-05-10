import React from 'react';
import Progress from '../layouts/Progress';
import AvatarGroup from '../AvatarGroup';
import moment from 'moment';


const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {

  

  const getStatusTagColor = () => {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border border-cyan-500/10';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500/20';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500/10';
    }
  };

 

  const getPriorityTagColor = () => {
    switch (priority) {
      case 'Low':
        return 'text-emerald-500 bg-emerald-50 border border-emerald-500/20';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-50 border border-yellow-500/20';
      case 'High':
        return 'text-red-500 bg-red-50 border border-red-500/20';
      default:
        return 'text-gray-500 bg-gray-50 border border-gray-500/20';
    }
  };
  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer transition hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-start gap-2 mb-3">
        <span
          className={`text-[11px] font-medium ${getStatusTagColor()} px-3 py-0.5 rounded`}
        >
          {status}
        </span>
        <span
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-3 py-0.5 rounded`}
        >
          {priority} Priority
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2">
        {title}
      </h3>
      <p className="text-[13px] text-gray-600 mt-1 line-clamp-2 leading-[18px]">
        {description}
      </p>

      <p className="text-sm text-gray-700/80 font-medium mt-3 mb-2">
        Tasks Done:{' '}
        <span className="font-semibold text-gray-700">
          {completedTodoCount || 0}
        </span>
      </p>

      <Progress progress={progress} status={status} />

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <div>
          <label className="block">Start Date</label>
          <p className="text-[13px] font-medium text-gray-900">
            {moment(createdAt).format('Do MMM YYYY')}
          </p>
        </div>
        <div>
          <label className="block">Due Date</label>
          <p className="text-[13px] font-medium text-gray-900">
            {moment(dueDate).format('Do MMM YYYY')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <AvatarGroup avatars={assignedTo || []} />
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <span className="font-medium">{todoChecklist.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
