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




  const handleAddToMyRecords = (country) => {
    console.log('Add to My Records:', country);
  };



  
  return (
    <div>
      <h1>Welcome to the All Countries Page</h1>
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
