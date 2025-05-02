import React, { useEffect, useState } from 'react';

type PerformanceEntry = {
  [key: string]: string | number;
};

const AdminDashboard = () => {
  const [performance, setPerformance] = useState<PerformanceEntry[] | null>(null);

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [xFields, setXFields] = useState(['attendance']);
  const [yField, setYField] = useState('aggregate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (subject) query.append('subject_name', subject);
    if (grade) query.append('grade', grade);
    if (section) query.append('section', section);
    if (xFields.length > 0) xFields.forEach(x => query.append('x_fields', x));
    if (yField) query.append('y_field', yField);

    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:8000/performance/?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPerformance(data.performance))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch('http://localhost:8000/performance/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPerformance(data.performance))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Subject Name:
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} style={{ marginLeft: '5px', marginRight: '15px' }} />
        </label>
        <label>
          Grade:
          <input type="text" value={grade} onChange={e => setGrade(e.target.value)} style={{ marginLeft: '5px', marginRight: '15px' }} />
        </label>
        <label>
          Section:
          <input type="text" value={section} onChange={e => setSection(e.target.value)} style={{ marginLeft: '5px', marginRight: '15px' }} />
        </label>
        <label>
          X Fields (comma-separated):
          <input type="text" value={xFields.join(',')} onChange={e => setXFields(e.target.value.split(',').map(f => f.trim()))} style={{ marginLeft: '5px', marginRight: '15px' }} />
        </label>
        <label>
          Y Field:
          <input type="text" value={yField} onChange={e => setYField(e.target.value)} style={{ marginLeft: '5px', marginRight: '15px' }} />
        </label>
        <button type="submit">Update</button>
      </form>

      {performance ? (
        <div>
          <h3>Predicted Student Scores</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                {performance.length > 0 &&
                  Object.keys(performance[0]).map((key) => (
                    <th key={key} style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {performance.map((entry, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9')}
                >
                  {Object.values(entry).map((value, i) => (
                    <td key={i} style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading performance data...</p>
      )}
    </div>
  );
};

export default AdminDashboard;