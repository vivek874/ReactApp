import { useState } from "react"; 

// use interface to use same component for multiple data passing
// input passed to component is props
// data managed by a component is state

interface Props{
  items: string[];
  heading?: string;
  onSelectItem?: (item: string) =>  void;
}


function ListGroup({items,heading,onSelectItem}: Props) {


  // [variable , function] = initially nth selected
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="list-group">{heading}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item} //need key so that react knows what item when dynamically updating
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem?.(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
