// src/components/Notifications.jsx
import { useState } from "react";
import { FaBell } from "react-icons/fa";

const Notifications = () => {
  const [open, setOpen] = useState(false);

  const dummyNotifications = [
    { id: 1, type: "subscription", message: "Subscription expiring for John Doe" },
    { id: 2, type: "payment", message: "Payment due for Jane Smith" },
    { id: 3, type: "appointment", message: "Appointment tomorrow with Ravi" },
  ];

  return (
    <div className="relative inline-block text-left">
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <FaBell className="text-2xl text-blue-600 hover:text-blue-800" />
        {dummyNotifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {dummyNotifications.length}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
          <div className="p-3 font-semibold border-b">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {dummyNotifications.map((n) => (
              <li key={n.id} className="px-4 py-2 hover:bg-gray-100 border-b">
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
