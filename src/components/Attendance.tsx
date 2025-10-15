import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface MarkProp {
  Grade: string;
  Section: string;
  AcademicYear: string;
}

interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  grade: number;
  section: string;
  attendance: number; // 1 for present, 0 for absent
  test_score: number;
  homework_score: string;
  final_score: number;
  aggregate: number;
}

const Attendance = () => {
  const [formData, setFormData] = useState<MarkProp>({
    Grade: "",
    Section: "",
    AcademicYear: "",
  });
  const API_BASE = import.meta.env.VITE_API_URL;
  const [students, setStudents] = useState<Student[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
          grade: formData.Grade,
          section: formData.Section,
          academic_year: formData.AcademicYear,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [attendanceUpdates, setAttendanceUpdates] = useState<{
    [id: number]: number;
  }>({});

  const handleAttendanceChange = (id: number, value: number) => {
    setAttendanceUpdates((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      for (const student of students) {
        const hasMarked = Object.prototype.hasOwnProperty.call(
          attendanceUpdates,
          student.id
        );

        const value = attendanceUpdates[student.id];

        if (!hasMarked || (value !== 0 && value !== 1)) continue;

        await axios.patch(
          `${API_BASE}/api/students/${student.id}/`,
          {
            add_attendance: value,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      alert("Attendance updated successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="mb-4">Apply Filter</h2>
          <form onSubmit={handleSubmit}>
            {/* Academic Year */}
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

            {/* Grade */}
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

            {/* Section */}
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
              Go
            </button>
          </form>

          {students.length > 0 && (
            <div className="mt-5">
              <h4>Mark Attendance</h4>
              <table className="table table-bordered">
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
                      <td>
                        <select
                          className="form-select"
                          value={attendanceUpdates[student.id] ?? ""}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value="">-- Select --</option>
                          <option value={1}>Present</option>
                          <option value={0}>Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="btn btn-success btn-lg w-100"
                onClick={handleSave}
              >
                Take Attendance
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
