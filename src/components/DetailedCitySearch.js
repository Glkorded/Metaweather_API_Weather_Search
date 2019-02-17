import React, { useState, useEffect } from "react";
import DetailedCity from "./DetailedCity";

const DetailedCitySearch = ({ match }) => {
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
  });

  return (
    <div>
      <table className="detailedCity__whole">
        {detailedData.map((
          detailed //Mapping through gathered data
        ) => (
          <DetailedCity
            key={detailed.id}
            applicable_date={detailed.applicable_date}
            weather_state_name={detailed.weather_state_name}
            wind_speed={detailed.wind_speed}
            wind_direction={detailed.wind_direction}
            wind_direction_compass={detailed.wind_direction_compass}
            min_temp={detailed.min_temp}
            the_temp={detailed.the_temp}
            max_temp={detailed.max_temp}
          />
        ))}
      </table>
    </div>
  );
};

export default DetailedCitySearch;
