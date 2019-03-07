import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Favourites = () => {
  const [data, setData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const Title = styled.h1`
    margin: 0px;
    color: gray;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-align: center;
  `;
  const SubTitle = styled.h2`
    margin: 0px;
    color: gray;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-align: center;
  `;

  /*Here I parse the localStorage*/
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("favouriteData")) !== null) {
      setData(JSON.parse(localStorage.getItem("favouriteData")));
    }
  }, []);
  /*Here I rewrite localStorage*/
  useEffect(() => {
    localStorage.setItem("favouriteData", JSON.stringify(data));
  });

  /*input handling*/
  const handleChange = e => {
    setSearchTitle(e.target.value);
  };

  /*filter func*/
  const filterFunction = elem => {
    if (searchTitle !== "") {
      if (elem.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return true;
      }
    } else {
      return elem.title;
    }
  };

  return (
    <div>
      <Title>FAVOURITES</Title>
      <SubTitle>
        Here you have list of favourited cities. Feel free to search through
        them via input.
      </SubTitle>
      <input onChange={handleChange} />
      <div>
        {data.filter(filterFunction).map((single, index) => (
          <div key={single.woeid}>
            <Link to={`../detailed_search/${single.woeid}`}>
              {single.title}
            </Link>
            <SingleCity
              key={single.woeid}
              title={single.title}
              location_type={single.location_type}
              woeid={single.woeid}
              latt_long={single.latt_long}
              buttonName="Unfavourite me!"
              buttonDisabled={false}
              handleFavourite={() => {
                const semiData = data.slice();
                semiData.splice(index, 1);
                setData(semiData);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
