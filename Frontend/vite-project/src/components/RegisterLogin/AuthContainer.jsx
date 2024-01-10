import Auth from "./Auth";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const [user, setUser] = useState({ userID: "", username: "", email: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const onAccountCreate = async (newUser) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/api/v1/auth/register`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsAuthenticated(true);
      setUser({
        username: response.data.user.username,
        email: response.data.user.email,
        userID: response.data.user._id,
      });
    } catch (error) {
      console.error("Error during account creation:", error);
    }
  };

  const onLogin = async (newUser) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/api/v1/auth/login`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsAuthenticated(true);
      console.log(response);
      setUser({
        username: response.data.user.username,
        email: response.data.user.email,
        userID: response.data.user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { state: { user } });
    }
  }, [isAuthenticated, user]);

  return (
    <div>
      <Auth onAccountCreate={onAccountCreate} onLogin={onLogin} />
    </div>
  );
};

export default AuthContainer;
