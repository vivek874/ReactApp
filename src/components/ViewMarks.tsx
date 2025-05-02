import { useState, FormEvent } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  grade: number;
  section: string;
  marks: {
    [subject: string]: {
      test_score: number;
      homework_score: number;
      final_score: number;
      aggregate: number;
    };
  };
}

const ViewMarks = () => {
  const [formData, setFormData] = useState({
    Grade: "",
    Section: "",
    Subject: "",
  });

  const [students, setStudents] = useState<Student[]>([]);

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

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get("http://localhost:8000/api/students/", {
        params: {
          grade: formData.Grade,
          section: formData.Section,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Directly send the token in headers
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>
          <form onSubmit={handleSubmit}>
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
                <option value="">-- Select Subject --</option>
                <option value="Nepali">Nepali</option>
                <option value="English">English</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Computer">Computer</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Apply Filter
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
                    <th>Homework Score</th>
                    <th>Final Score</th>
                    <th>Aggregate</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const subjectMarks = student.marks[formData.Subject];
                    return subjectMarks ? (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.grade}</td>
                        <td>{student.section}</td>
                        <td>{subjectMarks.test_score}</td>
                        <td>{subjectMarks.homework_score}</td>
                        <td>{subjectMarks.final_score}</td>
                        <td>{subjectMarks.aggregate}</td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMarks;