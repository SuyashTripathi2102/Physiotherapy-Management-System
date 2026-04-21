import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PaymentsPage from "./pages/PaymentsPage";
import CheckinsPage from "./pages/CheckinsPage";
import PatientDetails from "./components/PatientDetails";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/users/login" />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<SignupPage />} />
        <Route path="/patient/:id" element={<PatientDetails />} />

        {/* Admin Routes */}
        <Route
          path="/users/admin/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/admin/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <AppointmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/admin/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/admin/checkins"
          element={
            <ProtectedRoute>
              <Layout>
                <CheckinsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/users/doctor/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/doctor/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <AppointmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/doctor/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/doctor/checkins"
          element={
            <ProtectedRoute>
              <Layout>
                <CheckinsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ⚠️ Optional: Redirect catch-all unmatched non-role routes */}
        <Route path="/appointments" element={<Navigate to="/users/doctor/appointments" />} />
        <Route path="/payments" element={<Navigate to="/users/doctor/payments" />} />
        <Route path="/checkins" element={<Navigate to="/users/doctor/checkins" />} />
      </Routes>

      {/* ✅ Toast container for global alerts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
