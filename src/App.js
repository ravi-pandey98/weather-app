import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeatherData = () => {
    axios
      .get(`http://localhost:8080/weather/${city}`, {})
      .then((response) => {
        setWeatherData(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setWeatherData(null);
        setErrorMessage("Error fetching weather data. Please try again.");
      });
  };

  return (
    <div>
      <h1>Weather Prediction</h1>
      <div>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.city}</h2>
          <ul>
            {weatherData.weatherForecastList.map((day) => (
              <>
                <table>
                  <tr>
                    <th>Date and Time</th>
                    <th>Temperature</th>
                    <th>High Temperature</th>
                    <th>Low Temperature</th>
                    <th>Weather Predicted</th>
                  </tr>
                  <tr>
                    <td>{day.date}</td>
                    <td>{day.temp} °f</td>
                    <td>{day.highTemp} °f</td>
                    <td>{day.lowTemp} °f</td>
                    <td>{day.prediction}</td>
                  </tr>
                </table>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
