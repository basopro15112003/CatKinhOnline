import ManageOrder from "@/pages/admin/manageOrder";
import ManagePrice from "@/pages/admin/managePrice";
import ManageCustomer from "@/pages/admin/managerCustomer";
import About from "@/pages/customer/about";
import Account from "@/pages/customer/account";
import HomePage from "@/pages/customer/HomePage";
import Order from "@/pages/customer/order";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function AppRoute() {
  return (
    <>
      <Router basename="/CatKinhOnline">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<ManagePrice />} />
          <Route path="/admin/order" element={<ManageOrder />} />
          <Route path="/admin/customer" element={<ManageCustomer />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
