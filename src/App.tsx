import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Employee from "./pages/Employee";
import Login from "./pages/Login"; 
import Admin from "./pages/Admin";
import Student from "./pages/Student";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import "./App.css";

function AppContent() {
    const auth = useContext(AuthContext);

   
    if (!auth?.userRole) {
        return <Login />;
    }

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Academics", href: "/academics" },
        { label: "Employee", href: "/employee" }
    ];

  
    return (
      
            <>
                <Navbar navItems={navItems} />
                <Routes>
               
                    <Route path="/" element={<Home />} />
                    <Route path="/academics" element={<Academics />} />
                    <Route path="/employee" element={<Employee />} />
                
                    {auth.userRole === "admin" && <Route path="/admin" element={<Admin />} />}
                    {auth.userRole === "student" && <Route path="/student" element={<Student />} />}

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </>
       
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
