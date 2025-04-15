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

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");
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
      await axios.post("http://127.0.0.1:8000/register/", {
        username,
        password,
        role,
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
        await axios.delete(`http://127.0.0.1:8000/delete-user/${username}/`);
        setUsers(users.filter((user) => user.username !== username)); // Update UI
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="admin">
      {/* User Creation Form */}
      <div>
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p></p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p></p>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>

          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <p></p>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <p></p>

      <h3>Existing Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            {user.username} ({user.role})
            <button onClick={() => handleDeleteUser(user.username)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManageUsers;
