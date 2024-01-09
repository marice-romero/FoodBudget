import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import AuthContainer from "./components/RegisterLogin/AuthContainer";
import Login from "./components/RegisterLogin/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={AuthContainer} />
        <Route path="/login" Component={Login} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
