// src/pages/DashboardPage.jsx

import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { FaCalendarAlt, FaMoneyBill, FaUserCheck } from "react-icons/fa";
import PatientList from "../components/PatientList";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-semibold text-green-600">Dashboard Page</h1>

        {/* Dashboard Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Upcoming Appointments"
          count="5 appointments"
          icon={<FaCalendarAlt />}
          onClick={() => navigate("/appointments", { replace: true })} // Use replace
        />
        <DashboardCard
          title="Payment Overview"
          count="₹10,000 pending"
          icon={<FaMoneyBill />}
          onClick={() => navigate("/payments", { replace: true })} // Use replace
        />
        <DashboardCard
          title="Today's Check-ins"
          count="3 patients"
          icon={<FaUserCheck />}
          onClick={() => navigate("/checkins", { replace: true })} // Use replace
        />
      </div>

      {/* Patient List Below Cards */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Active Patients</h2>
        <PatientList />
      </div>
    </div>
  );
}
