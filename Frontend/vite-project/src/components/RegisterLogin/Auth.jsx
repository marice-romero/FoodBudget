import { useState } from "react";

const Register = ({ onAccountCreate, onLogin }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      onAccountCreate(newUser);
    } else {
      onLogin(newUser);
    }
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
        {isRegister && <label htmlFor="username">choose your handle</label>}
        {isRegister && (
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        )}
        <label htmlFor="password">enter a password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button type="submit">{isRegister ? "register" : "login"}</button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "already a member? sign in here."
          : "need to create an account? sign up here."}
      </button>
    </div>
  );
};

export default Register;
