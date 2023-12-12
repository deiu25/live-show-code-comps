import React from 'react'

export const PostsHeader = () => {
  return (
    <div className="header-section">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="category.html">
          Newest
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="category.html">
            Most Viewed
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="category.html">
            Top Rated
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
            Components
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">
              Button
            </a>
            <a className="dropdown-item" href="#">
              Navibar
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              Dropdown
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
  )
}
