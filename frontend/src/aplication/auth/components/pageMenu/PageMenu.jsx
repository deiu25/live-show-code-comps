import React from "react";
import { NavLink } from "react-router-dom";
import { AdminAuthorLink } from "../protect/hiddenLink";
import "./PageMenu.css";

export const PageMenu = () => {
  return (
    <nav className="navi">
      <input type="checkbox" id="checkbox1" />
      <label htmlFor="checkbox1" id="icon1">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          ></path>
        </svg>
      </label>
      <div className="navList">
        <div className="navLink hover-effect">
          <NavLink to="/profile" activeclassname="active">Profile</NavLink>
        </div>
        <div className="navLink hover-effect">
          <NavLink to="/changePassword" activeclassname="active">Change Password</NavLink>
        </div>
        <AdminAuthorLink>
          <div className="navLink hover-effect">
            <NavLink to="/users" activeclassname="active">Users</NavLink>
          </div>
        </AdminAuthorLink>
      </div>
    </nav>
  );
};
