import React from 'react';
import SingleCitySearch from "./SingleCitySearch";
import {Route, Switch} from "react-router-dom";
import Navigation from './Navigation'
import DetailedCitySearch from "./DetailedCitySearch";
import Favourites from "./Favourites"

const App = () =>
      <div>
        <Navigation/>
        <Switch>
          <Route
            path="/"
            exact component={SingleCitySearch}
            />
          <Route
            path="/favourites/"
            exact component={Favourites}
          />
          <Route
            path="/detailed_search/:cityId"
            exact component={DetailedCitySearch}
          />
        </Switch>
      </div>;

export default App;
