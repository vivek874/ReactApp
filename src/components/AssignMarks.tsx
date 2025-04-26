import { useState, FormEvent } from "react";
import axios from "axios";

interface MarkProp {
 
  AssignTo: string;
  Grade: string;
  Section: string;
  Subject: string;
}

interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  grade: number;
  section: string;
  attendance: number;
  test_score: number;
  homework_score: number;
  final_score: number;
  aggregate: number;
}

const AssignMarks = () => {
  const [formData, setFormData] = useState<MarkProp>({
    // Year: "",
    AssignTo: "",
    Grade: "",
    Section: "",
    Subject: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/api/students/`, {
        params: {
          grade: formData.Grade,
          section: formData.Section,
          
        },
      });
      setStudents(response.data);
      // console.log("Filtered students:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [students, setStudents] = useState<Student[]>([]);

  const handleScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    studentId: number,
    field: string
  ) => {
    const { value } = e.target;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, [field]: Number(value) }
          : student
      )
    );
  };

  const handleSave = async () => {
    try {
      for (const student of students) {
        const score = student[formData.AssignTo as keyof Student];
  
        if (score !== undefined) {
          await axios.post('http://localhost:8000/api/assign-mark/', {
            student_id: student.id,
            subject: formData.Subject,
            assign_to: formData.AssignTo,
            score: score,
          });
        }
      }
      alert('All marks assigned successfully!');
    } catch (error) {
      console.error('Error assigning marks:', error);
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>
          <form onSubmit={handleSubmit}>
            
          

            <div className="mb-3">
              <label htmlFor="AssignTo" className="form-label">
                Assign To
              </label>
              <select
                className="form-control"
                id="AssignTo"
                name="AssignTo"
                value={formData.AssignTo}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Exam --</option>
                <option value="test_score">Test Score</option>
                <option value="homework_score">Homework</option>
                <option value="final_exam">Final Exam</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="Grade" className="form-label">
                Grade
              </label>
              <input
                type="number"
                className="form-control"
                id="Grade"
                name="Grade"
                value={formData.Grade}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Section" className="form-label">
                Section
              </label>
              <select
                className="form-control"
                id="Section"
                name="Section"
                value={formData.Section}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Section --</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Subject
              </label>
              <select
                className="form-control"
                id="Subject"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                required
              >
                <option> </option>
                <option value="Nepali">Nepali</option>
                <option value="English">English</option>
                <option value="Maths"> Maths</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Computer">Computer</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Go
            </button>
          </form>

          {students.length > 0 && (
            <div className="mt-4">
              <h3>Filtered Students</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Section</th>
                    <th>
                      {formData.AssignTo === "test_score"
                        ? "Test Score"
                        : formData.AssignTo === "homework_score"
                        ? "Homework Score"
                        : formData.AssignTo === "final_exam"
                        ? "Final Exam"
                        : "Score"}
                    </th>

                  
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td>
                        <input
                          type="number"
                          value={
                            student[formData.AssignTo as keyof Student] ?? ""
                          }
                          onChange={(e) =>
                            handleScoreChange(e, student.id, formData.AssignTo)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="btn btn-success btn-lg w-100"
                onClick={handleSave}
              >
                Save all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignMarks;
