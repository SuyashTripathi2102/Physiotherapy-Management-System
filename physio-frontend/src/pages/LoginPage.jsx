import { loginUser } from '../services/authService';
import { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, Pill } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const { login, user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (user && role) {
      const userRole = role.toLowerCase();
      const path =
        userRole === "admin"
          ? "/users/admin/dashboard"
          : userRole === "doctor"
          ? "/users/doctor/dashboard"
          : "/users/patient/dashboard";

          navigate(path, { replace: true }); // Use replace to prevent going back to login
        }
  }, [user, role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await loginUser(identifier.trim(), password);

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      login(user, token, user.role); // Just store data

      // ✅ Show toast *after* setting data, but *before* navigation
      toast.success(`${user.username} login successful! as ${user.role}`);

      setRedirectAfterLogin(true); // Delayed navigation
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect only after toast is shown
  useEffect(() => {
    if (redirectAfterLogin && user && role) {
      const userRole = role.toLowerCase();
      const path =
        userRole === "admin"
          ? "/users/admin/dashboard"
          : userRole === "doctor"
          ? "/users/doctor/dashboard"
          : "/users/patient/dashboard";

      const timer = setTimeout(() => {
        navigate(path);
      }, 1600); // allow toast to show

      return () => clearTimeout(timer);
    }
  }, [redirectAfterLogin, user, role, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Welcome to PhysioCare</h2>
          <div className="flex justify-center mt-2">
            <Pill size={28} className="text-red-500 rotate-45" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-600 font-medium">
              Username or Email
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter username or email"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm text-gray-600 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/users/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
