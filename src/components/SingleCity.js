import React from "react";

const SingleCity = ({
  location_type,
  latt_long,
  handleFavourite,
  buttonName,
  buttonDisabled
}) => (
  <div>
    <div>Location type: {location_type}</div>
    <div>It's coordinates are {latt_long}</div>
    <div>
      <button disabled={buttonDisabled} onClick={handleFavourite}>
        {buttonName}
      </button>
    </div>
  </div>
);

export default SingleCity;
