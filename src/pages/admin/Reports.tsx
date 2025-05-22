import  { useState } from 'react'
import ViewMarks from '../../components/ViewMarks';
import ListGroup from '../../components/ListGroup';
import ViewAttendance from '../../components/ViewAttendance';

const Reports = () => {
  const items=['View Marks','View Attendance'];
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
  

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
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports