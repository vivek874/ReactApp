import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      // Request token using JWT
      const tokenResponse = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const accessToken = tokenResponse.data.access;
      const refreshToken = tokenResponse.data.refresh;

      // Store both tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("Access Token:", accessToken); 

      // Validate role
      const userResponse = await axios.get("http://127.0.0.1:8000/api/user/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (userResponse.data.role === role) {
        auth?.login(role);
        navigate(
          role === "admin"
            ? "/admin/dashboard"
            : role === "student"
            ? "/student/dashboard"
            : "/pages/home"
        );
      } else {
        alert("Unauthorized role");
      }
    } catch (error) {
      console.error("Login error:", error);
      const refreshedToken = await refreshAccessToken();
      if (!refreshedToken) {
        alert("Session expired. Please log in again.");
        navigate("/login");  // Redirect to login page
      } else {
        alert("Failed to authenticate. Please try again.");
      }
    }
  };

  return (
    <div className="image">
      <center>
        <div className="center_login">
          <div className="mb-3">
            <h2 style={{ color: "white" }}>Login</h2>
            <input
              className="form-control"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="teacher">teacher</option>
              <option value="admin">admin</option>
              <option value="student">student</option>
            </select>
          </div>
          <button className="btn btn-secondary" onClick={handleLogin}>Login</button>
        </div>
      </center>
    </div>
  );
};

export default Login;