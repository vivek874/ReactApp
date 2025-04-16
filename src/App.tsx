import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Employee from "./pages/Employee";
import StudentDashboard from "./pages/student/StudentDashboard";
import "./App.css";
import Courses from "./pages/student/Courses";
import Profile from "./pages/student/Profile";


function App() {
 
    return (
        <AuthProvider>
            <Router>
                <Navbar /> 
                <Routes>
                    {/* Common Routes */}
                  
                    <Route path="/login"  element={<Login />} />
                    <Route path="/"  element={<Login />} />
               

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/manage-users" element={<ManageUsers />} />
                    <Route path="/admin/reports" element={<Reports />} />

                    {/* Teacher Routes */}
                    <Route path="/pages/home" element={<Home />} />
                    <Route path="/pages/academics" element={<Academics />} />
                    <Route path="/pages/employee" element={<Employee />} />

                    {/* Student Routes */}
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/courses" element={<Courses/>} />
                    <Route path="/student/profile" element={<Profile/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
