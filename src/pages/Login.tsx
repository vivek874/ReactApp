import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
  
    if (!role) {
    
      alert("Please select a role");
      return;
    }

    if (username.trim() === "u" && password.trim() === "p") {
      auth?.login(role); // Set user role

      if (role === "admin") {
        navigate("/admin/dashboard"); 
      } else if (role === "teacher") {
        navigate("/pages/home"); 
      } else if (role==='student') {
        navigate("/student/dashboard"); 
      }
    } else {
      alert("Invalid credentials");
    }

    
  };


  return (
   
      <center >
        <div className="center_login">
          <div className="mb-3">
            <h2>Login</h2>
            <input
              className="form-label"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-label"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <select
              className="form-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=""></option>
              <option value="teacher">teacher</option>
              <option value="admin">admin</option>
              <option value="student">student</option>
            </select>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </center>

  );
};

export default Login;
