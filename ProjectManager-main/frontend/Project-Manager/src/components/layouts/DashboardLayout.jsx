import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from '../layouts/Navbar';
import SideMenu from '../layouts/SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar activeMenu={activeMenu} />

      {/* Page Body */}
      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[250px] border-r border-gray-100 bg-white">
            <SideMenu activeMenu={activeMenu} />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-gray-50">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
