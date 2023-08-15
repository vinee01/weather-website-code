import { UilSun, UilSunset, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons';
import { DateTime, FixedOffsetZone } from 'luxon';

function SecondNow(props) {

// Function to convert seconds to ISO 8601 format
function secondsToISO(seconds) {
    return new Date(seconds * 1000).toISOString();
  }
  
  // Function to get the local date using Luxon with dynamic timezone and dt in seconds
  function getLocalDate(timezone, dtInSeconds) {
    try {
      // Convert seconds to ISO 8601 format
      const dtISO = secondsToISO(dtInSeconds);
  
      // Create a DateTime object with the provided dt and timezone offset
      const offsetMinutes = timezone / 60;
      const localDateTime = DateTime.fromISO(dtISO, { zone: FixedOffsetZone.instance(offsetMinutes) });
  
      // Get the local date in the user's timezone
      const localDate = localDateTime.toFormat("hh:mm a");
  
      return localDate;
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  }

  const timezone = props.timezone;
  const sunriseDate = props.sunrise;
  const sunsetDate = props.sunset;

  const sunriseTime = getLocalDate(timezone, sunriseDate);
  const sunsetTime = getLocalDate(timezone, sunsetDate);

    return(
        <div className="second-now-div row">
        
            <div className="sunrise-sunset d-flex align-items-center justify-content-between col">

            <div>
            <p className="light-text">Sunrise</p>
            <div className='sunrise d-flex align-items-center justify-content-between'>
            <UilSun className="sunrise-icon" size={40}/>
            <h2 className="sunrise-sunset-text">{sunriseTime}</h2>
            </div>
            </div>

            <div>
            <p className="light-text">Sunset</p>
            <div className='sunset d-flex align-items-center justify-content-between'>
            <UilSunset className="sunset-icon" size={40}/>
            <h2 className='sunrise-sunset-text'>{sunsetTime}</h2>
            </div>
            </div>

            </div>

            <div className="min-max-temp d-flex align-items-center justify-content-between col">

            <div>
            <p className="light-text">Maximum</p>
            <div className='max-temp d-flex align-items-center justify-content-between'>
            <h2 className='text-hide'>High</h2>
            <UilArrowUp size={40}/>
            <h2>{props.tempMax}&deg;</h2>
            </div>
            </div>

            <div>
            <p className="light-text">Minimum</p>
            <div className='min-temp d-flex align-items-center justify-content-between'>
            <h2 className='text-hide'>Low</h2>
            <UilArrowDown size={40}/>
            <h2>{props.tempMin}&deg;</h2>
            </div>
            </div>

            </div>

        </div>
    );
}

export default SecondNow