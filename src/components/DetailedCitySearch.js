import React from 'react';
import DetailedCity from "./DetailedCity";

class SingleCitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedData: [],
    }
  }

  componentDidMount()
  {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com/api';
    fetch(`${proxy}${url}/location/${this.props.match.params.cityId}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(detailedData => this.setState({detailedData: detailedData.consolidated_weather}))
      .catch(error => error);
  }

  render() {
    return (
      <div>
        <table className="detailedCity__whole">
          {this.state.detailedData.map((detailed) =>
            <DetailedCity
              key = {detailed.id}
              applicable_date = {detailed.applicable_date}
              weather_state_name = {detailed.weather_state_name}
              wind_speed = {detailed.wind_speed}
              wind_direction = {detailed.wind_direction}
              wind_direction_compass = {detailed.wind_direction_compass}
              min_temp = {detailed.min_temp}
              the_temp = {detailed.the_temp}
              max_temp = {detailed.max_temp}
            />
          )}
        </table>
      </div>
    )
  }
}

export default SingleCitySearch;
