import React, { useEffect, useState } from "react";
import { useBrowser } from "../context/BrowserContext";

const Weather = () => {
  const { userLocation } = useBrowser();
  const [weatherData, setWeatherData] = useState(null);
  const [tempInCelsisus, setTempInCelsius] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const temp = localStorage.getItem("temp");
    setTempInCelsius(temp);
    const weatherDesc = localStorage.getItem("weatherDesc");
    setWeatherDesc(weatherDesc);
    const locationName = localStorage.getItem("locationName");
    setLocationName(locationName);
    const hideWeatherComponent = localStorage.getItem("hideWeather");
    setHide(hideWeatherComponent);
  }, []);

  useEffect(() => {
    const weatherApi = async (userLocation) => {
      try {
        const weatherApiUrl = process.env.REACT_APP_WEATHER_API;
        const apiID = process.env.REACT_APP_ID;
        const apiKey = process.env.REACT_APP_KEY_URL;

        let apiUrl = `${weatherApiUrl}${userLocation}&${apiID}${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const tempInCelsisus = (data?.main.temp - 273.15).toFixed(2);

        setTempInCelsius(tempInCelsisus);
        setWeatherDesc(data?.weather[0].description);
        setLocationName(data?.name);

        localStorage.setItem("temp", tempInCelsisus);
        localStorage.setItem("weatherDesc", data?.weather[0].description);
        localStorage.setItem("locationName", data?.name);

      } catch (err) {
        setHide(true);
        localStorage.setItem("hideWeather", hide);
        console.error("Error fetching data", err);
      }
    };
    weatherApi(userLocation);
  }, [userLocation]);

  return (
    <div className="flex dir-col float-r">
    {
      hide ? 
      (<p className="primary text3">City not found</p>) :
      (<>
        <div className="flex dir-row float-r">
        <p className={`${hide ? "hide" : ""} text3 primary p-r10`}>{tempInCelsisus} °C</p>
        <span className={`${hide ? "hide" : ""} primary line`}>|</span>
        <p className="primary text3 temp">{weatherDesc}</p>
      </div>
      <div>
      <span className="text3 primary float-r">{locationName}</span>
      </div>
      </>)
    }
    </div>
  );
};

export default Weather;
