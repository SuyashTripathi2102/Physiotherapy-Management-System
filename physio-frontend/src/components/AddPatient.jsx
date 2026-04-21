import { useState, useContext, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AddPatient = ({ onClose, onPatientAdded, onPatientUpdated, editMode = false, initialData = {} }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    age: initialData.age || "",
    contact: initialData.contact || "",
    email: initialData.email || "",
    gender: initialData.gender || "Male",
    address: initialData.address || "",
    medical_history: initialData.medical_history || "",
    subscription_start: initialData.subscription_start || "",
    subscription_end: initialData.subscription_end || "",
    doctor_id: initialData.doctor_id || "", // for admin only
    isActive: initialData.isActive !== undefined ? initialData.isActive : true, // default true
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      age: formData.age,
      contact: formData.contact,
      email: formData.email,
      gender: formData.gender,
      address: formData.address,
      medical_history: formData.medical_history,
      subscription_start: formData.subscription_start,
      subscription_end: formData.subscription_end,
      isActive: formData.isActive,
    };

    if (user?.role === "admin") {
      if (!formData.doctor_id) {
        toast.error("Please enter doctor ID.");
        return;
      }
      payload.doctor_id = formData.doctor_id;
    }

    try {
      let res;
      if (editMode) {
        res = await API.put(`/patients/${initialData.id}`, payload, { withCredentials: true });
        onPatientUpdated && onPatientUpdated(res.data.data);
      } else {
        res = await API.post("/patients/add", payload, { withCredentials: true });
        onPatientAdded && onPatientAdded(res.data.data);
      }
      onClose();
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Patient" : "Add New Patient"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block font-medium">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Medical History */}
          <div>
            <label className="block font-medium">Medical History</label>
            <textarea
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          {/* Subscription Start */}
          <div>
            <label className="block font-medium">Subscription Start Date</label>
            <input
              type="date"
              name="subscription_start"
              value={formData.subscription_start}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Subscription End */}
          <div>
            <label className="block font-medium">Subscription End Date</label>
            <input
              type="date"
              name="subscription_end"
              value={formData.subscription_end}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* isActive checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="font-medium">Is Active</label>
          </div>

          {/* Doctor ID for Admin */}
          {user?.role === "admin" && (
            <div>
              <label className="block font-medium">Doctor ID</label>
              <input
                type="number"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Doctor ID manually"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editMode ? "Update" : "Add"} Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
