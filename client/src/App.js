
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExcursionScreen from "./clientScreens/ExcursionScreen";
import HotelScreen from "./clientScreens/HotelScreen";
import QuotationHome from './clientScreens/QuotationHome'
import TransferScreen from './clientScreens/TransferScreen'
import LoginScreen from "./components/LoginScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./components/RegisterScreen";


function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        {/*  adimin Routes */}
        <Route path="/" element={<QuotationHome/>} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/transfer" element={<TransferScreen/>} />
        <Route path="/hotels" element={<HotelScreen/>} />
        <Route path="/excursions" element={<ExcursionScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
