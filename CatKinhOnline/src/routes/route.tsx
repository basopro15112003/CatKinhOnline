import HomePage from "@/pages/HomePage";
import Order from "@/pages/order";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function AppRoute() {
  return (
    <>
     <Router basename="/CatKinhOnline">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
