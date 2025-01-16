interface NavItem {
    label: string;
    href?: string;
    isActive?: boolean;
    isDisabled?: boolean;
  }
  
  interface NavbarProps {
    navItems: NavItem[];
   
  }
const Navbar = ({navItems}: NavbarProps) => {
  return (
    <div className="card text-center">
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">

      {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link ${
                  item.isActive ? "active" : ""
                } ${item.isDisabled ? "disabled" : ""}`}
                href={item.href || "#"}
                aria-current={item.isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}


      </ul>
    </div>
   
  </div>
  )
}

export default Navbar;