import  { useEffect, useState } from 'react'
import axios from "axios";
import ViewMarks from '../../components/ViewMarks';
import ListGroup from '../../components/ListGroup';
import ViewAttendance from '../../components/ViewAttendance';


interface Leave{
  teacher: string;
  message: string;
  created_at: string;
}
const Reports = () => {
  const items=['View Marks','View Attendance','View Leaves'];
   const [selectedOption, setSelectedOption] = useState<string | null>(null);

   const [leaves , getLeaves] = useState<Leave[]>([]);
   
   useEffect (()=>{
    const accessToken = localStorage.getItem("accessToken")

    const fetchData = async () =>{
      const response = await axios.get('http://localhost:8000/api/leaves/',{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
     
      getLeaves(response.data)

    }
    fetchData()
   }, [selectedOption])

  return (
    <>
      <div className="container mt-4">
        <div className="card p-3">
          <ListGroup
            items={items}
            onSelectItem={setSelectedOption}
          />
          <div className="mt-3">
            {selectedOption && (
              <h4 className="text-secondary mb-3">{selectedOption}</h4>
            )}
            {!selectedOption && (
              <div className="text-muted">Please select an option from the list.</div>
            )}
            {selectedOption === "View Marks" && <ViewMarks/>}
            {selectedOption === "View Attendance" && <ViewAttendance />}

            {
            selectedOption==="View Leaves" &&
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Approval</th>
                
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
                   <button className="btn btn-sm btn-success me-2">Approve</button>
                   <button className="btn btn-sm btn-danger">Decline</button>
                 </td>
                </tr>
              ))
             }
              </tbody>
             
            </table>
            
            
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports