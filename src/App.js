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
        console.log(error);
        setWeatherData(null);
        setErrorMessage(error.response.data.message);
      });
  };
  const clearData = () => {
    setWeatherData(null);
    setErrorMessage("");
    setCity("");
  };

  return (
    <div>
      <h1>Weather Prediction</h1>
      <div className="weather">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
        <button onClick={clearData}>Clear</button>
      </div>
      {errorMessage && <b>{errorMessage}</b>}
      {weatherData && (
        <div>
          <h2>Weather for {weatherData.city}</h2>
          <ol>
            <table>
              <tr>
                <th>Date and Time</th>
                <th>Temperature</th>
                <th>High Temperature</th>
                <th>Low Temperature</th>
                <th>Weather Predicted</th>
              </tr>
              {weatherData.weatherForecastList.map((day) => (
                <>
                  <tr>
                    <td>{day.date}</td>
                    <td>{day.temp} °f</td>
                    <td>{day.highTemp} °f</td>
                    <td>{day.lowTemp} °f</td>
                    <td>{day.prediction}</td>
                  </tr>
                </>
              ))}
            </table>
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
