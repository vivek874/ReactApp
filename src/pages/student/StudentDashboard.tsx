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

  return (
    <div className="container mt-4">
      <h2>Assigned Homework</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label className="form-label">Section</label>
            <select
              className="form-control"
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
        <button type="submit" className="btn btn-primary mt-3">
          Filter
        </button>
      </form>

      {homeworkList.length > 0 ? (
        <table className="table table-striped mt-3">
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
  );
};

export default StudentDashboard;