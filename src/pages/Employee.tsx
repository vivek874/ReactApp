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
    <h1 style={{ marginLeft:30 , fontFamily:'Arial'}}>Profile</h1>
     
    <strong style={{ marginLeft:30}}>Name : </strong> {user}<br></br>
    <strong style={{ marginLeft:30}}>Role :</strong> {role}
       
       <table className='table-striped table-bordered table-hover table'>
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
  )
}

export default Employee