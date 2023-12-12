import React from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";
import LinkButton from "../button/LinkButton";
import { Logout } from "../button/Logout";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/auth");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-logo" onClick={goHome}>
          <h1>SyntaxSeeker</h1>
        </div>
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox" id="icon">
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
        <ul className="navbar-list">
          <ShowOnLogout>
            <LinkButton to="/auth">Auth</LinkButton>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to="/profile" className={activeLink}>
                <UserName />
              </NavLink>
            </li>
            <li>
              <Logout onClick={logoutUser} />
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};
