import { DateTime, FixedOffsetZone } from "luxon";

function HourlyForecast(props) {

    const iconCode1 = `http://openweathermap.org/img/wn/${props.tempIcon1}@2x.png`;
    const iconCode2 = `http://openweathermap.org/img/wn/${props.tempIcon2}@2x.png`;
    const iconCode3 = `http://openweathermap.org/img/wn/${props.tempIcon3}@2x.png`;
    const iconCode4 = `http://openweathermap.org/img/wn/${props.tempIcon4}@2x.png`;
    const iconCode5 = `http://openweathermap.org/img/wn/${props.tempIcon5}@2x.png`;
    const iconCode6 = `http://openweathermap.org/img/wn/${props.tempIcon6}@2x.png`;
    

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
      
      const localDate1 = getLocalDate(timezone, props.dt1);
      const localDate2 = getLocalDate(timezone, props.dt2);
      const localDate3 = getLocalDate(timezone, props.dt3);
      const localDate4 = getLocalDate(timezone, props.dt4);
      const localDate5 = getLocalDate(timezone, props.dt5);
      const localDate6 = getLocalDate(timezone, props.dt6);


    return (
        <div className="forecast-div row">

            <p className="light-text">Hourly Forecast</p>

            <div className="hour first-hour col">
            <p>{localDate1}</p>
            <img src={iconCode1} alt="unable to load"></img>
            <p>{props.temp1}°</p>
            </div>

            <div className="hour col">
            <p>{localDate2}</p>
            <img src={iconCode2} alt="unable to load"></img>
            <p>{props.temp2}°</p>
            </div>

            <div className="hour col">
            <p>{localDate3}</p>
            <img src={iconCode3} alt="unable to load"></img>
            <p>{props.temp3}°</p>
            </div>

            <div className="hour col">
            <p>{localDate4}</p>
            <img src={iconCode4} alt="unable to load"></img>
            <p>{props.temp4}°</p>
            </div>

            <div className="hour col">
            <p>{localDate5}</p>
            <img src={iconCode5} alt="unable to load"></img>
            <p>{props.temp5}°</p>
            </div>

            <div className="hour col">
            <p>{localDate6}</p>
            <img src={iconCode6} alt="unable to load"></img>
            <p>{props.temp6}°</p>
            </div>
            
        </div>
    );
}

export default HourlyForecast