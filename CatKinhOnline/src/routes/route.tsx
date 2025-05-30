import HomePage from "@/pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function AppRoute() {
  return (
    <>
     <Router basename="/CatKinhOnline">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
