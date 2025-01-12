import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/button";

function App() {
  const items = ["kathmandu", "manang"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleSave = () => {
    alert('save clicked')
  }
 
  const handleDelete = () => {
    alert('delete clicked')
  }

  return (
    <div>
      <Alert>
        hello<h1>world</h1>
      </Alert>
      <ListGroup
        items={items}
        heading="cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>

      <Button onClick={handleSave} >
        save
      </Button>
      <Button onClick={handleDelete} className="btn-danger">
        delete
      </Button>

    </div>
  );
}
export default App;
