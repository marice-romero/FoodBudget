import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import AuthContainer from "./components/RegisterLogin/AuthContainer";
import Footer from "./components/Footer";
import DashboardContainer from "./components/Dashboard/DashboardContainer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/authenticate" Component={AuthContainer} />
        <Route path="/dashboard" Component={DashboardContainer} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
