import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";

function App() {

  const items = ['kathmandu','manang']

  const handleSelectItem = (item: string) => {
    console.log(item)
  }
  return (
    <div>
      <Alert>
        hello<h1>world</h1>

      </Alert>
      <ListGroup 
       items={items}
       heading="cities"
       onSelectItem={handleSelectItem}>

      </ListGroup>
    </div>
  );
}
export default App;
