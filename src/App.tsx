import ListGroup from "./components/ListGroup";

function App() {
  const items = ["kathmandu", "delhi", "tokyo", "istanbul"];

  // event handling
  const handleSelectItem =  (item: string) => {console.log(item)}

  return (
    <div>
      <ListGroup 
          items = {items}
          heading = "Cities"
          onSelectItem= {handleSelectItem} >
      </ListGroup>
     
    </div>
  );
}
export default App;
