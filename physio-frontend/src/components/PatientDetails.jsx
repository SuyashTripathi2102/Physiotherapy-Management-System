import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, differenceInDays, parseISO } from "date-fns";
import API from "../api/axios";
import { toast } from "react-toastify";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Basic patient info
        const res = await API.get(`/patients/${id}`, { withCredentials: true });
        const patientData = res.data.data;
        setPatient(patientData);

        // Visit history with patient data
        const historyRes = await API.get(`/patients/${id}/history`, { withCredentials: true });
        const { patient: historyPatient, history } = historyRes.data.data;

        setHistory(history || []);

        // Optional: Override patient from history API if more complete
        setPatient((prev) => ({
          ...prev,
          ...historyPatient,
        }));
      } catch (err) {
        toast.error("Failed to load patient details");
        console.error(err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <div className="text-center mt-4">Loading patient data...</div>;

  const startDate = parseISO(patient.subscription_start);
  const endDate = parseISO(patient.subscription_end);
  const daysLeft = differenceInDays(endDate, new Date());
  const subscriptionStatus = daysLeft <= 0 ? "Expired" : `${daysLeft} days left`;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold mb-4">Patient Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Medical History:</strong> {patient.medical_history}</p>
        <p><strong>Subscription Start:</strong> {format(startDate, "dd MMM yyyy")}</p>
        <p><strong>Subscription End:</strong> {format(endDate, "dd MMM yyyy")}</p>
        <p><strong>Status:</strong> {subscriptionStatus}</p>
        <p><strong>Is Active:</strong> {patient.isActive ? "Yes" : "No"}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Visit History</h2>
        {history.length === 0 ? (
          <p>No history found.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {history.map((item, idx) => (
              <li key={idx}>
                <strong>Date:</strong> {item.date} <br />
                <strong>Notes:</strong> {item.note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
