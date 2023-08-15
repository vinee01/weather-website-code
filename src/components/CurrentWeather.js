
function CurrentWeather(props) {

    const iconCode = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;

    return (
        <div className="current-weather-container d-flex justify-content-center row">

        <div className="current-weather-div col">
        <p className="light-text">Now</p>
        <div className="d-flex align-items-center justify-content-between">
        <h1 className="temperature-head">{props.weather}&deg;</h1>
        <img src={iconCode} alt="unable to load"></img>
        </div>
        <h4>{props.details}</h4>
        </div>

        <div className="current-weather-div air-quality-div d-flex flex-column col justify-content-between">
        <p className="light-text">Air Quality Index</p>

        <div className="d-flex justify-content-between align-items-center">
        <div className="text-center">
        <p className="light-text">PM2.5</p>
        <h2>{props.pm25}</h2>
        </div>

        <div className="text-center">
        <p className="light-text">SO2</p>
        <h2>{props.so2}</h2>
        </div>

        <div className="text-center">
        <p className="light-text">NO2</p>
        <h2>{props.no2}</h2>
        </div>

        <div className="text-center">
        <p className="light-text">O3</p>
        <h2>{props.o3}</h2>
        </div>

        </div>

        <p>{props.airQuality}</p>

        </div>

        </div>
    );
}

export default CurrentWeather