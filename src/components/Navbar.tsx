import { useState } from "react";



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

  const [items,setItems]=useState(navItems);

  const handleItemClick = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item, // Copy all properties of the current item
        isActive: i === index, // Set clicked item as active
      }))
    );
  };

  
  return (
    <div className="card text-center">
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">

      {items.map((item, index) => (
            <li className="nav-item" key={index} >
              <a

                className={`nav-link ${
                  item.isActive ? "active" : ""
                } ${item.isDisabled ? "disabled" : ""}`}
                href={item.href || "#"}
                aria-current={item.isActive ? "true" : undefined}
                onClick={() => handleItemClick(index)}
               
                
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