import { useState } from "react";
import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/button";


function App() {
  const items = ["kathmandu", "manang"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleSave = () => {
    alert("ojaswee is gay");
  };

  const [showAlert, setShowAlert] = useState(false);
 

  return (
    <div>
    
      <ListGroup
        items={items}
        heading="cities"
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
