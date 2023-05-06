import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorldStats() {
      const response = await fetch("https://api.covid19api.com/world/total");
      const data = await response.json();
      fetchWorldStats(data);
    }

    fetchWorldStats();
  }, []);


  return (


    <div className="home-container">
      <h1>World Total statistics</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (


        <div className="card-container">
          <div className="card">
            <h3>{data[0]}</h3>
            <p>TotalConfirmed</p>
          </div>

          <div className="card">
            <h3>{data[1]}</h3>
            <p>TotalDeaths</p>
          </div>

          <div className="card">
            <h3>{data[2]}</h3>
            <p>TotalRecovered</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Home;
