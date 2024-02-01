import React from 'react'

export const AboutHeader = () => {
    return (
        <div className="header-section">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link" href="category.html">
              About 1
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="category.html">
                About 2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="category.html">
                About 3
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
                About DropDown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  1
                </a>
                <a className="dropdown-item" href="#">
                  2
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  3
                </a>
              </div>
            </li>
          </ul>
        </div>
      )
}
