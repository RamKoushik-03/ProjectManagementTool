import React, { useState, useEffect,useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { FaCheck } from 'react-icons/fa';
import {UserContext} from '../../context/UserContext';  

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.NOTIFICATIONS.GET_USER_NOTIFICATIONS);
        setNotifications(response.data || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const userId = user?._id;
  
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const response = await axiosInstance.post(API_PATHS.NOTIFICATIONS.MARK_AS_READ,{
        notificationId,userId
      });
         console.log('Mark as read response:', response.data);
      // Assuming the response contains the updated notification data
      if (response.status === 200) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
      }
    } catch (err) {
      console.error('Mark as read error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h1>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification._id}
              className="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {notification.task?.title || 'Task Notification'}
                    </h3>
                    <span className="text-sm text-gray-500 ml-2">
                      {moment(notification.createdAt).fromNow()}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{notification.text}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-3">
                    <div className="text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
                      Team: {notification.team?.[0]?.name || 'No team'}
                    </div>
                    {notification.task?.dueDate && (
                      <div className={`text-sm px-3 py-1 rounded-full ${
                        moment(notification.task.dueDate).isBefore() 
                          ? 'bg-red-50 text-red-700' 
                          : 'bg-green-50 text-green-700'
                      }`}>
                        Due: {moment(notification.task.dueDate).format('MMM D, YYYY')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => handleMarkAsRead(notification._id)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <FaCheck className="mr-1.5" />
                  Mark as read
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          No notifications available
        </div>
      )}
    </div>
  );
};

export default Notification;