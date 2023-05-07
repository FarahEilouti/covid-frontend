import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [worldStats, setWorldStats] = useState(null);
  const [countryStats, setCountryStats] = useState(null);
  const [country, setCountry] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');



  useEffect(() => {
    async function fetchWorldStats() {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.covid19api.com/world/total');
        const data = await response.json();
        setWorldStats(data);
      } catch (error) {
        console.error('Error fetching world statistics:', error);
      }
      setIsLoading(false);
    }
    fetchWorldStats();
  }, []);



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.covid19api.com/country/${country}/status/confirmed?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`
      );
      const data = await response.json();
      setCountryStats(data.slice(0, 5)); // Limit to the first 5 records
    } catch (error) {
      console.error('Error fetching country statistics:', error);
    }

    setIsLoading(false);
  };


  
  return (
    <div className="home-container">
      <h1>World Total Statistics</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="card-container">
            {worldStats && (
              <div className="card">
                <h3>{worldStats.TotalConfirmed}</h3>
                <p>Total Confirmed Cases</p>
              </div>
            )}

            {worldStats && (
              <div className="card">
                <h3>{worldStats.TotalDeaths}</h3>
                <p>Total Deaths</p>
              </div>
            )}

            {worldStats && (
              <div className="card">
                <h3>{worldStats.TotalRecovered}</h3>
                <p>Total Recovered</p>
              </div>
            )}
          </div>

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <button type="submit">Get Statistics</button>
          </form>

          {countryStats && (
            <div className="card-container">
              {countryStats.map((stat) => (
                <div className="card" key={stat.Date}>
                  <h3>Date: {stat.Date}</h3>
                  <p>Total Confirmed Cases: {stat.Cases}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
