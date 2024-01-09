import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onAccountCreate }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAccountCreate(newUser);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <label htmlFor="username">choose your handle</label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">enter a password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button type="submit">register</button>
      </form>
      <Link to="/login">already a member? sign in here.</Link>
    </div>
  );
};

export default Register;
