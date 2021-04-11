import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  console.log("Render NavigationBar", location);

  const buttonStyle = {
    background: "none",
    border: 0,
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Team Up
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          //style={buttonStyle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  "nav-link" + (location.pathname === "/" ? " active" : "")
                }
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/createPost" ? " active" : "")
                }
                to="/createPost"
              >
                Write a Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/dashboard" ? " active" : "")
                }
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/testingPage" ? " active" : "")
                }
                to="/testingPage"
              >
                TestingPage
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
