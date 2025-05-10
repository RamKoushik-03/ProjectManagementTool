import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom'; // needed for logo link

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b border-gray-200/50 backdrop-blur-[2px]">
      <div className="flex items-center gap-5 py-4 px-7">
        {/* Mobile menu button (hidden on lg screens) */}
        <button
          className="block text-black lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label="Toggle menu"
        >
          {openSideMenu ? (
            <HiOutlineX className="w-6 h-6" />
          ) : (
            <HiOutlineMenu className="w-6 h-6" />
          )}
        </button>

        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-4">
          <div className="h-16 w-16 border-b-4 border-blue-500 rounded-br-3xl overflow-hidden transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <img
              src="/logo.jpg" // Assumes logo is in the public folder
              alt="Project Vista Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-xl text-black font-semibold">Project Vista</h2>
        </Link>

        {/* Mobile side menu */}
        {openSideMenu && (
          <div className="fixed top-[61px] left-0 w-full bg-white shadow-md z-40">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
