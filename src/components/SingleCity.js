import React from 'react'

const SingleCity = ( {title, location_type, woeid, latt_long} ) =>
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
  </div>;

export default SingleCity