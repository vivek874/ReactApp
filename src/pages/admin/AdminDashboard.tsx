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
      <h2>Admin Dashboard</h2>
      <form onSubmit={handlePredict} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Subject Name:
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Grade:
            <input
              type="text"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Academic Year:
            <input
              type="text"
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Y Field:
            <input
              type="text"
              value={yField}
              onChange={e => setYField(e.target.value)}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>X Fields:</label>
          {xFields.map((field, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <input
                type="text"
                value={field}
                onChange={e => {
                  const newFields = [...xFields];
                  newFields[index] = e.target.value;
                  setXFields(newFields);
                }}
                style={{ marginRight: '10px' }}
              />
              <button
                type="button"
                onClick={() => {
                  const newFields = xFields.filter((_, i) => i !== index);
                  setXFields(newFields);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setXFields([...xFields, ''])}
          >
            Add Field
          </button>
        </div>

        <button type="submit">Predict</button>
      </form>

      {Array.isArray(predictions) && predictions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Predictions</h3>
          <table border={1} cellPadding={5} cellSpacing={0}>
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