import { useState } from "react";
import DailyRoutine from "../components/DailyRoutine";
import ListGroup from "../components/ListGroup";
import Leaves from "../components/Leaves";

const Home = () => {
  const items = ["daily routine", "leave notices"];
  const[selecteditem, setSelectedItem]=useState<string | null>(null);



  return (
    <>
        <div className="container mt-4">
          <div className="card p-3">
            <ListGroup
              items={items}
              heading="Dashboard"
              onSelectItem={setSelectedItem}
            />
            {selecteditem == 'daily routine' && <DailyRoutine></DailyRoutine>}
            {selecteditem == 'leave notices' && <Leaves></Leaves>}
          </div>
        </div>
    </>
  );
};

export default Home;
