import { useEffect, useState } from "react";
import { format, differenceInDays, parseISO, isValid } from "date-fns";
import { Link } from "react-router-dom";
import AddPatient from "./AddPatient";
import API from "../api/axios";
import { toast } from "react-toastify";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPatient, setExpandedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients/all-patients", { withCredentials: true });
        setPatients(res.data?.data || []);
      } catch (err) {
        toast.error("Failed to load patients. Please try again.");
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [newPatient, ...prev]);
    toast.success("Patient added successfully!");
  };

  const getStatusColor = (daysLeft) => {
    if (daysLeft < 0) return "bg-gray-400"; // Expired
    if (daysLeft < 3) return "bg-red-500"; // Expiring Soon
    if (daysLeft > 7) return "bg-blue-500"; // Upcoming
    return "bg-green-500"; // Active
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading patients...</div>;
  if (!Array.isArray(patients) || patients.length === 0)
    return <div>No patients found.</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold">Patient List</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-3 py-2 border rounded w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((p) => {
          const endDate = typeof p.subscription_end === "string" ? parseISO(p.subscription_end) : null;
          const startDate = typeof p.subscription_start === "string" ? parseISO(p.subscription_start) : null;
          const daysLeft = endDate && isValid(endDate) ? differenceInDays(endDate, new Date()) : 0;
          const isActive = daysLeft > 0;

          return (
            <div
              key={p.id}
              className={`p-4 rounded-lg shadow-md ${getStatusColor(daysLeft)} text-white hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{p.name}</h2>
                <div className="flex gap-2">
                  <Link to={`/patient/${p.id}`}>
                    <button className="bg-white text-black px-2 py-1 rounded">View</button>
                  </Link>
                  <button className="bg-white text-black px-2 py-1 rounded">Edit</button>
                </div>
              </div>
              <p>Age: {p.age}</p>
              <p>Contact: {p.contact}</p>
              <p>
                Start:{" "}
                {startDate && isValid(startDate) ? format(startDate, "dd MMM yyyy") : "N/A"}
              </p>
              <p>
                End:{" "}
                {endDate && isValid(endDate) ? format(endDate, "dd MMM yyyy") : "N/A"}
              </p>
              <p className="font-semibold mt-2">
                {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
              </p>
              <p className="text-sm">Active: {isActive ? "Yes" : "No"}</p>
              <button
                onClick={() =>
                  setExpandedPatient((prev) => (prev === p.id ? null : p.id))
                }
                className="mt-2 underline text-sm"
              >
                {expandedPatient === p.id ? "Hide Info" : "View More Info"}
              </button>

              {expandedPatient === p.id && (
                <div className="mt-2 text-sm bg-white text-black p-2 rounded shadow-inner">
                  <p>Email: {p.email || "N/A"}</p>
                  <p>Address: {p.address || "N/A"}</p>
                  <p>Medical History: {p.medical_history || "None"}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddPatient
          onClose={() => setShowAddModal(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </>
  );
};

export default PatientList;
