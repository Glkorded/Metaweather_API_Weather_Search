import React from "react";
import styled from "styled-components";

const DetailedCity = ({
  id,
  applicable_date,
  weather_state_name,
  wind_direction,
  wind_direction_compass,
  wind_speed,
  min_temp,
  the_temp,
  max_temp
}) => {
  const TableBody = styled.tbody`
    display: flex;
    justify-content: space-around;
    height: 200px;
    width: 200px;
    border: 2px solid red;
  `;

  const TableRow = styled.tr``;

  const TableData = styled.td`
    display: flex;
    justify-content: space-around;
    border: 1px solid green;
  `;

  return (
    <TableBody>
      <TableRow>
        <TableData>Date: {applicable_date} </TableData>
        <TableData>Weather: {weather_state_name} </TableData>
        <TableData>Wind: {wind_direction.toFixed(1)}°</TableData>
        <TableData>Wind direction: {wind_direction_compass} </TableData>
        <TableData>Wind speed: {wind_speed.toFixed(1)}m/s </TableData>
        <TableData>Min temp: {min_temp.toFixed(1)}°C </TableData>
        <TableData>Temp: {the_temp.toFixed(1)}°C </TableData>
        <TableData>Max temp: {max_temp.toFixed(1)}°C </TableData>
      </TableRow>
    </TableBody>
  );
};

export default DetailedCity;
