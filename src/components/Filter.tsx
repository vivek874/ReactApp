import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface FormField {
  name: string;
  label: string;
  type?: string;
  options?: string[];
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

interface FormProp {
  fields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
}
const Filter = ({ fields, initialValues, onSubmit }: FormProp) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);

    try {
      const response = await axios.get(`http://localhost:8000/api/students/`, {
        params: {
          grade: formData.Grade,
          section: formData.Classroom,
        },
      });

      setStudents(response.data);
      console.log("Filtered students:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [students, setStudents] = useState<Student[]>([]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                  </label>

                  <div className="mb-3">
                    {field.type === "select" ? (
                      <select
                        className="form-control"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="form-control"
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100">
                Go
              </button>
            </div>
          </form>
          {students.length > 0 && (
            <div className="mt-4">
              <h3>Filtered Students</h3>
              <ul className="list-group">
                {students.map((student, index) => (
                  <li key={index} className="list-group-item">
                    {student.name} - Grade {student.grade}, Section{" "}
                    {student.section}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
