import { useEffect, useState } from "react";
import axios from "axios";
import ViewMarks from "../../components/ViewMarks";
import ListGroup from "../../components/ListGroup";
import ViewAttendance from "../../components/ViewAttendance";

interface Leave {
  id: number;
  teacher: string;
  message: string;
  created_at: string;
  status: string;
}

const Reports = () => {
  const items = [
    "View Marks",
    "View Attendance",
    "View Leaves",
    "Daily Routine",
  ];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [leaves, getLeaves] = useState<Leave[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [grade, setgrade] = useState<string>("");
  const API_BASE = import.meta.env.VITE_API_URL;

  const accessToken = localStorage.getItem("accessToken");

  const fetchData = async () => {
    const response = await axios.get(`${API_BASE}/api/leaves/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    getLeaves(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.patch(
        `${API_BASE}/api/leaves/${id}/update_status/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchData();
    } catch (err) {
      console.log({ err });
    }
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`${API_BASE}/api/leaves/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    fetchData();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("grade", grade);
    formData.append("routine", file);
    try {
      await axios.post(`${API_BASE}/api/daily_routines/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("success");
    } catch (err) {
      console.log("failed", err);
      alert("failed");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card p-3">
          <ListGroup items={items} onSelectItem={setSelectedOption} />
          <div className="mt-3">
            {selectedOption && (
              <h4 className="text-secondary mb-3">{selectedOption}</h4>
            )}
            {!selectedOption && (
              <div className="text-muted">
                Please select an option from the list.
              </div>
            )}
            {selectedOption === "View Marks" && <ViewMarks />}
            {selectedOption === "View Attendance" && <ViewAttendance />}

            {selectedOption === "View Leaves" && (
              <table className="table table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Message</th>
                    <th>Created At</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(leaves) &&
                    leaves.map((leave, index) => (
                      <tr key={index}>
                        <td>{leave.teacher}</td>
                        <td>{leave.message}</td>
                        <td>
                          {new Date(leave.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          {leave.status == "approved" && (
                            <span className="text-success">Approved</span>
                          )}
                          {leave.status == "declined" && (
                            <span className="text-danger">Declined</span>
                          )}
                          {leave.status == "pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  handleStatusChange(leave.id, "approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() =>
                                  handleStatusChange(leave.id, "declined")
                                }
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {
                            <button
                              className="btn btn-sm me-2"
                              onClick={() => handleDeleteUser(leave.id)}
                            >
                              Delete
                            </button>
                          }
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {selectedOption == "Daily Routine" && (
              <>
                <div className="mb-3">
                  <form>
                    <input
                      className="form-control"
                      type="text"
                      value={grade}
                      placeholder="grade"
                      onChange={(e) => setgrade(e.target.value)}
                    />
                    <input
                      className=" form-control-file"
                      type="file"
                      onChange={handleUpload}
                      style={{ padding: 10 }}
                    />
                  </form>
                </div>
                <button
                  onClick={uploadImage}
                  className="btn btn-secondary w-10"
                >
                  Upload Image
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
