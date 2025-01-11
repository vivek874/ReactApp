function ListGroup() {
  const items = ["kathmandu", "delhi", "tokyo"];

  //a function
  const getMessage = () => {
    return items.length === 0 ? <p>no items</p> : null;
  };

  return (
    <>
      <h1>List</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
            key={item} //need key so that react knows what item when dynamically updating
            onClick={() => console.log(item)}
          >
            {item}{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
