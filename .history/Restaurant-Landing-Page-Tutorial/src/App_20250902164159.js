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
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
