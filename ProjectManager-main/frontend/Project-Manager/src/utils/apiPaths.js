// src/utils/apiPaths.js
export const BASE_URL = 'https://projectmanagerbackend-8uy5.onrender.com';

//utils/apiPaths.js
// src/utils/apiPaths.js

export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/auth/register', // Register a new user (Admin or Member)
    LOGIN: '/api/auth/login', // Authenticate user & return JWT token
    GET_PROFILE: '/api/auth/profile', // Get logged-in user details
  },

  USERS: {
    GET_ALL_USERS: '/api/users', // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
    CREATE_USER: '/api/users', // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user details
    DELETE_USER: (userId) => `/api/users/${userId}`, // Delete a user
  },

  TASKS: {
    GET_DASHBOARD_DATA: '/api/tasks/dashboard', // Get Dashboard Data
    GET_USER_DASHBOARD_DATA: '/api/tasks/user-dashboard', // Get User Dashboard Data
    GET_ALL_TASKS: '/api/tasks', // Get all tasks (Admin: all, User: only assigned)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by ID
    CREATE_TASK: '/api/tasks', // Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, // Update task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete a task (Admin only)
    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/checklist`, // Update task checklist
  },

  REPORTS: {
    EXPORT_TASKS: '/api/reports/export/tasks', // Download all tasks as Excel
    EXPORT_USERS: '/api/reports/export/users', // Download user-task report
  },

  Image: {
    UPLOAD: 'api/auth/upload-image', // Upload an image
  },
  NOTIFICATIONS: {
    CREATE: '/api/notifications', // Create a notification (Admin only)
    GET_USER_NOTIFICATIONS: '/api/notifications/user', // Get user notifications
    MARK_AS_READ: '/api/notifications/read', // Mark notifications as read
  },
};
