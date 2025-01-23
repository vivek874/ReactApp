import  { useState, FormEvent } from 'react';

interface MarkProp{
  Year: string;
  Exam: string;
  Grade: string;
  Classroom: string;
  Subject: string;
}



const AssignMarks = () => {
  const [formData, setFormData] = useState<MarkProp>({
    Year: '',
    Exam: '',
    Grade: '',
    Classroom: '',
    Subject: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();     // stops browser form refreshing

  console.log('Form submitted:', formData);
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
              <label htmlFor="Classroom" className="form-label">
                Classroom
              </label>
              <select
                
                className="form-control"
                id="Classroom"
                name="Classroom"
                value={formData.Classroom}
                onChange={handleChange}

                required
              >
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
              <option value="Nepali" >Nepali</option>
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
        </div>
      </div>
    </div>
  );
}

export default AssignMarks