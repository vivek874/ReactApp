import { useState, FormEvent } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  grade: number;
  section: string;
  attendance: number;
}

const ViewAttendance = () => {
  const [formData, setFormData] = useState({
    AcademicYear: "",
    Grade: "",
    Section: "",
  });

  const [students, setStudents] = useState<Student[]>([]);
  const API_BASE = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${API_BASE}/api/students/`, {
        params: {
          academic_year: formData.AcademicYear,
          grade: formData.Grade,
          section: formData.Section,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the token here
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
              <label htmlFor="AcademicYear" className="form-label">
                Academic Year
              </label>
              <select
                className="form-control"
                id="AcademicYear"
                name="AcademicYear"
                value={formData.AcademicYear}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Academic Year --</option>

                <option value="2024">2024</option>
                <option value="2025">2025</option>
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
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td>{student.attendance}</td>
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

export default ViewAttendance;