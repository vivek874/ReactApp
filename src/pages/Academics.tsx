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
      <div className="container mt-4">
        <div className="card p-3">
          <ListGroup
            items={items}
            onSelectItem={setSelectedOption}
          />
          <div className="mt-3">
            {selectedOption && (
              <h4 className="text-secondary mb-3">{selectedOption}</h4>
            )}
            {!selectedOption && (
              <div className="text-muted">Please select an option from the list.</div>
            )}
            {selectedOption === "Assign Marks" && <AssignMarks />}
            {selectedOption === "Assign Homework" && <Homework />}
            {selectedOption === "Attendance" && <Attendance />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Academics;
