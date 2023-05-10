import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyRecords.css'

function MyRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecordsFromDatabase();
  }, []);

  const fetchRecordsFromDatabase = async () => {
    try {
      const response = await axios.get('https://covid-backend-eta.vercel.app/api/v1/covid/');
      
      const fetchedRecords = response.data;
      setRecords(fetchedRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
  try {
    const csrfToken = getCookie('csrftoken'); // Make sure to include the getCookie function
    await axios.delete(`https://covid-backend-eta.vercel.app/api/v1/covid/${recordId}`, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
    const updatedRecords = records.filter((record) => record.id !== recordId);
    setRecords(updatedRecords);
  } catch (error) {
    console.error('Error deleting record:', error);
  }
};


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  console.log(records)
  return (
    <div className="my-records-container">
      <h1>My Records Page</h1>
      {records && records.length === 0 ? (
        <p className="no-records">NO AVAILABLE RECORDS</p>
      ) : (
        <div className="record-cards">
          {records&& records.map((record) => (
            <div className="card" key={record.id}>
              <h3>{record.Country}</h3>
              <p>Date: {record.Date}</p>
              <p>Deaths: {record.TotalDeaths}</p>
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
