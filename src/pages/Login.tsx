import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/sms.jpg";

const Login = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("superadmin");
  const [password, setPassword] = useState("superadmin123");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/token/refresh/`, {
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
    setLoading(true);
    try {
      const tokenResponse = await axios.post(`${API_BASE}/api/token/`, {
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
      const userResponse = await axios.get(`${API_BASE}/api/user/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (userResponse.data.role === role) {
        auth?.login(role, username);
        navigate(
          role === "admin"
            ? "/admin/dashboard"
            : role === "student"
            ? "/student/dashboard"
            : "/pages/home"
        );
        setLoading(false);
      } else {
        alert("Unauthorized role");
      }
    } catch (error) {
      console.error("Login error:", error);
      const refreshedToken = await refreshAccessToken();
      if (!refreshedToken) {
        setLoading(false);
        alert("Session expired. Please log in again.");
        navigate("/");
      } else {
        alert("Failed to authenticate. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="image">
        <img className="logo" src={logo} />

        <div className="center_login">
          <div className="mb-3">
            <h2 className="login-title">Login</h2>

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
          {loading && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center gap-2"
              style={{ zIndex: 10, background: "rgba(255,255,255,0.6)" }}
            >
              <div className="spinner-border spinner-border-sm"></div>
              Loading...
            </div>
          )}

          <button className="login-button" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div className="text-white">
          <p> (Admin) superadmin, superadmin123</p>
          <p> (Teacher) ram, ram123</p>
          <p> (Student) s1, sp1</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
