import { useState } from "react";
import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/button";
import Navbar from "./components/Navbar";
import './app.css';


function App() {
  const items = ["kathmandu", "manang"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleSave = () => {
    alert("ojaswee is gay");
  };

  const [showAlert, setShowAlert] = useState(false);
 
  const [navItems]= useState([
    {label: 'Home' ,href:'#' ,isActive:true },    // to navigate to new page, update the href
    {label: 'Products' , href:'#', isDisabled:true},  
    {label: 'Contact' ,href:'#', isDisabled:true}
  ])
  return (
    <div>
       <Navbar  navItems={navItems}>

       </Navbar>
      

      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>

      <Button onClick={handleSave}>save </Button>

      {/* Alert component will be rendered only if showAlert is true */}
      {showAlert && <Alert>

        <button type="button" className="btn-close"  aria-label="Close" onClick={()=>{(setShowAlert(false))}}> </button>

        alert</Alert>}   

      <Button  onClick={()=>{setShowAlert(true)}} >
        click for alert
      </Button>

     

     
    </div>
  );
}
export default App;
