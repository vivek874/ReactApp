import React, { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  grade: string;
  section: string;
  attendance: number;
  test_score: number;
  homeworkScore: number;
  finalScore: number;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
 
  

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <center>
      <div>
        <h4>Student List</h4>
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Test Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>{student.gender}</td>
                <td>
                  {student.test_score}
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
       

      </div>
    </center>
  );
};

export default StudentList;
