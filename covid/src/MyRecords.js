import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './MyRecords.css'

function MyRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecordsFromDatabase();
  }, []);

  const fetchRecordsFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/my-records/');
      const fetchedRecords = response.data.records;
      setRecords(fetchedRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDeleteRecord = (recordId) => {
    deleteRecordFromDatabase(recordId);
  };

  const deleteRecordFromDatabase = async (recordId) => {
    try {
      await axios.delete(`http://localhost:8000/api/my-records/${recordId}/`);
      const updatedRecords = records.filter((record) => record.id !== recordId);
      setRecords(updatedRecords);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  



  return (
    <div className="my-records-container">
      <h1>MyRecords Page</h1>
      {records.length === 0 ? (
        <p className="no-records">NO AVAILABLE RECORDS</p>
      ) : (
        <div className="record-cards">
          {records.map((record) => (
            <div className="card" key={record.id}>
              <h3>{record.country}</h3>
              <p>Date: {record.date}</p>
              <div className="card-footer">
                <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecords;
