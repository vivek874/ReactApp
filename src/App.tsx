import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Employee from "./pages/Employee";
import { useState } from "react";
import "./App.css";


function App() {
    const [navItems] = useState([
        { label: "Home", isActive: true, href: "/home" },
        { label: "Academics", isActive: false, href: "/academics" },
        { label: "Employee", isActive:false, href:"/employee"}
    ]);

    return (
        <Router>
            <Navbar navItems={navItems} ></Navbar>

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/employee"  element={<Employee />} />
            </Routes>

        </Router>
    );
}


export default App;
