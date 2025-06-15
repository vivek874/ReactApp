import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import  { useEffect } from 'react';
import axios from 'axios';

interface uniqueLeave {
  teacher: string;
  message: string;
  created_at: string;
}
const Employee = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userName
  const role = auth?.userRole

 const [leaves, setLeaves] = useState<uniqueLeave[]>([])
 const accessToken = localStorage.getItem("accessToken")

  useEffect (()=>{

    const getLeaves = async () =>{
      const response = await axios.get("http://localhost:8000/api/leaves/",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      
      })
      setLeaves(response.data)
    }
    getLeaves()
  })

  return (
    <div>
      <h1>Employee Details</h1>
     
        <li><strong>Name:</strong> {user ? user : 'Guest User'}</li>
        <li><strong>Role:</strong> {role}</li>
       
       <table className='table'>
        <thead>
          <tr>
            <th>Leave</th>
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

              </tr>
            ))
          }
          <tr>
            <td></td>
          </tr>
        </tbody>
       </table>


    
    </div>
  )
}

export default Employee