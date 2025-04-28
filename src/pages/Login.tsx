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

  const handleLogin = async () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
        role,
      });

      if (response.data.username === username && response.data.role === role) {
        auth?.login(role);
        navigate(
          role === "admin"
            ? "/admin/dashboard"
            : role === "student"
            ? "/student/dashboard"
            : "/pages/home"
        );
      } else {
        alert("Unauthorized user");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
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
              type="text"
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
