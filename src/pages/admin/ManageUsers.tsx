import { useState, useEffect } from "react";
import axios from "axios";
interface User {
  username: string;
  role: string;
}
const AdminManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`${API_BASE}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle user creation
  const handleCreateUser = async () => {
    if (!username || !password || !role) {
      alert("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${API_BASE}/register/`, {
        username,
        password,
        role,
        
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User created successfully!");
      fetchUsers(); // Refresh user list
      setUsername("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("User creation failed!");
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (window.confirm(`Are you sure you want to delete ${username}?`)) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${API_BASE}/delete-user/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user.username !== username)); // Update UI
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>

      {/* User Creation Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-3">Create New User</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateUser}
            >
              Create User
            </button>
          </form>
        </div>
      </div>

      {/* Existing Users */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Existing Users</h4>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user.username} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{user.username} ({user.role})</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user.username)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminManageUsers;
