import ListGroup from "../components/ListGroup";
import AssignMarks from "../components/AssignMarks";
import Filter from "../components/Filter";
import { useState } from "react";
import StudentList from '../components/StudentList';


const Academics = () => {

  const items = ["Assign Marks", "Assign Homework", "Attendance"];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

 
  // for homework
  const fields = [
    {
      name: "Grade",
      label: "Grade",
      type: "select",
      options: ['',  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Classroom",
      label: "Classroom",
      type: "select",
      options: ["A", "B"],
    },
    {
      name: "Subject",
      label: "Subject",
      type: "select",
      options: [
        '',
        "Nepali",
        "English",
        "Math",
        "Science",
        "Health",
        "Computer",
        "Social",
      ],
    },
  ];

  const initialValues = {
    Grade: "",
    Classroom: "",
    Subject: "",
  };

  // for attendance
  const field = [
    {
      name: "Grade",
      label: "Grade",
      type: "select",
      options: ['', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "Classroom",
      label: "Classroom",
      type: "select",
      options: ["A", "B"],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Submitted Data:", data);
  };
  return (
    <>
      <div>
        <StudentList />
      </div>
      <ListGroup items={items} onSelectItem={setSelectedOption} />
      <div className="content">
        {selectedOption === "Assign Marks" && <AssignMarks />}
        {selectedOption === "Assign Homework" && (
          <Filter
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          ></Filter>
        )}

        {selectedOption === "Attendance" && (
          <Filter
            fields={field}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          ></Filter>
        )}
      </div>
    </>
  );
};

export default Academics;
