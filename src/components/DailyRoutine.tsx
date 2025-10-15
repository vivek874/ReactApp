import axios from "axios";
import { useState } from "react";

const DailyRoutine = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [routine, getRoutine] = useState('');
  const [grade, setGrade] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await axios.get(
      `${API_BASE}/api/daily_routines/?grade=${grade}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    getRoutine(response.data[0].routine);
  };
  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="mb-4">Apply Filter</h2>
            <form onSubmit={fetchData}>
              {/* Grade */}
              <div className="mb-3">
                <label htmlFor="Grade" className="form-label">
                  Grade
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Grade"
                  name="Grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Go
              </button>
            </form>
            {routine &&
            <img src={routine} alt="Routine" className="img-fluid mt-3"  />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;
