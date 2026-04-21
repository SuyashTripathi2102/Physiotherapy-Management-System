import { useNavigate } from "react-router-dom";

export default function PaymentsPage() {
  const navigate = useNavigate();

  const payments = [
    { id: 1, patient: "John Doe", amount: 1200, status: "Paid" },
    { id: 2, patient: "Jane Smith", amount: 900, status: "Pending" },
  ];

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/users/admin/dashboard")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payments Page</h1>
      <div className="space-y-4">
        {payments.map((pay) => (
          <div key={pay.id} className="border p-4 rounded shadow-sm bg-white">
            <p><strong>Patient:</strong> {pay.patient}</p>
            <p><strong>Amount:</strong> ₹{pay.amount}</p>
            <p><strong>Status:</strong> {pay.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}