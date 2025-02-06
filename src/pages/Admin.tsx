import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="admin-container">
            <h1>Welcome, Admin</h1>
            <p>You have access to manage users and data.</p>

            {/* Example admin functionality */}
            <button onClick={auth?.logout}>Logout</button>
        </div>
    );
};

export default Admin;
