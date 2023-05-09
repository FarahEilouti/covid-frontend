import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllCountries.css'



function AllCountries() {
  const [countries, setCountries] = useState([]);




  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get('https://api.covid19api.com/summary');
        const countriesData = response.data.Countries;
        
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchCountries();
  }, []);


  // const handleAddToMyRecords = (country) => {
  //   console.log('Add to My Records:', country);
  // };

  
  const handleAddToMyRecords = async (country) => {
    try {
      await axios.post('http://localhost:8000/api/my-records/', country);
      alert('Country added to My Records!');
    } catch (error) {
      console.error('Error adding country to My Records:', error);
    }
  };
  
  


  
  return (
    <div>
      <h1>COVID19 statistics for All Countries</h1>
      <div className="country-cards">
        {countries.map((country, index) => (
          <div className="card" key={country.Country}>
            <h3>{country.Country}</h3>
            <p>Total Confirmed Cases: {country.TotalConfirmed}</p>
            <p>Total Deaths: {country.TotalDeaths}</p>
            <p>Total Recovered: {country.TotalRecovered}</p>
            <p>Date: {country.Date}</p>
            <button onClick={() => handleAddToMyRecords(country)}>Add to My Records</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default AllCountries;