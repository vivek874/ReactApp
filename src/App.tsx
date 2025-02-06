import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Employee from "./pages/Employee";
import Login from "./pages/Login"; // Import Login
// import Admin from "./pages/Admin";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import "./App.css";

function AppContent() {
    const auth = useContext(AuthContext);

    // If user is not logged in, redirect to login page
    if (!auth?.userRole) {
        return <Login />;
    }

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "Employee", href: "/employee" }
    ];

  
    return (
        <Router>
            <Navbar navItems={navItems} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/employee" element={<Employee />} />
                {/* <Route path="/admin" element={auth.userRole === "admin" ? <Admin /> : <Navigate to="/" />} /> */}
               
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
