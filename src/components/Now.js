
import { UilTear, UilTemperature, UilEye, UilWind } from '@iconscout/react-unicons';


function Now(props) {

    return (
        <div className="now-div row">

        <p className="light-text">Highlights</p>

        <div className="feels-like col-sm">
        <p className="light-text">Feels like</p>
        <div className="d-flex justify-content-between align-items-center">
        <UilTemperature size={40}/>
        <h2>{Math.round(props.feelsLike)}&deg;</h2>
        </div>
        </div>

        <div className="humidity col-sm">
        <p className="light-text">Humidity</p>
        <div className="d-flex justify-content-between align-items-center">
        <UilTear size={40}/>
        <h2>{props.humidity} %</h2>
        </div>
        </div>

        <div className="visiblity col-sm">
        <p className="light-text">Visiblity</p>
        <div className="d-flex justify-content-between align-items-center">
        <UilEye size={40}/>
        <h2>{props.visiblity} km</h2>
        </div>
        </div>

        <div className="windspeed col-lg">
        <p className="light-text">Wind speed</p>
        <div className="d-flex justify-content-between align-items-center">
        <UilWind size={40} />
        <h2>{props.windSpeed} m/s</h2>
        </div>
        </div>

        </div>
    );
}

export default Now