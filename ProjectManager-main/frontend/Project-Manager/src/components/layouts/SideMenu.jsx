import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="fixed top-[61px] left-0 z-20 h-[calc(100vh-61px)] w-64 border-r border-gray-200/50 bg-white flex flex-col">
      {/* Profile Section - Non-scrollable */}
      <div className="flex flex-col items-center pt-5 pb-4">
        <div className=" pt-7 pb-4">
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className="h-40 w-40  rounded-full bg-slate-600 object-cover"
          />
        </div>

        {user?.role === 'admin' && (
          <div className="mt-1 rounded bg-primary px-3 py-0.5 text-lg font-medium text-white">
            Admin
          </div>
        )}

        <h5 className="mt-5 font-medium leading-6 text-gray-950">
          {user?.name || ""}
        </h5>
        <p className="text-xs text-gray-500">
          {user?.email || ""}
        </p>
      </div>
  
      {/* Scrollable Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 pb-4">
          {sideMenuData.map((item, index) => (
            <button
              key={`menu_${index}`}
              className={`flex w-full items-center gap-4 px-6 py-3 text-sm ${
                activeMenu === item.label
                  ? "border-r-2 border-primary text-primary bg-gradient-to-r from-blue-50/40 to-blue-100/50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;