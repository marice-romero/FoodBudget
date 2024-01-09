import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>I like that you like to eat</h2>
      <div className="links">
        <Link to="/register">login / register</Link>
      </div>
    </div>
  );
};

export default Navbar;
