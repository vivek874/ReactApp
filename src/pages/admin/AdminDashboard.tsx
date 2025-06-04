import React, { useState } from 'react';

interface Prediction {
  student_id: string;
  student_name: string;
  [key: `predicted_${string}`]: number;
}

const AdminDashboard = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [yField, setYField] = useState('');
  const [xFields, setXFields] = useState(['']);
  const [academicYear, setAcademicYear] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !subject.trim() ||
      !grade.trim() ||
      !academicYear.trim() ||
      !yField.trim() ||
      xFields.filter(x => x.trim() !== '').length === 0
    ) {
      alert('Please fill in all fields before predicting.');
      return;
    }

    const token = localStorage.getItem("accessToken");

    const data = {
      subject_name: subject,
      grade,
      y_field: yField,
      x_fields: xFields.filter(x => x.trim() !== ''),
      academic_year: academicYear,
    };

    try {
      console.log("📤 Sending predict request:", data);
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setPredictions(result.predictions);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 12px 20px;
          align-items: center;
          max-width: 600px;
        }
        .form-section {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        label {
          font-weight: 600;
          text-align: right;
          padding-right: 10px;
          user-select: none;
        }
        input[type="text"] {
          padding: 6px 8px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
        }
        .xfields-container {
          grid-column: 2 / 3;
        }
        .xfield-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .xfield-row input[type="text"] {
          flex-grow: 1;
          margin-right: 10px;
        }
        button {
          cursor: pointer;
          padding: 6px 12px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #007BFF;
          background-color: #007BFF;
          color: white;
          transition: background-color 0.2s ease;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
        .remove-btn {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .remove-btn:hover {
          background-color: #a71d2a;
          border-color: #a71d2a;
        }
        .add-btn {
          margin-top: 5px;
          background-color: #28a745;
          border-color: #28a745;
        }
        .add-btn:hover {
          background-color: #1e7e34;
          border-color: #1e7e34;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          max-width: 800px;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px 12px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>
     
      <form onSubmit={handlePredict} className="form-grid">
        <h3 className="form-section" style={{ gridColumn: '1 / -1', marginBottom: '10px' }}>Prediction Parameters</h3>

        <label htmlFor="subject">Subject Name:</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />

        <label htmlFor="grade">Grade:</label>
        <input
          id="grade"
          type="text"
          value={grade}
          onChange={e => setGrade(e.target.value)}
        />

        <label htmlFor="academicYear">Academic Year:</label>
        <input
          id="academicYear"
          type="text"
          value={academicYear}
          onChange={e => setAcademicYear(e.target.value)}
        />

        <label htmlFor="yField">Y Field:</label>
        <input
          id="yField"
          type="text"
          value={yField}
          onChange={e => setYField(e.target.value)}
        />

        <label>X Fields:</label>
        <div className="xfields-container">
          {xFields.map((field, index) => (
            <div key={index} className="xfield-row">
              <input
                type="text"
                value={field}
                onChange={e => {
                  const newFields = [...xFields];
                  newFields[index] = e.target.value;
                  setXFields(newFields);
                }}
                aria-label={`X Field ${index + 1}`}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  const newFields = xFields.filter((_, i) => i !== index);
                  setXFields(newFields);
                }}
                aria-label={`Remove X Field ${index + 1}`}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() => setXFields([...xFields, ''])}
          >
            Add Field
          </button>
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <button type="submit">Predict</button>
        </div>
      </form>

      {Array.isArray(predictions) && predictions.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Predictions</h3>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Predicted Aggregate</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={index}>
                  <td>{pred.student_id}</td>
                  <td>{pred.student_name}</td>
                  <td>{pred[`predicted_${yField}`]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;