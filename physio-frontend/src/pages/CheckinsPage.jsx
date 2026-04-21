import { useNavigate } from "react-router-dom";

export default function CheckinsPage() {
  const navigate = useNavigate();

  const checkins = [
    { id: 1, patient: "John Doe", date: "2025-04-12", status: "Checked In" },
    { id: 2, patient: "Jane Smith", date: "2025-04-13", status: "No Show" },
  ];

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/users/admin/dashboard")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-green-600 mb-4">Check-ins Page</h1>
      <div className="space-y-4">
        {checkins.map((checkin) => (
          <div key={checkin.id} className="border p-4 rounded shadow-sm bg-white">
            <p><strong>Patient:</strong> {checkin.patient}</p>
            <p><strong>Date:</strong> {checkin.date}</p>
            <p><strong>Status:</strong> {checkin.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}