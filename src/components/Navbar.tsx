import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { userRole, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleLogout = () => {
        logout();
        localStorage.removeItem("userRole");
        navigate("/");
    };

    const hideNavbarRoutes = ["/login","/"];
    if (hideNavbarRoutes.includes(location.pathname)) return null;

    type UserRole = "admin" | "teacher" | "student";
    const role: UserRole | null = userRole as UserRole | null;

    const navItems: Record<UserRole, { label: string; href: string }[]> = {
        admin: [
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage Users", href: "/admin/manage-users" },
            { label: "Reports", href: "/admin/reports" },
        ],
        teacher: [
            { label: "Home", href: "/pages/Home" },
            { label: "Academics", href: "/pages/Academics" },
            { label: "Employee", href: "/pages/Employee" },
        ],
        student: [
            { label: "Dashboard", href: "/student/dashboard" },
         
        ],
    };

    return (
        <div className="card text-center">
            {/* Navbar Header with Styling */}
            <div className="card-header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                      
                       

                        {/* Navbar Items */}
                        <div className="collapse navbar-collapse">
                            <ul className="nav nav-tabs card-header-tabs">
                                {role && navItems[role].map((item, index) => (
                                    <li className="nav-item" key={index}>
                                        <NavLink 
                                            to={item.href} 
                                            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} 
                                            aria-current="page"
                                        >
                                            {item.label}
                                        </NavLink>
                                        
                                    </li>
                                ))}
                            </ul>

                           
                            {userRole && (
                                <li className="nav-item ms-3">
                                    <button 
                                        type="button"
                                        id="logout"
                                        className="btn btn-secondary" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
