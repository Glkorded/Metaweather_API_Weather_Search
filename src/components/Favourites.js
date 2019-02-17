import React, {useState, useEffect} from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'

const Favourites = () => {
  const [data, setData] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  /*Here I parse the localStorage*/
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favouriteData')) !== null)
    {
      setData(JSON.parse(localStorage.getItem('favouriteData')))
    }
  }, []);
 /*Here I rewrite localStorage*/
  useEffect(() => {
    localStorage.setItem('favouriteData', JSON.stringify(data));
  });


  /*input handling*/
  const handleChange = e => {
    setSearchTitle(e.target.value)
  };

  /*filter func*/
  const filterFunction = (elem) => {
    if (searchTitle !== "") {
      if (elem.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return true
      }
    } else {
      return elem.title
    }
  };

  return (
    <div>
      <h1>FAVOURITES</h1>
      <h2>
        Here you have list of favourited cities. Feel free to search through them via input.
      </h2>
      <input onChange={handleChange}/>
      <div>
        {data.filter(filterFunction).map((single, index) =>
          <div key = {single.woeid}>
            <Link to={`../detailed_search/${single.woeid}`}>{single.title}</Link>
            <SingleCity
              key = {single.woeid}
              title = {single.title}
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
        )}
      </div>
    </div>
  )
};

export default Favourites;
