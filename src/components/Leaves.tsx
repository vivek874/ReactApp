import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat?: number;
  jti?: string;
  user_id?: number;
  token_type?: string;
}
// Helper to check if token is expired
const isTokenExpired = (token: string) => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const exp = decoded.exp * 1000;
    return Date.now() >= exp;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return true;
  }
};

const Leaves = () => {
  const [leaveText, setLeaveText] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/api/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );
      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

  const fetchLeaves = useCallback(async () => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken || isTokenExpired(accessToken)) {
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        alert("Session expired. Please log in again.");
        return;
      }
    }

    try {
      const response = await axios.get(`${API_BASE}/api/leaves/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Fetched leaves:", response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      alert("Failed to fetch leaves.");
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    console.log("Using Access Token:", accessToken);

    if (!accessToken) {
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        alert("Session expired. Please log in again.");
        return;
      }
    }

    try {
      await axios.post(
        `${API_BASE}/api/leaves/`,
        { message: leaveText },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeaveText("");
      alert("Leave submitted successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unexpected error submitting leave:", error);
      }
      alert("Failed to submit leave.");
    }
  };

  return (
    <div className="container mt-4">
      <h5>Submit Leave Notice</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
         <br></br>
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
