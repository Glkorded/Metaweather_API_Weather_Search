import React from 'react'

const SingleCity = (
  {title,
    location_type,
    woeid,
    latt_long,
    handleFavourite,
    buttonName,
    buttonDisabled,
  }
) =>
    <div>
      <div>
        Title: {title}
      </div>
      <div>
        Location Type: {location_type}
      </div>
      <div>
        Woeid: {woeid}
      </div>
      <div>
        Latt_long: {latt_long}
      </div>
      <div>
        <button disabled={buttonDisabled} onClick={handleFavourite}>{buttonName}</button>
      </div>
    </div>;

export default SingleCity