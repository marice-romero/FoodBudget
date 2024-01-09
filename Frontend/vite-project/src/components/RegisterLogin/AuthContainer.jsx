import Register from "./Register";
import axios from "axios";
import { useState } from "react";

const AuthContainer = () => {
  const [user, setUser] = useState({ userID: "", username: "", email: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  return (
    <div>
      <Register onAccountCreate={onAccountCreate} />
    </div>
  );
};

export default AuthContainer;
