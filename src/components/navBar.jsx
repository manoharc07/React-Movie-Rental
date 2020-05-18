import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/react-project">
        Project
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/react-project/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/react-project/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/react-project/rentals">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/react-project/login">
                Login
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/react-project/register"
              >
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                className="nav-item nav-link"
                to="/react-project/profile"
              >
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/react-project/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
