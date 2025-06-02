import ManagePrice from "@/pages/admin/managePrice";
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
                    <Route path="/admin" element={<ManagePrice/>}  />

        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
