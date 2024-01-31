import React from 'react';
import { Link } from 'react-router-dom';

export const PostsHeader = () => {
  return (
    <div className="header-section">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/newest">
            Newest
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/most-viewed">
            Most Viewed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/top-rated">
            Top Rated
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/components"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Components
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/button">
              Button
            </Link>
            <Link className="dropdown-item" to="/navbar">
              Navibar
            </Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/dropdown">
              Dropdown
            </Link>
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
  );
};
