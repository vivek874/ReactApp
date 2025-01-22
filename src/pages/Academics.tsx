import ListGroup from "../components/ListGroup";
 import AssignMarks from "../components/AssignMarks";
import { useState } from "react"; 

const Academics = () => {
  const items = ["Assign Marks", "Assign Homework","Attendance"];
      
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

   

     
  return (
    <>
      <ListGroup
                  items={items}
                  onSelectItem={setSelectedOption}
      
              />
              <div className="content">
              {!selectedOption && <div>Please select an option from the list.</div>}
              {selectedOption === "Assign Marks" && <AssignMarks />}
              {selectedOption === "Take Attendance" && <div>Take Attendance Component</div>}
              {selectedOption === "Assign Homework" && <div>Assign Homework Component</div>}
             
            </div>
    </>
  )
}

export default Academics