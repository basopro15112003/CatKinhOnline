import GoogleCallback from "@/components/form/auth/googleCallback";
import { toast } from "@/hooks/use-toast";
import LayoutUser from "@/layout/userLayout";
import ManageOrder from "@/pages/admin/manageOrder";
import ManagePrice from "@/pages/admin/managePrice";
import ManageCustomer from "@/pages/admin/managerCustomer";
import Account from "@/pages/customer/account";
import OrderPage from "@/pages/customer/order";
import ThankYouPage from "@/pages/customer/thankyou";
import About from "@/pages/common/about";
import HomePage from "@/pages/common/HomePage";
import { type JSX } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

let notAuthToastShown = false;

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = !!localStorage.getItem("token");
  if (!isAuth) {
    if (!notAuthToastShown) {
      toast.warning("Bạn cần phải đăng nhập để thực hiện hành động");
      notAuthToastShown = true;
    }
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
          <Route
            path="/"
            element={
              <LayoutUser>
                <HomePage />
              </LayoutUser>
            }
          />
          <Route
            path="/about"
            element={
              <LayoutUser>
                <About />
              </LayoutUser>
            }
          />

          {/* customer route */}
          <Route
            path="/order"
            element={
              <LayoutUser>
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              </LayoutUser>
            }
          />
          <Route
            path="/account"
            element={
              <LayoutUser>
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              </LayoutUser>
            }
          />
          <Route
            path="/thankyou/:id"
            element={
              <LayoutUser>
                <PrivateRoute>
                  <ThankYouPage />
                </PrivateRoute>
              </LayoutUser>
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
