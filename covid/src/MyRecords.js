import React, { useEffect, useState } from 'react';

function MyRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch records from the database and set them in the state
    fetchRecordsFromDatabase();
  }, []);

  const fetchRecordsFromDatabase = () => {
    // Simulated function to fetch records from the database
    // Replace this with your actual database fetch logic
    const fetchedRecords = [
      { id: 1, country: 'Country 1', date: '2023-05-07' },
      { id: 2, country: 'Country 2', date: '2023-05-08' },
      { id: 3, country: 'Country 3', date: '2023-05-09' },
    ];

    setRecords(fetchedRecords);
  };

  const handleDeleteRecord = (recordId) => {
    // Delete record from the database and update the state
    deleteRecordFromDatabase(recordId);
  };

  const deleteRecordFromDatabase = (recordId) => {
    // Simulated function to delete a record from the database
    // Replace this with your actual database delete logic

    // Filter out the deleted record from the state
    const updatedRecords = records.filter((record) => record.id !== recordId);
    setRecords(updatedRecords);
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
