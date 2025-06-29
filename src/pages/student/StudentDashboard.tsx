import React, { useState, FormEvent } from "react";
import axios from "axios";

interface Homework {
  id: number;
  title: string;
  grade: number;
  section: string;
  subject: string;
  due_date: string;
}

const StudentDashboard = () => {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [routine, getRoutine] = useState<string | null>("");
  const [grade, setGrade] = useState("");

  const [formData, setFormData] = useState({
    grade: "",
    section: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8000/api/homework/", {
        params: {
          grade: formData.grade,
          section: formData.section,
        },
      });
      setHomeworkList(response.data);
    } catch (error) {
      console.error("Error fetching homework:", error);
    }
  };

  const fetchRoutine = async () => {
    // e.preventDefault()
    const varRoutine = await axios.get(
      `http://localhost:8000/api/daily_routines/?grade=${grade}`
    );
    getRoutine(varRoutine.data[0].routine);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card p-4 shadow-sm mb-5">
          <h3 className="mb-4">Assigned Homework</h3>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Grade</label>
                <input
                  type="number"
                  className="form-control"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Section</label>
                <select
                  className="form-select"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Filter
            </button>
          </form>

          {homeworkList.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {homeworkList.map((homework) => {
                  if (
                    homework.grade === parseInt(formData.grade) &&
                    homework.section === formData.section
                  ) {
                    return (
                      <tr key={homework.id}>
                        <td>{homework.title}</td>
                        <td>{homework.subject}</td>
                        <td>{homework.due_date}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-muted mt-3">No homework assigned yet.</p>
          )}
        </div>

        <div className="card p-4 shadow-sm">
          <h3 className="mb-4">Daily Routine</h3>
          <div className="mb-3">
            <label htmlFor="routineGrade" className="form-label">
              Grade
            </label>
            <input
              id="routineGrade"
              type="text"
              placeholder="Enter grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={fetchRoutine} className="btn btn-primary">
            Go
          </button>

          {routine && (
            <div className="text-center">
              <img
                src={routine}
                alt="Daily Routine"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "500px", maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
