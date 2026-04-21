import { useNavigate } from "react-router-dom";

export default function AppointmentsPage() {
  const navigate = useNavigate();

  const appointments = [
    { id: 1, patient: "John Doe", date: "2025-04-14", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", date: "2025-04-15", time: "2:00 PM" },
  ];

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/users/admin/dashboard")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-green-600 mb-4">Appointments Page</h1>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border p-4 rounded shadow-sm bg-white">
            <p><strong>Patient:</strong> {appointment.patient}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}