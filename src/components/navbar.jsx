import React from "react";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Patient Information: {props.totalItemsNumber}
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
