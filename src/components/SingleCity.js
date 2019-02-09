import React, {Component} from 'react'

class SingleCity extends Component {

  render() {
    const { title, location_type, woeid, latt_long, handleFavourite } = this.props;
    return (
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
          <button onClick={handleFavourite}>Favourite me!</button>
        </div>
      </div>
  )
  }
}
export default SingleCity