
import { DateTime, FixedOffsetZone } from "luxon";

function TimeAndDate(props) {

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
    const localDate = localDateTime.toFormat("EEEE, d LLLL yyyy' | Local time:' hh:mm a");

    return localDate;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

const timezone = props.timezone;
const dtInSeconds = props.dt;

const localDate = getLocalDate(timezone, dtInSeconds);

    return (
        <div>
        <div className="timeAndDate-div">
        <p className="local-time-text">{localDate}</p>
        </div>

        <div className="city-div d-flex justify-content-center">
        <h2>{props.city}, {props.country}</h2>
        </div>

        </div>
    );
}

export default TimeAndDate