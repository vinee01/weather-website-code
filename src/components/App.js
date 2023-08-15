import Inputs from "./Inputs";
import TimeAndDate from "./TimeAndDate";
import CurrentWeather from "./CurrentWeather";
import Now from "./Now";
import SecondNow from "./SecondNow";
import HourlyForecast from "./HourlyForecast";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import clearDay from "../assets/clear-sky-day.jpg";
import clearNight from "../assets/clear-sky-night.jpg";
import cloudsDay from "../assets/clouds-day.jpg";
import cloudsNight from "../assets/clouds-night.jpg";
import rainDay from "../assets/rain-day.jpg";
import thunderstorm from "../assets/thunderstorm.jpg";
import snow from "../assets/snow.jpg";
import mistDay from "../assets/mist-day.jpg";
import mistNight from "../assets/mist-night.jpg";


function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [location, setLocation] = useState("Indore");
  const [submitted, setSubmitted] = useState(null);
  const [coords, setCoords] = useState({
    lat: '',
    lon: ''
  });
  const [city, setCity] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(res.data);
    } catch (error) {
      console.log("Error fetching the current data");
    }
  };

  if (weatherData) {
    var latitude = weatherData.coord.lat;
    var longitude = weatherData.coord.lon;
  }

  const fetchForecastData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${location}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setForecastData(res.data);
    } catch (error) {
      console.log("Error fetching the forecast data");
    }
  };

  const fetchAirData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lon=${longitude}&lat=${latitude}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setAirData(res.data);
    } catch (error) {
      console.log("Error fetching the air data");
    }
  };


  const airQualityFunc = () => {
    var airIndex = "vineet";
    if (airData) {
      const airQualityIndex = airData.list[0].main.aqi;

      if (airQualityIndex === 1) {
        airIndex = "Good";
      } else if (airQualityIndex === 2) {
        airIndex = "Fair";
      } else if (airQualityIndex === 3) {
        airIndex = "Moderate";
      } else if (airQualityIndex === 4) {
        airIndex = "Poor";
      } else if (airQualityIndex === 5) {
        airIndex = "Very Poor";
      }
    }
    return airIndex;
  };

    const geoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({lat: latitude, lon: longitude});
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );

      const fetchLocation = async() => {
        try {
          const res = await axios.get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_API_KEY}`
          );
          setCity(res.data);

        } catch (error) {
          console.log("Error fetching the current position");
        }
      }
      fetchLocation();
    }
  }

  useEffect(() => {
    fetchData();
    fetchForecastData();
    geoLocation();
    setLocation("");
  }, [submitted]);

  useEffect(() => {
    fetchAirData();
  }, [latitude, longitude]);


  const handleClick = (event) => {
    event.preventDefault();
    setSubmitted(location);
  };

  const currentClick = () => {
    setLocation(city[0].name);
    setSubmitted(city[0].name);
  }

  function getIconCode() {
    if (weatherData) {
      const iconCode = weatherData.weather[0].icon;
      var iconURL = "";
      if (iconCode === '01d') {
        iconURL = clearDay;
      }

      else if (iconCode === '01n') {
        iconURL = clearNight;
      }

      else if (iconCode === '02d' || iconCode === '03d' || iconCode === '04d') {
        iconURL = cloudsDay;
      }

      else if (iconCode === '02n' || iconCode === '03n' || iconCode === '04n') {
        iconURL = cloudsNight;
      }

      else if (iconCode === '09d' || iconCode === '10d' || iconCode === '09n' || iconCode === '10n' ) {
        iconURL = rainDay;
      }

      else if (iconCode === '11d' || iconCode === '11n') {
        iconURL = thunderstorm;
      }

      else if (iconCode === '13d' || iconCode === '13n') {
        iconURL = snow;
      }

      else if (iconCode === '50d') {
        iconURL = mistDay;
      }

      else if (iconCode === '50n') {
        iconURL = mistNight;
      }    
    }
    return iconURL;
  }

  return (

    weatherData && forecastData ? (
    <div className="main-div" style={{backgroundImage: `url(${getIconCode()})`,height: '100%', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
      <Inputs
        location={location}
        inputChange={(e) => setLocation(e.target.value)}
        clicked={handleClick}
        current = {currentClick}
      />

          <TimeAndDate
            city={weatherData.name}
            country={weatherData.sys.country}
            dt={weatherData.dt}
            timezone={weatherData.timezone}
          />

          <CurrentWeather
            weather={Math.round(weatherData.main.temp)}
            details={weatherData.weather[0].description}
            icon={weatherData.weather[0].icon}
            pm25={airData.list[0].components.pm2_5}
            so2={airData.list[0].components.so2}
            no2={airData.list[0].components.no2}
            o3={airData.list[0].components.o3}
            airQuality={airQualityFunc()}
          />

          <Now
            feelsLike={weatherData.main.feels_like}
            humidity={weatherData.main.humidity}
            visiblity={weatherData.visibility / 1000}
            windSpeed={weatherData.wind.speed}
          />

          <SecondNow
            sunrise={weatherData.sys.sunrise}
            sunset={weatherData.sys.sunset}
            timezone={weatherData.timezone}
            tempMax={Math.round(weatherData.main.temp_max)}
            tempMin={Math.round(weatherData.main.temp_min)}
          />

          <HourlyForecast
            temp1={Math.round(forecastData.list[0].main.temp)}
            tempIcon1={forecastData.list[0].weather[0].icon}
            timezone={forecastData.city.timezone}
            dt1={forecastData.list[0].dt}

            temp2={Math.round(forecastData.list[1].main.temp)}
            tempIcon2={forecastData.list[1].weather[0].icon}
            dt2={forecastData.list[1].dt}

            temp3={Math.round(forecastData.list[2].main.temp)}
            tempIcon3={forecastData.list[2].weather[0].icon}
            dt3={forecastData.list[2].dt}

            temp4={Math.round(forecastData.list[3].main.temp)}
            tempIcon4={forecastData.list[3].weather[0].icon}
            dt4={forecastData.list[3].dt}

            temp5={Math.round(forecastData.list[4].main.temp)}
            tempIcon5={forecastData.list[4].weather[0].icon}
            dt5={forecastData.list[4].dt}

            temp6={Math.round(forecastData.list[5].main.temp)}
            tempIcon6={forecastData.list[5].weather[0].icon}
            dt6={forecastData.list[5].dt}

          />

          <Footer />
        </div>
      ) : (
        <div className="loading-div d-flex justify-content-center align-items-center">
        <div className="ring d-flex justify-content-center align-items-center">
        <div className="rot"></div>
        <p className="loading-text">Loading...</p>
        </div>
        </div>
      )
  );
}

export default App;