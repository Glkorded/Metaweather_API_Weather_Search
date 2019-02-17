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
          Here you have list of favourited cities. Feel free to search through them via input.
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
                buttonDisabled={false}
                handleFavourite={() => {
                  const semiData = this.state.data.slice();
                  semiData.splice(index, 1);
                  this.setState({
                    data: semiData
                  }, () => {localStorage.setItem('favouriteData', JSON.stringify(this.state.data))}
                );
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
