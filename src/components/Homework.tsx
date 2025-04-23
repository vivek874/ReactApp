import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface MarkProp {
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
  homework_score: string; // changed to string to store text
  final_score: number;
  aggregate: number;
}

const Homework = () => {
  const [formData, setFormData] = useState<MarkProp>({
    Grade: "",
    Section: "",
    Subject: "",
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [homeworkText, setHomeworkText] = useState<string>("");

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
    try {
      const response = await axios.get(`http://localhost:8000/api/students/`, {
        params: {
          grade: formData.Grade,
          section: formData.Section,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSave = async () => {
    try {
      for (const student of students) {
        await axios.put(`http://localhost:8000/api/students/${student.id}/`, {
          ...student,
          homework_score: homeworkText, // Sending the same homework for all
        });
      }
      alert("Homework assigned to all students successfully!");
    } catch (error) {
      console.error("Error assigning homework:", error);
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
