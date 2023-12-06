import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = ({ children }) => {
  return (
    <>
        {children}
        <div className="container" id="wrapper">
          <div className="row">
            <div className="col-md-3" id="sidebar">
              <div className="logo"></div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="index.html">
                    <i className="fal fa-home-alt"></i> Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                  <i className="fal fa-tasks"></i> Posts
                </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">
                    <i className="fal fa-info"></i> About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    <i className="fal fa-address-card"></i> Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="download.html">
                    <i className="fal fa-download"></i> Download
                  </a>
                </li>
              </ul>
              <i className="far fa-ellipsis-v"></i>
              <div className="copyright">
                <p>&copy; 2021 KMonlineWorks</p>
              </div>
            </div>
            <div className="col-md-9">
              <div id="main-area">
                <div className="header-section">
                  <ul className="nav justify-content-center">
                    <li className="nav-item">
                      <a className="nav-link active" href="category.html">
                        Category 1
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="category.html">
                        Category 2
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="category.html">
                        Category 3
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Dropdown
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div className="input-group col-md-6 offset-md-3 search-box">
                    <div className="input-group-prepend">
                      <i className="fal fa-search" id="searchPrepend"></i>
                    </div>
                    <div className="invalid-tooltip">
                      Please choose a unique and valid username.
                    </div>
                  </div>
                </div>
                <div className="content-section">
                  <div className="section-heading">
                    <h2 className="display-4">
                      Latest Posts <i className="fal fa-play small"></i>
                    </h2>
                    <a href="videos.html">
                      <i className="fal fa-list"></i> All
                    </a>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card" >
                        <a href="single.html"></a>
                        <div className="card-body">
                          <p className="card-text text-truncate">
                            Some quick example text to build on the card title.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card" >
                        <a href="single.html"></a>
                        <div className="card-body">
                          <p className="card-text text-truncate">
                            Some quick example text to build on the card title.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card" >
                        <a href="single.html"></a>
                        <div className="card-body">
                          <p className="card-text text-truncate">
                            Some quick example text to build on the card title.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 order-lg-2"></div>
                    <div className="col-lg-8 col-md-12 order-lg-1 social-links">
                      <div className="social-links">
                        <a href="https://kmonlineworks.blogspot.com">
                          <i className="fas fa-globe"></i> Website
                        </a>
                        <a href="mailto:kmonlineworks@gmail.com">
                          <i className="fal fa-envelope"></i> Email
                        </a>
                        <a href="https://web.facebook.com/kmonlineworks">
                          <i className="fab fa-facebook"></i> Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
