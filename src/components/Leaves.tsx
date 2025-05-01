import React, { useState } from "react";
import axios from "axios";

const Leaves = () => {
  const [leaveText, setLeaveText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8000/api/leaves/", {
        message: leaveText,
      });
      setLeaveText("");
      alert("Leave submitted successfully.");
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to submit leave.");
    }
  };

  return (
    <div className="container mt-4">
      <h5>Submit Leave Notice</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="leaveNotice" className="form-label"></label>
          <textarea
            id="leaveNotice"
            className="form-control"
            rows={6}
            value={leaveText}
            onChange={(e) => setLeaveText(e.target.value)}
            placeholder="Write your leave notice here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Leaves;
