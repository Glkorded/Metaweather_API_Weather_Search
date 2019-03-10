import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Favourites = () => {
  const [data, setData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const DataLink = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-decoration: none;
    color: #c88c32;
  `;

  const Wrapper = styled.div`
    display: flex;
    position: absolute;
    left: calc(50% - 427px);
    flex-direction: column;
    text-align: center;
    height: calc(100% - 61px);
    overflow: auto;
  `;

  const Title = styled.h1`
    position: sticky;
    margin: 0px;
    color: gray;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-align: center;
    top: 0px;
    z-index: 1;
    background: #edeef0;
  `;

  const SubTitle = styled.h2`
    position: sticky;
    margin: 0px;
    color: gray;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-align: center;
    top: 41px;
    z-index: 1;
    background: #edeef0;
  `;

  const Input = styled.input`
    position: sticky;
    top: 103px;
    z-index: 1;
    background: #edeef0;
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
    <Wrapper>
      <Title>FAVOURITES</Title>
      <SubTitle>
        Here you have list of favourited cities. Feel free to search through
        them via input.
      </SubTitle>
      <Input onChange={handleChange} />
      <div>
        {data.filter(filterFunction).map((single, index) => (
          <div key={single.woeid}>
            <DataLink to={`../detailed_search/${single.woeid}`}>
              {single.title}
            </DataLink>
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
    </Wrapper>
  );
};

export default Favourites;
