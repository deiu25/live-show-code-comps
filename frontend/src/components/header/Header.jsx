import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import livecodeshowlogo1 from "../../assets/logo/livecodeshowlogo1.png";

export const Header = () => {

  return (
    <header>
      <nav>
      <Link to='/' className=''>
            <img src={livecodeshowlogo1} alt='logo' className='editor-nav-logo' />
        </Link>
      </nav>
    </header>
  );
};
