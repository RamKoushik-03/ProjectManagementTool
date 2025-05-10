import React from 'react';
import { Link } from 'react-router-dom';


const AuthLayout = ({ children }) => {
  return (
    <>
      {/* Navigation */}
      <div>
        <nav className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo Wrapper */}
            <Link to="/">
              <div className="h-20 w-20 mr-4 border-b-4 border-blue-500 rounded-br-3xl overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img
                  src="/logo.jpg" // Correct path to the image
                  alt="Project Vista Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Project Vista</h1>
          </div>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
