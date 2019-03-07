import React, { useState, useEffect } from "react";
import DetailedCity from "./DetailedCity";
import styled from "styled-components";

const DetailedCitySearch = ({ match }) => {
  const Table = styled.table`
    display: flex;
    position: absolute;
    left: calc(50% - 356px);
    top: calc(50% - 250px);
    flex-direction: column;
    background: #fffefe;
    width: 762px;
    border: 4px solid gray;
  `;

  const [detailedData, setDetailedData] = useState([]);

  async function fetchAPI() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www.metaweather.com/api";
    try {
      const response = await fetch(
        `${proxy}${url}/location/${match.params.cityId}`
      );
      const data = await response.json();
      setDetailedData(data.consolidated_weather); //Here we gather only "consolidated_weather", originally, set of objects from API has a lot more things
    } catch (error) {
      console.log(error);
    }
  }

  /*We gather the data via Router on component mounting*/
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <Table>
        {detailedData.map((
          detailed //Mapping through gathered data
        ) => (
          <DetailedCity
            key={detailed.id}
            applicable_date={detailed.applicable_date}
            weather_state_name={detailed.weather_state_name}
            weather_state_abbr={detailed.weather_state_abbr}
            wind_speed={detailed.wind_speed}
            wind_direction={detailed.wind_direction}
            min_temp={detailed.min_temp}
            the_temp={detailed.the_temp}
            max_temp={detailed.max_temp}
          />
        ))}
      </Table>
    </div>
  );
};

export default DetailedCitySearch;
