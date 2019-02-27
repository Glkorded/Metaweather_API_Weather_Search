import React from "react";
import styled from "styled-components";

const DetailedCity = ({
  id,
  applicable_date,
  weather_state_abbr,
  wind_direction_compass,
  weather_state_name,
  wind_direction,
  wind_speed,
  min_temp,
  the_temp,
  max_temp
}) => {
  const TableBody = styled.tbody`
    display: flex;
    justify-content: space-around;
    height: auto;
    width: 200px;
    border: 2px solid red;
  `;

  const TableRow = styled.tr``;

  const TableData = styled.td`
    display: flex;
    justify-content: space-around;
    border: 1px solid green;
  `;

  const WeatherImage = styled.img`
    height: 64px;
    width: 64px;
  `;

  const WindPointerImage = styled.img`
    height: 16px;
    width: 16px;
    transform: rotate(${props => props.rotateDegree}deg);
  `;

  return (
    <TableBody>
      <TableRow>
        <TableData>Date: {applicable_date} </TableData>
        <TableData>
          <WeatherImage
            src={require(`../images/${weather_state_abbr}.svg`)}
            alt={weather_state_name}
          />
        </TableData>
        <TableData>
          <WindPointerImage
            src={require(`../images/windarrow.svg`)}
            alt={wind_direction_compass}
            rotateDegree={wind_direction.toFixed(0)}
          />
        </TableData>
        <TableData>{wind_speed.toFixed(0)}m/s </TableData>
        <TableData>Min temp: {min_temp.toFixed(1)}°C </TableData>
        <TableData>Temp: {the_temp.toFixed(1)}°C </TableData>
        <TableData>Max temp: {max_temp.toFixed(1)}°C </TableData>
      </TableRow>
    </TableBody>
  );
};

export default DetailedCity;
