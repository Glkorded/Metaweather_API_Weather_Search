import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  const Footer = styled.nav`
    margin-top: 90px;
    width: 100%;
    height: auto;
    background-color: #41abe1;
    position: fixed;
    bottom: 0;
  `;

  const List = styled.ul`
    text-align: center;
  `;

  const ListElement = styled.li`
    display: inline;
    padding: 30px;
    margin: auto;
  `;

  const LinkElement = styled(Link)`
    color: antiquewhite;
    font-size: 22px;
    font-weight: bold;
    font-family: "KoHo", sans-serif;
    text-decoration: none;
    :hover {
      color: #006dbf;
      text-decoration: none;
    }
  `;
  return (
      <Footer>
        <List>
          <ListElement>
            <LinkElement to="/">Search</LinkElement>
          </ListElement>
          <ListElement>
            <LinkElement to="/favourites/">Favourites</LinkElement>
          </ListElement>
        </List>
      </Footer>
  );
};

export default Navigation;
