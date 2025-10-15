import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Prediction {
  student_id: string;
  student_name: string;
  [key: string]: number | string;
}

const AdminDashboard = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [yField, setYField] = useState('final_score');
  const [xFields, setXFields] = useState(['test_score']);
  const [academicYear, setAcademicYear] = useState('2025');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const API_BASE = process.env.VITE_API_URL;

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
      console.log("Sending predict request:", data);
      const response = await fetch(`${API_BASE}/predict/`, {
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

  
  const histogramData = React.useMemo(() => {
    if (!predictions.length || !yField) return [];
    let failCount = 0;
    let passCount = 0;
    predictions.forEach(pred => {
      const value = pred[`predicted_${yField}`];
      if (typeof value === 'number') {
        if (value <= 0.30) {
          failCount++;
        } else {
          passCount++;
        }
      }
    });
    return [
      { range: 'Fail (≤30)', count: failCount },
      { range: 'Pass (>30)', count: passCount }
    ];
  }, [predictions, yField]);

  const correlation = React.useMemo(() => {
    if (!predictions.length || !yField || !xFields.length || !xFields[0]) return null;
    const xKey = xFields[0];
    const yKey = `predicted_${yField}`;
    const xValues: number[] = [];
    const yValues: number[] = [];

    predictions.forEach(pred => {
      const xValRaw = pred[xKey];
      const yValRaw = pred[yKey];
      const xVal = typeof xValRaw === 'number' ? xValRaw : parseFloat(xValRaw as string);
      const yVal = typeof yValRaw === 'number' ? yValRaw : parseFloat(yValRaw as string);
      if (!isNaN(xVal) && !isNaN(yVal)) {
        xValues.push(xVal);
        yValues.push(yVal);
      }
    });

    const n = xValues.length;
    if (n === 0) return null;

    const meanX = xValues.reduce((a, b) => a + b, 0) / n;
    const meanY = yValues.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let denomX = 0;
    let denomY = 0;

    for (let i = 0; i < n; i++) {
      const dx = xValues[i] - meanX;
      const dy = yValues[i] - meanY;
      numerator += dx * dy;
      denomX += dx * dx;
      denomY += dy * dy;
    }
    const denominator = Math.sqrt(denomX * denomY);
    if (denominator === 0) return null;
    return numerator / denominator;
  }, [predictions, yField, xFields]);

  

 
  

  return (
    <div style={{ padding: '32px', fontFamily: 'Arial, sans-serif', background: '#f7f9fa', minHeight: '100vh' }}>
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 16px 28px;
          align-items: center;
          max-width: 650px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,0.06), 0 1.5px 3px 0 rgba(0,0,0,0.03);
          padding: 32px 36px 28px 36px;
          margin: 0 auto 36px auto;
        }
        .form-section {
          margin-top: 0;
          margin-bottom: 18px;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #222b45;
        }
        label {
          font-weight: 600;
          text-align: right;
          padding-right: 10px;
          user-select: none;
          font-size: 1.09rem;
        }
        input[type="text"] {
          padding: 8px 11px;
          font-size: 1.08rem;
          border: 1.5px solid #cfd8dc;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
          background: #f7f9fa;
        }
        .xfields-container {
          grid-column: 2 / 3;
        }
        .xfield-row {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .xfield-row input[type="text"] {
          flex-grow: 1;
          margin-right: 10px;
        }
        button {
          cursor: pointer;
          padding: 8px 18px;
          font-size: 1.06rem;
          font-weight: 600;
          border-radius: 5px;
          border: 1.5px solid #007BFF;
          background-color: #007BFF;
          color: #fff;
          margin-right: 7px;
          margin-bottom: 3px;
          transition: background 0.18s, border 0.18s;
          letter-spacing: 0.01em;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
        .remove-btn {
          background-color: #dc3545;
          border-color: #dc3545;
          color: #fff;
          margin-left: 0;
        }
        .remove-btn:hover {
          background-color: #a71d2a;
          border-color: #a71d2a;
        }
        .add-btn {
          margin-top: 5px;
          background-color: #28a745;
          border-color: #28a745;
          color: #fff;
        }
        .add-btn:hover {
          background-color: #1e7e34;
          border-color: #1e7e34;
        }
        .card-section {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.04);
          padding: 32px 32px 28px 32px;
          margin-top: 40px;
          margin-bottom: 32px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .pred-table {
          border-collapse: collapse;
          width: 100%;
          max-width: 800px;
          margin-top: 12px;
          margin-bottom: 16px;
        }
        .pred-table th, .pred-table td {
          border: 1px solid #e0e0e0;
          padding: 10px 18px;
          text-align: left;
        }
        .pred-table th {
          background-color: #f2f2f2;
          font-size: 1.11rem;
          font-weight: 700;
        }
        .chart-title {
          font-size: 1.28rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #2c3e50;
          letter-spacing: 0.01em;
        }
        .section-header {
          font-size: 1.35rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 16px;
          letter-spacing: 0.01em;
        }
        .correlation-text {
          font-size: 1.09rem;
          font-weight: 500;
          color: #3b3b3b;
          margin-top: 10px;
        }
        .correlation-explanation {
          margin-top: 24px;
          background-color: #eef6f9;
          border-radius: 12px;
          padding: 22px 28px;
          font-size: 1rem;
          color: #2c3e50;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 1px 8px rgba(0,0,0,0.1);
        }
        .correlation-explanation table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          margin-bottom: 12px;
        }
        .correlation-explanation th, .correlation-explanation td {
          border: 1px solid #b1c9d9;
          padding: 8px 12px;
          text-align: center;
        }
        .correlation-explanation th {
          background-color: #cde6f7;
          font-weight: 700;
        }
        .correlation-explanation .note {
          margin-top: 12px;
          font-style: italic;
          color: #4a6e8c;
        }
        .correlation-explanation .visual-box {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 6px;
          border-radius: 4px;
          vertical-align: middle;
        }
        .correlation-explanation .high-corr {
          background-color: #28a745;
        }
        .correlation-explanation .medium-corr {
          background-color: #ffc107;
        }
        .correlation-explanation .low-corr {
          background-color: #dc3545;
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
              <select
                value={field}
                onChange={e => {
                  const newFields = [...xFields];
                  newFields[index] = e.target.value;
                  setXFields(newFields);
                }}
                aria-label={`X Field ${index + 1}`}
                style={{ flexGrow: 1, marginRight: '10px', padding: '6px 8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">Select field</option>
                <option value="test_score">test_score</option>
                <option value="homework_score">homework_score</option>
                <option value="attendance">attendance</option>
              </select>
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
        <div className="card-section">
          <div className="section-header">Predictions</div>
          <table className="pred-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Predicted Score ( 75 )</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => {
                const predictedRaw = pred[`predicted_${yField}`];
                const predictedScore = typeof predictedRaw === 'number' ? predictedRaw : parseFloat(predictedRaw as string);
                return (
                  <tr key={index}>
                    <td>{pred.student_id}</td>
                    <td>{pred.student_name}</td>
                    <td>{(predictedScore * 100).toFixed(2)} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         {/* HISTOGRAM */}
          <div style={{ marginTop: '38px', marginBottom: 0 }}>
            <div className="chart-title">Predicted Scores Distribution Histogram</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <BarChart
                width={700}
                height={280}
                data={histogramData}
                margin={{ top: 28, right: 40, left: 28, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" tick={{ fontSize: 15, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 15, fontWeight: 600 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#28a745" barSize={48} />
              </BarChart>
            </div>
       
       {/* BAR GRAPH */}
            <div className="chart-title" style={{ marginTop: '32px' }}>Predicted Score by Student</div>
            <div >
              <BarChart
                width={1050}
                height={280}
                data={predictions.map(pred => {
                  const predictedRaw = pred[`predicted_${yField}`];
                  const predictedScore = typeof predictedRaw === 'number'
                    ? predictedRaw
                    : parseFloat(predictedRaw as string);
                  return {
                    name: pred.student_name,
                    predicted: predictedScore * 100,
                  };
                })}
                margin={{ top: 28, right: 0, left: 28, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={false}
                  label={{ value: 'Students', position: 'insideBottom', fontSize: 15, fontWeight: 600 }}
                />
                <YAxis 
                tick={{ fontSize: 15, fontWeight: 600 }}
                label={{value:" Score" , angle:-90, position: "insideLeft"}}
                 />
                <Tooltip />
                <Bar dataKey="predicted" fill="#007BFF" barSize={32} />
              </BarChart>
            </div>
            <div className="chart-title" style={{ marginTop: '32px' }}>Pearson Correlation</div>
            <div className="correlation-text">
              {correlation === null
                ? 'Insufficient data to calculate correlation.'
                : `Correlation between ${xFields} and predicted ${yField}: ${(correlation).toFixed(1)}`}
            </div>

            <div className="correlation-explanation">
              <div><strong>Understanding Correlation with Multiple Features</strong></div>
              <table>
                <thead>
                  <tr>
                    <th>Number of Features</th>
                    <th>Typical Correlation Range</th>
                    <th>Visual Indicator</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 (Single Feature)</td>
                    <td>High (e.g., 0.7 - 1.0)</td>
                    <td><span className="visual-box high-corr"></span></td>
                  </tr>
                  <tr>
                    <td>2-3 Features</td>
                    <td>Moderate (e.g., 0.4 - 0.7)</td>
                    <td><span className="visual-box medium-corr"></span></td>
                  </tr>
                  <tr>
                    <td>4+ Features</td>
                    <td>Lower (e.g., 0.1 - 0.4)</td>
                    <td><span className="visual-box low-corr"></span></td>
                  </tr>
                </tbody>
              </table>
              <div className="note">
                Note: Lower correlation values when using multiple features do not imply worse predictions. Instead, they reflect the combined influence of several factors, which may individually correlate less strongly but collectively improve prediction accuracy.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;