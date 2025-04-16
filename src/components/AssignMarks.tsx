import { useState, FormEvent } from "react";
import axios from "axios";

interface MarkProp {
  Year: string;
  Exam: string;
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
}

const AssignMarks = () => {
  const [formData, setFormData] = useState<MarkProp>({
    Year: "",
    Exam: "",
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
      console.log("Filtered students:", response.data);
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

  const handleSave = async (studentId: number) => {
    const studentToUpdate = students.find((s) => s.id === studentId);
    if (studentToUpdate) {
      console.log("Sending updated data:", studentToUpdate);

      try {
        const response = await axios.put(
          `http://localhost:8000/api/students/${studentId}/`,
          studentToUpdate
        );
        console.log("Updated student:", response.data);
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Year" className="form-label">
                Year
              </label>
              <input
                type="text"
                className="form-control"
                id="Year"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Exam" className="form-label">
                Exam
              </label>
              <input
                type="text"
                className="form-control"
                id="Exam"
                name="Exam"
                value={formData.Exam}
                onChange={handleChange}
                required
              />
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
                    <th>Test Score</th>
                    <th>Actions</th>
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
                          value={student.test_score}
                          onChange={(e) =>
                            handleScoreChange(e, student.id, "test_score")
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleSave(student.id)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignMarks;
