// src/components/DashboardOverview.jsx
import { CheckCircle, CalendarDays, Users, XCircle } from "lucide-react";

const DashboardOverview = () => {
  // Dummy data
  const expiringPatients = 3;
  const upcomingAppointments = 5;
  const activeSubscriptions = 12;
  const expiredSubscriptions = 2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Card 1 - Expiring */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600">
          <Users className="w-5 h-5" /> Expiring Patients
        </h2>
        <p className="text-3xl font-bold mt-4">{expiringPatients}</p>
        <p className="text-sm text-gray-500 mt-1">Subscriptions ending soon</p>
      </div>

      {/* Card 2 - Upcoming Appointments */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
          <CalendarDays className="w-5 h-5" /> Upcoming Appointments
        </h2>
        <p className="text-3xl font-bold mt-4">{upcomingAppointments}</p>
        <p className="text-sm text-gray-500 mt-1">Scheduled this week</p>
      </div>

      {/* Card 3 - Active Subscriptions */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" /> Active Subscriptions
        </h2>
        <p className="text-3xl font-bold mt-4">{activeSubscriptions}</p>
        <p className="text-sm text-gray-500 mt-1">Patients currently subscribed</p>
      </div>

      {/* Card 4 - Expired Subscriptions */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-600">
          <XCircle className="w-5 h-5" /> Expired Subscriptions
        </h2>
        <p className="text-3xl font-bold mt-4">{expiredSubscriptions}</p>
        <p className="text-sm text-gray-500 mt-1">Patients with expired plans</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
