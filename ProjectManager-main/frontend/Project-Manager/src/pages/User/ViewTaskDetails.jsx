import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout'; 


const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const updateTodoChecklist = async (index) => {
    if (!task?.todoChecklists || isUpdating) return;
    
    setIsUpdating(true);
    
    try {
      // Create a new array with the updated checklist item
      const updatedChecklists = task.todoChecklists.map((item, i) => 
        i === index ? { ...item, completed: !item.completed } : item
      );

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklists: updatedChecklists }
      );

      if (response.status === 200) {
        setTask(prev => ({
          ...prev,
          todoChecklists: response.data?.task?.todoChecklists || updatedChecklists
        }));
      }
    } catch (error) {
      console.error("Error updating checklist:", error);
      // Revert the UI state if the update fails
      setTask(prev => ({ ...prev }));
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
            <div className="form-card col-span-3 space-y-4">
              {/* ... (other existing JSX remains the same) ... */}

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>

                {task?.todoChecklists?.length > 0 ? (
                  task.todoChecklists.map((item, index) => (
                    <TodoChecklist
                      key={item._id || `todo_${index}`}
                      text={item.text}
                      isChecked={item.completed}
                      onChange={() => updateTodoChecklist(index)}
                      disabled={isUpdating}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-500 mt-2">
                    No checklist items.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const InfoBox = ({ label, value }) => {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">
        {value}
      </p>
    </div>
  );
};

const TodoChecklist = ({ text, isChecked, onChange, disabled }) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
        className={`w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      />
      <p className={`text-[13px] text-gray-800 ${
        isChecked ? 'line-through text-gray-400' : ''
      }`}>
        {text}
      </p>
    </div>
  );
};

export default ViewTaskDetails;