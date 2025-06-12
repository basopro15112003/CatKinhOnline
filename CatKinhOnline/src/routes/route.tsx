import GoogleCallback from "@/components/form/auth/googleCallBack";
import ManageOrder from "@/pages/admin/manageOrder";
import ManagePrice from "@/pages/admin/managePrice";
import ManageCustomer from "@/pages/admin/managerCustomer";
import About from "@/pages/customer/about";
import Account from "@/pages/customer/account";
import HomePage from "@/pages/customer/HomePage";
import Order from "@/pages/customer/order";
import type { JSX } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = !!localStorage.getItem("token");
  if (!isAuth) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
function AppRoute() {
  return (
    <>
      <Router basename="/CatKinhOnline">
        <Routes>
          {/* public route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />

          {/* customer route */}
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />

          {/* admin route */}
          <Route path="/admin" element={<ManagePrice />} />
          <Route path="/admin/order" element={<ManageOrder />} />
          <Route path="/admin/customer" element={<ManageCustomer />} />
          <Route path="/auth/callback" element={<GoogleCallback />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
