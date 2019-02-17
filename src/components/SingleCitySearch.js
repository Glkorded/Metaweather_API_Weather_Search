import React, {useState, useEffect} from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'
import {debounce} from "./debounce";

const SingleCitySearch = () => {
  const [data, setData] = useState([]);//Main data
  const [favourited, setFavourited] = useState([]);//Favourited cities data
  const [searchTitle, setSearchTitle] = useState('');//State for input
  const [mustFetch, setMustFetch] = useState(false);//Special boolean for comfortable fetching

  /*Handling the input*/
  const handleChange = e => {
    setSearchTitle(e.target.value);
    if (mustFetch !== true) { //We divide this.setState to prevent setting mustFetch to true on every change in input
      console.log("Must fetch status changed");
      setMustFetch(true)                 //Here we change mustFetch status to enable fetching
    }
    fetchMethod()
  };

  const setNewData = (argData) => {
    setData(argData);
    setMustFetch(false);//Here we change mustFetch to false to prevent constant re-fetching
    console.log("New data set...")
  };

  //We do so to gather new set of favourites because some of them may be deleted in Favourites section
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favouriteData')) !== null)
    {
      setFavourited(JSON.parse(localStorage.getItem('favouriteData')))
    }}, []);

  useEffect(() => {
    localStorage.setItem('favouriteData', JSON.stringify(favourited)) //Here we set favourites to localStorage
  });

  const disabledCheckFunc = elem => {if (favourited !== null) {return favourited.map(e => e.woeid).some(el => el === elem)}}; //Function to check whether city is favourited

  /*Fetching method*/
  const fetchMethod = debounce(async() => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com/api';
    if (mustFetch) { //Here we use above-mentioned mustFetch to prevent constant re-fetching
      console.log("Debounce started...");
      try {
        const response = await fetch(`${proxy}${url}/location/search/?query=${searchTitle}`);
        const data = await response.json();
        if (data !== undefined) {
          console.log("Data got...");
          setNewData(data)
        }
      }
      catch(error) {console.log('Error is ' + error)}
    }
  }, 500);

  console.log("Must fetch status is " + mustFetch);
  return (
    <div>
      <h1>SEARCH</h1>
      <h2>
        Here you can type name of preferred city or part of it,
        and Searcher will find many big cities of the world.
        Click on the link to see detailed information.
      </h2>
      <input onChange={handleChange}/>
      <div>
        {data.map((single) =>
          <div key = {single.woeid}>
            <Link to={`../detailed_search/${single.woeid}`}>{single.title}</Link>
            <SingleCity
              key = {single.woeid}
              title = {single.title}
              location_type = {single.location_type}
              woeid = {single.woeid}
              latt_long = {single.latt_long}
              buttonName = "Favourite me!"
              buttonDisabled={disabledCheckFunc(single.woeid)}
              handleFavourite={() => {
                const semiData = favourited.slice();
                semiData.push(single);
                setFavourited(semiData);
                setMustFetch (true); //This is quite a crotch, if we delete this line, check for favourites would happen only on re-mounting the component and won't work as needed
                console.log(`${single.title} was added to favourites`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
};

export default SingleCitySearch
