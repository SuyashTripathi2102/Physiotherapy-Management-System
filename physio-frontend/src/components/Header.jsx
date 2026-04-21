// src/components/Header.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { user, role, logout } = useContext(AuthContext);

  const formattedUsername =
    user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1);
  const formattedRole = role?.toUpperCase();

  return (
    <header className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">
        Welcome {formattedUsername || "User"} ({formattedRole || "Role"})
      </h1>

      <div className="flex items-center space-x-4">
        {/* 🔔 Notification Bell */}
        <Notifications />

        {/* 🔒 Logout Button */}
        <button
          onClick={() => logout()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
