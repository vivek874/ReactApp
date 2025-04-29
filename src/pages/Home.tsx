import { useState } from "react";
import DailyRoutine from "../components/DailyRoutine";
import ListGroup from "../components/ListGroup";

const Home = () => {
  const items = ["daily routine", "leave notices"];
  const[selecteditem, setSelectedItem]=useState<string | null>(null);



  return (
    <>
        <div>
          <ListGroup
            items={items}
            heading="Dashboard"
            onSelectItem={setSelectedItem}
          />
          {selecteditem == 'daily routine' && <DailyRoutine></DailyRoutine>}
        </div>
    </>
  );
};

export default Home;
