import React from 'react';
import {Link} from 'react-router-dom'
import './navigation.css'

const Navigation = () =>
  <div>
    <nav className="footer">
      <ul className="navigation_list">
        <li className="navigation_list_element">
          <Link className="navigation_list_element_link" to="/">Search</Link>
        </li>
        <li className="navigation_list_element">
          <Link className="navigation_list_element_link" to="/favourites/">Favourites</Link>
        </li>
      </ul>
    </nav>
  </div>;

export default Navigation;