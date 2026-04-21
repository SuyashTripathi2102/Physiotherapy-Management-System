import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar"; // ✅ new
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutRoutes = ["/users/login", "/users/signup"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen">
      {!shouldHideLayout && <Sidebar />} {/* Show sidebar only if not on login/signup */}

      <div className="flex flex-col flex-1">
        {!shouldHideLayout && <Header />}
        <main className="p-6 flex-1">{children}</main>
      </div>
      </div>
  );
};

export default Layout;
