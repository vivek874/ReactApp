import ListGroup from "../components/ListGroup";
import AssignMarks from "../components/AssignMarks";
import { useState } from "react";
import Homework from "../components/Homework";
import Attendance from "../components/Attendance";

const Academics = () => {
  const items = ["Assign Marks", "Assign Homework", "Attendance"];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <>
      <ListGroup items={items} onSelectItem={setSelectedOption} />
      <div className="content">
        {selectedOption === "Assign Marks" && <AssignMarks />}
        {selectedOption === "Assign Homework" && <Homework />}
        {selectedOption === "Attendance" && <Attendance />}
      </div>
    </>
  );
};

export default Academics;
