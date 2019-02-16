import React from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'
import {debounce} from "./debounce";

class SingleCitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],           //Main data
      favourited: [],     //Favourited cities data
      searchTitle: '',    //State for input
      mustFetch: false,   //Special boolean for comfortable fetching
    }
  }

  /*Handling the input*/
  handleChange = e => {
    this.setState({
      searchTitle: e.target.value,
    });
    if (this.state.mustFetch !== true) { //We divide this.setState to prevent setting mustFetch to true on every change in input
      console.log("Must fetch status changed");
      this.setState({
        mustFetch: true                  //Here we change mustFetch status to enable fetching
      });
    }
    this.fetchMethod()
  };

  setNewData(data) {
    this.setState({
      data: data,
      mustFetch: false                    //Here we change mustFetch to false to prevent constant re-fetching
    });
    console.log("New data set...")
  }

  //We do so to gather new set of favourites because some of them may be deleted in Favourites section
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('favouriteData')) !== null)
    {
      this.setState({
        favourited: JSON.parse(localStorage.getItem('favouriteData'))
      })
    }
  }

  disabledCheckFunc = elem => {if (this.state.favourited !== null) {return this.state.favourited.map(e => e.woeid).some(el => el === elem)}}; //Function to check whether city is favourited

  /*Fetching method*/
  fetchMethod = debounce(async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com/api';
    if (this.state.mustFetch) { //Here we use above-mentioned mustFetch to prevent constant re-fetching
      console.log("Debounce started...");
      try {
        const response = await fetch(`${proxy}${url}/location/search/?query=${this.state.searchTitle}`);
        const data = await response.json();
        if (data !== undefined) {
          console.log("Data got...");
          this.setNewData(data)
        }
      }
      catch(error) {console.log('Error is ' + error)}
    }
  }, 500);

  render() {
    console.log("Must fetch status is " + this.state.mustFetch);
    return (
      <div>
        <h1>SEARCH</h1>
        <h2>
          Here you can type name of preferred city or part of it,
          and Searcher will find many big cities of the world.
          Click on the link to see detailed information.
        </h2>
        <input onChange={this.handleChange}/>
        <div>
          {this.state.data.map((single) =>
            <div key = {single.woeid}>
              <Link to={`../detailed_search/${single.woeid}`}>{single.title}</Link>
              <SingleCity
                key = {single.woeid}
                title = {single.title}
                location_type = {single.location_type}
                woeid = {single.woeid}
                latt_long = {single.latt_long}
                buttonName = "Favourite me!"
                buttonDisabled={this.disabledCheckFunc(single.woeid)}
                handleFavourite={() => {
                  const semiData = this.state.favourited.slice();
                  semiData.push(single);
                  this.setState({
                    favourited: semiData
                  });
                  localStorage.setItem('favouriteData', JSON.stringify(this.state.favourited)); //Here we set favourites to localStorage
                  this.setState({mustFetch: true});   //This is quite a crotch, if we delete this line, check for favourites would happen only on re-mounting the component and won't work as needed
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SingleCitySearch
