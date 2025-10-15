import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import  { useEffect } from 'react';
import axios from 'axios';



interface uniqueLeave {
  teacher: string;
  message: string;
  created_at: string;
  status: string;
}
const Employee = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userName
  const role = auth?.userRole

 const [leaves, setLeaves] = useState<uniqueLeave[]>([])
 const accessToken = localStorage.getItem("accessToken")
 const API_BASE = process.env.REACT_APP_API_URL;

  useEffect (()=>{

    const getLeaves = async () =>{
      const response = await axios.get(`${API_BASE}/api/leaves/`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      
      })
      setLeaves(response.data)
    }
    getLeaves()
  },[accessToken])

  return (
    <div className="container mt-5">
      <div  className="card p-4 shadow-sm mb-5">
        <h1 className="mb-4" style={{ fontFamily: 'sans-serif' }}>Leave History</h1>
        
        <p><strong>Name:</strong> {user}</p>
        <p className="mb-4"><strong>Role:</strong> {role}</p>
        
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(leaves) && leaves.map ((leave , index)=>(
                  <tr key={index}>
                    <td>{leave.teacher}</td>
                    <td>{leave.message}</td>
                    <td>{new Date(leave.created_at).toLocaleDateString()}</td>
                    <td>
                         {leave.status =='approved' && <span style={{color:'green'}}>Approved</span>}
                         {leave.status == 'declined' && <span style={{color:'red'}}>Declined</span> }
                         {leave.status == 'pending' && <span style={{color: ' black'}}> Pending</span>}
        
                    </td>
                  </tr>
                ))
              }
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Employee