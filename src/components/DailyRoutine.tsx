// import React from "react";

const DailyRoutine = () => {
  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="mb-4">Apply Filter</h2>
            <form >
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
                //   value={formData.Grade}
                //   onChange={handleChange}
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
                //   value={formData.Section}
                //   onChange={handleChange}
                  required
                >
                  <option value="">-- Select Section --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;
