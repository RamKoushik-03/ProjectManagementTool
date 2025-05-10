import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex justify-center items-center  bg-transparent bg-opacity-80 pointer-events-auto">


      <div className="relative w-full max-w-md p-4">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg Dark:bg-gray-800">
          {/* Modal header */}
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="px-4 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
