import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface NavItem {
  label: string;
  href: string;
  isDisabled?: boolean;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar = ({ navItems }: NavbarProps) => {
  const auth = useContext(AuthContext);
  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              {!item.isDisabled ? (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  aria-current="page"
                >
                  {item.label}
                </NavLink>
              ) : (
                <span className="nav-link disabled">{item.label}</span>
              )}
            </li>
            
          ))}
          <li>
                    <button type='button' className="btn btn-secondary" id='logout'onClick={auth?.logout}>Logout</button>
                </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
