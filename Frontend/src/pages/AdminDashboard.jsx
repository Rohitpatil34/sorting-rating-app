// src/pages/AdminDashboard.jsx
import { NavLink, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaStore } from 'react-icons/fa';

const AdminDashboard = () => {
  const linkClasses =
    "flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition";
  const activeLinkClasses = "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside className="hidden md:flex fixed left-0 top-16 h-screen w-64 bg-white p-4 shadow-md flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            <FaUsers /> Users
          </NavLink>
          <NavLink
            to="/admin/stores"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            <FaStore /> Stores
          </NavLink>
        </nav>
      </aside>

     
      <main className="flex-1 md:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
