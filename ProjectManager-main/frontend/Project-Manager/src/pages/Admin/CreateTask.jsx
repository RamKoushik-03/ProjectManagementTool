import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from 'react-icons/lu';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { PRIORITY_DATA } from '../../utils/data';
import { API_PATHS } from '../../utils/apiPaths';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import SelectUsers from '../../components/Inputs/SelectUsers';
import TodoListInput from '../../components/Inputs/TodoListInput';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import Modal from '../../components/layouts/Model';
import DeleteAlert from '../../components/DeleteAlert';
import SendAlert from './SendAlert';

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [showAlertSection, setShowAlertSection] = useState(false);

  const sendAlertToTeam = async (message) => {
    try {
      await axiosInstance.post(API_PATHS.NOTIFICATIONS.CREATE, {
        team: taskData.assignedTo,
        text: message,
        task: taskId || null, // Link to task if exists
        notiType: 'task_update',
      });

      // If using Socket.io for real-time updates
      if (window.io) {
        taskData.assignedTo.forEach((userId) => {
          window.io.emit('send-notification', {
            userId,
            message: `Task Update: ${message}`,
          });
        });
      }
    } catch (error) {
      console.error('Error sending alert:', error);
      toast.error('Failed to send notification');
    }
  };
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // Create Task
 // Create Task
const createTask = async () => {
  setLoading(true);

  try {
    const prevTodoChecklist = currentTask?.todoChecklists || [];

    const todolist = taskData.todoChecklist?.map((item) => {
      const matchedTask = prevTodoChecklist.find((task) => task.text === item);
      return {
        text: item,
        completed: matchedTask ? matchedTask.completed : false,
      };
    });

    await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklists: todolist, 
    });

    toast.success('Task Created Successfully');
    clearData();
    sendAlertToTeam(`A new task "${taskData.title}" has been created.`);
  } catch (error) {
    console.error('Error creating task:', error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};


  // Update Task
  const updateTask = async () => {
    setLoading(true);
    try {
      const prevTodoChecklist = currentTask?.todoChecklist || [];

      const todolist = taskData.todoChecklist?.map((item) => {
        const matchedTask = prevTodoChecklist.find(
          (task) => task.text === item
        );
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const updatedData = {
        ...taskData,
        title:
          taskData.title?.trim() === currentTask.title?.trim()
            ? currentTask.title
            : taskData.title?.trim(),
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklists: todolist,
      };

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), updatedData);
      toast.success('Task Updated Successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    setError(null);

    // Input validation
    if (!taskData.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!taskData.description.trim()) {
      setError('Description is required.');
      return;
    }

    if (!taskData.dueDate) {
      setError('Due date is required.');
      return;
    }

    if (taskData.assignedTo?.length == 0) {
      setError('Task not assigned to any member');
      return;
    }

    if (taskData.todoChecklist?.length === 0) {
      setError('Add atleast one todo task');
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  };

  // Get Task Info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData(() => ({
          title: taskInfo.title,
          description: taskInfo.description,
          dueDate: taskInfo?.dueDate
            ? moment(taskInfo.dueDate).format('YYYY-MM-DD')
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          priority: taskInfo.priority,
        }));
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    if (!taskId) {
      toast.error('Invalid Task ID');
      return;
    }
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success('Task deleted successfully');
      setOpenDeleteAlert(false);
      navigate('/admin/tasks'); // Adjust the route if needed
    } catch (error) {
      console.error(
        'Error deleting task:',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to delete the task');
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="col-span-3 bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-red-500 bg-rose-50 rounded px-3 py-1.5 border border-rose-100 hover:bg-rose-100 transition"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                value={taskData.title}
                placeholder="Add Title to Task"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                onChange={({ target }) =>
                  handleValueChange('title', target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>

              <textarea
                placeholder="TASK Description"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg resize-none"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange('description', target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 md:grid-cols-2 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600"></label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  placeholder="Select Priority"
                  onChange={(value) => handleValueChange('priority', value)}
                  value={taskData.priority}
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange('dueDate', target.value)
                  }
                  type="date"
                />
              </div>

              <div className="">
                <div className="col-span-12 md:col-span-3">
                  <label className="text-xs font-medium text-slate-600">
                    Assign To
                  </label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(value) => {
                      handleValueChange('assignedTo', value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ToDo Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange('todoChecklist', value)
                }
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {taskData.assignedTo.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowAlertSection(!showAlertSection)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {showAlertSection
              ? 'Hide Notification'
              : 'Send Notification to Team'}
          </button>

          {showAlertSection && (
            <SendAlert users={taskData.assignedTo} onSend={sendAlertToTeam} />
          )}
        </div>
      )}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask(taskId)}
        />
      </Modal>
    </DashboardLayout>
  );
};
export default CreateTask;
