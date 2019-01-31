import React from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'

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
    //  if (e.key === "Enter") {
    this.setState({
      searchTitle: e.target.value,
      mustFetch: !this.state.mustFetch
    })
    //   }
  };

  setNewData(data) {
    this.setState({
      data: data,
      mustFetch: !this.state.mustFetch
    })
  }

  render() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.metaweather.com/api';
    if (this.state.mustFetch) {
      fetch(`${proxy}${url}/location/search/?query=${this.state.searchTitle}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        })
        .then(data => {
            if (data !== undefined) {
              this.setNewData(data)
            }
          }
        )
        .catch(error => error);
    }
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
            <div>
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
