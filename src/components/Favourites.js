import React from 'react';
import SingleCity from './SingleCity'
import {Link} from 'react-router-dom'

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTitle: '',
    }
  }

  /*Here I parse the localStorage*/
  componentDidMount(){
    if (JSON.parse(localStorage.getItem('favouriteData')) !== null)
    {
      this.setState({
        data: JSON.parse(localStorage.getItem('favouriteData'))
      });
    }
  }

  /*I do so to rewrite localStorage when I unfavourite some of cities in favourite*/
  componentWillUnmount() {
    localStorage.setItem('favouriteData', JSON.stringify(this.state.data));
  }

  /*input handling*/
  handleChange = e => {
    this.setState({
      searchTitle: e.target.value,
    });
  };

  /*filter func*/
  filterFunction = (elem) => {
    if (this.state.searchTitle !== "") {
      if (elem.title.toLowerCase().includes(this.state.searchTitle.toLowerCase())) {
        return true
      }
    } else {
      return elem.title
    }
  };

  render() {
    return (
      <div>
        <h1>FAVOURITES</h1>
        <h2>
          Here you can type name of preferred city or part of it,
          and Searcher will find many big cities of the world.
          Click on the link to see detailed information.
        </h2>
        <input onChange={this.handleChange}/>
        <div>
          {this.state.data.filter(this.filterFunction).map((single, index) =>
            <div key = {single.woeid}>
              <Link to={`../detailed_search/${single.woeid}`}>{single.title}</Link>
              <SingleCity
                key = {single.woeid}
                title = {single.title}
                location_type={single.location_type}
                woeid={single.woeid}
                latt_long={single.latt_long}
                buttonName="Unfavourite me!"
                handleFavourite={() => {
                  const semiData = this.state.data.slice();
                  semiData.splice(index, 1);
                  this.setState({
                    data: semiData
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Favourites;
