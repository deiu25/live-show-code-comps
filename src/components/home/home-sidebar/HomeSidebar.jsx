import React from 'react'
import { Link } from 'react-router-dom'

export const HomeSidebar = () => {
  return (
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
                <p>&copy; 2023</p>
              </div>
            </div>
  )
}
