import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen pt-5 bg-gradient text-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="font-bold text-2xl flex items-center pl-0 md:pl-10">
          {/* Logo Wrapper with visible bottom border */}
          <Link to="/">
            <div className="h-20 w-20 mr-4 border-b-4 border-blue-500 rounded-br-3xl overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              <img
                src="./logo.jpg"
                alt="Project Vista Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
          <span>Project Vista</span>
        </div>
        <div className="flex items-center gap-3 pr-0 md:pr-10">
          <Link to="/signup">
            <button className="px-4 py-2 text-sm font-medium bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Log In
            </button>
          </Link>
        </div>
      </nav>

   {/* Hero Section */}
<div className="container mx-auto px-4 py-20 pt-20 flex flex-col md:flex-row items-center gap-10">
  <div className="md:w-1/2 space-y-6">
    <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fadeInUp">
      Transform Your Workflow with <span className="text-blue-600">Project Vista</span>
    </h1>
    <p className="text-lg text-gray-600 animate-fadeInUp animation-delay-200">
      Project Vista is the all-in-one project management solution that helps teams of all sizes organize, track, 
      and complete work efficiently. Our visual collaboration platform combines powerful dashboards, 
      task management, and real-time notification to keep your projects moving forward.
    </p>
    <p className="text-gray-600 animate-fadeInUp animation-delay-300">
      Join over  teams who have streamlined their workflows and increased productivity by 
      an average of 45% within the first three months of using Project Vista.
    </p>
    <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-400">
      <Link to="/signup">
        <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm font-semibold shadow-md hover:shadow-lg">
          Get Started 
        </button>
      </Link>
      <Link to="#">
        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-semibold">
          See How It Works →
        </button>
      </Link>
    </div>
    
  </div>
  <div className="md:w-1/2">
    <img
      src="/bg.jpg"
      alt="Project Vista Dashboard showing kanban boards, task lists, and team collaboration features"
      className="rounded-lg shadow-xl w-full animate-fadeIn border border-gray-200"
    />
    <p className="text-center text-sm text-gray-500 mt-2">
      Our intuitive dashboard gives you complete visibility across all projects
    </p>
  </div>
</div>

{/* Features Section */}
<div className="bg-white py-20">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-4">
        Powerful Project Oversight for Modern Teams
      </h2>
      <p className="text-gray-600">
        This platform is tailored for teams who demand secure access, deep task visibility,
        and flexible control. From visual progress to role-based dashboards, everything's built in.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Task Visualization</h3>
        <p className="text-gray-600 mb-4">
          Instantly see task progress with dynamic pie charts and priority-based bar charts.
          Gain a high-level view without digging into the details.
        </p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Pie chart progress overview
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Task segregation by priority (bar charts)
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Dashboard summary for tasks
          </li>
        </ul>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Team & Role Management</h3>
        <p className="text-gray-600 mb-4">
          Every user has their space — admins and users get tailored dashboards with access controls and notifications.
        </p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure login with JWT
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Admin-controlled user notifications
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Role-based dashboards
          </li>
        </ul>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Tracking & Insights</h3>
        <p className="text-gray-600 mb-4">
          Never miss a detail — use to-do checklists, download performance reports, and stay on top of deadlines.
        </p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Task-level to-do checklists
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Export reports as Excel files
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Built-in task priority levels
          </li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-12">
      <Link to="/signup" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
        Explore all features
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  </div>
</div>


      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of teams already using Project Vista to manage their
            projects effectively.
          </p>
          <Link to="/signup">
            <button className="px-6 py-3 text-black bg-white bg-opacity-10 border border-white rounded-lg hover:bg-opacity-20 transition text-sm font-semibold">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-lg mb-1">Project Vista</div>
              <p className="text-sm text-gray-500">
                Simplified project management for teams.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Project Vista. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
