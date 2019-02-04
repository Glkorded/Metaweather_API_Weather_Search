import React from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'
import {debounce} from "./debounce";

class SingleCitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTitle: '',
      mustFetch: false,
    }
  }

  handleChange = e => {
    this.setState({
      searchTitle: e.target.value,
    });
    if (this.state.mustFetch !== true) { //We divide this.setState to prevent setting mustFetch to true on every change in input
      console.log("Must fetch status changed");
      this.setState({
        mustFetch: true
      });
    }
    this.fetchMethod()
  };

  setNewData(data) {
    this.setState({
      data: data,
      mustFetch: false
    });
    console.log("New data set...")
  }

  fetchMethod = debounce(() => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com/api';
    if (this.state.mustFetch) {
      console.log("Debounce started...");
      fetch(`${proxy}${url}/location/search/?query=${this.state.searchTitle}`)
        .then(response => {
          if (response.ok) {
            console.log("Response got...");
            return response.json();
          }
        })
        .then(data => {
            if (data !== undefined) {
              console.log("Data got...")
              this.setNewData(data)
            }
          }
        )
        .catch(error => error);
    }
  }, 500);

  render() {
    console.log("Must fetch status is " + this.state.mustFetch);
    return (
      <div>
        <h2>
          Here you can type name of preferred city or part of it,
          and Searcher will find many big cities of the world.
          Click on the link to see detailed information.
        </h2>
        <input onChange={this.handleChange}/>
        <div>
          {this.state.data.map((single) =>
            <div key = {single.woeid}>
            <SingleCity
              key = {single.woeid}
              title = {single.title}
              location_type={single.location_type}
              woeid={single.woeid}
              latt_long={single.latt_long}
            />
            <Link to={`../detailed_search/${single.woeid}`}>{single.title}</Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SingleCitySearch;