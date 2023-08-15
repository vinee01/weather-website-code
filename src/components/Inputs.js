import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";

function Inputs(props) {
  return (
    <div className="inputs-div d-flex align-items-center justify-content-between">
      <form className="d-flex form-box">
        <input
          className="search-box"
          type="text"
          placeholder="Search City"
          onChange={props.inputChange}
          value={props.location}
        ></input>
        
        <button className="button search-button text-center" type="submit" onClick={props.clicked}>
        <UilSearch size={20}/>
        </button>
      </form>

        <button className="button location-button text-center" type="submit" onClick={props.current}>
        <UilLocationPinAlt size={20}/>
        </button>
    </div>
  );
}

export default Inputs;
