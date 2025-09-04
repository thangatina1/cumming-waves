import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import TrainingGroups from "./Components/TrainingGroups";
import SchoolYearCalendar from "./Components/SchoolYearCalendar";
import FindDirections from "./Components/FindDirections";
import PayPalPaymentComponent from "./Components/PayPalPaymentComponent";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import JoinNow from "./Components/JoinNow";
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import ScheduleTryout from "./Components/ScheduleTryout";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ParentsWithDue from "./Components/ParentsWithDue";
import CoachHome from "./Components/CoachHome";
import TeamStore from "./Components/TeamStore";
import CoachLogin from "./Components/CoachLogin";


function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training-groups" element={<TrainingGroups />} />
        <Route path="/calendar" element={<SchoolYearCalendar />} />
        <Route path="/directions" element={<FindDirections />} />
        <Route path="/payment" element={<PayPalPaymentComponent />} />
  <Route path="/schedule-tryout" element={<ScheduleTryout />} />
  
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/coach-home" element={<CoachHome />} />
        <Route path="/coach-login" element={<CoachLogin />} />
        <Route path="/parents-with-due" element={<ParentsWithDue />} />
        <Route path="/team-store" element={<TeamStore />} />
        <Route path="/schedule-tryout" element={<ScheduleTryout />} />
      </Routes>
      {location.pathname !== "/coach-home" && <Footer />}
    </div>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
