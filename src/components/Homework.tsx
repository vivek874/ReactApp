import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface MarkProp {
  Grade: string;
  Section: string;
  Subject: string;
  DueDate: string;
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
  homework_score: string; // changed to string to store text
  final_score: number;
  aggregate: number;
}

const Homework = () => {
  const [formData, setFormData] = useState<MarkProp>({
    Grade: "",
    Section: "",
    Subject: "",
    DueDate: "",
  });
  const API_BASE = import.meta.env.VITE_API_URL;
  const [students, setStudents] = useState<Student[]>([]);
  const [homeworkText, setHomeworkText] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value,id } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      [id]:value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE}/api/students/`, {
        params: {
          grade: formData.Grade,
          section: formData.Section,
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

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(`${API_BASE}/api/homework/`, {
        title: homeworkText,
        grade: formData.Grade,    
        section: formData.Section,   
        subject: formData.Subject,    
        due_date: formData.DueDate,   
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      alert("Homework assigned successfully!");
      setHomeworkText("");  // clear input after assigning
    } catch (error) {
      console.error(error);
      alert("Failed to assign homework. Please try again.");
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>
          <form onSubmit={handleSubmit}>
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

            {/* Subject */}
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
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Computer">Computer</option>
                <option value="Social">Social</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="mb-3">
              <label htmlFor="DueDate" className="form-label">
                Due Date
              </label>
              <input
                type = "date"
                id="DueDate"
                className="form-control"
                value={formData.DueDate}
                onChange={handleChange}
                required

                />

            </div>

            <button type="submit" className="btn btn-primary w-100">
              Go
            </button>
          </form>

          {/* Homework Input */}
          {students.length > 0 && (
            <>
              <div className="mt-4">
                <h3>Enter Homework</h3>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="e.g., Complete worksheet on Algebra"
                  value={homeworkText}
                  onChange={(e) => setHomeworkText(e.target.value)}
                  required
                />
              </div>

              <div>

                <button
                  className="btn btn-success btn-lg w-100"
                  onClick={handleSave}
                >
                  Assign Homework
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homework;
