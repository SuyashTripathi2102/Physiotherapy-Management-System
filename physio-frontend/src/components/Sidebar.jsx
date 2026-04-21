// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Physio Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-bold" : "text-white"
          }
        >
          Dashboard
        </NavLink>
        {/* Add more nav links later like /patients, /appointments */}
      </nav>
    </aside>
  );
};

export default Sidebar;
