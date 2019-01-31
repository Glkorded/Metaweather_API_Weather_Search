import React from 'react';
import SingleCitySearch from "./SingleCitySearch";
import {Route, Switch} from "react-router-dom";
import Navigation from './Navigation'
import DetailedCitySearch from "./DetailedCitySearch";

class App extends React.Component {

  render() {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route
            path="/search/"
            exact component={SingleCitySearch}
            />
          <Route
            path="/favourites/"
            //exact component={SingleCitySearch}
          />
          <Route
            path="/detailed_search/:cityId"
            exact component={DetailedCitySearch}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
