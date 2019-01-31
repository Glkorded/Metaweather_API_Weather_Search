import React from 'react'
import './detailedcity.css'

const DetailedCity = ({id, applicable_date, weather_state_name, wind_direction, wind_direction_compass, wind_speed, min_temp, the_temp, max_temp} ) =>
  <div className="detailedCity__single">
  <tr>
    <td className="detailedCity__single__element">
      Date: {applicable_date}
    </td>
    <td className="detailedCity__single__element">
      Weather: {weather_state_name}
    </td>
    <td className="detailedCity__single__element">
      Wind: {wind_direction.toFixed(1)}
    </td>
    <td className="detailedCity__single__element">
      Wind direction: {wind_direction_compass}
    </td>
    <td className="detailedCity__single__element">
      Wind speed: {wind_speed.toFixed(1)}
    </td>
    <td className="detailedCity__single__element">
      Min temp: {min_temp.toFixed(1)}
    </td>
    <td className="detailedCity__single__element">
      Temp: {the_temp.toFixed(1)}
    </td>
    <td className="detailedCity__single__element">
      Max temp: {max_temp.toFixed(1)}
    </td>
  </tr>
  </div>;

export default DetailedCity