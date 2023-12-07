import React from "react";
import "./Home.css";
import { HomeSidebar } from "../../components/home/home-sidebar/HomeSidebar";
import { HomeHeader } from "../../components/home/home-header/HomeHeader";
import { HomeCurentSection } from "../../components/home/home-curent-section/HomeCurentSection";
import { HomeFooter } from "../../components/home/home-footer/HomeFooter";

export const Home = ({ children }) => {
  return (
    <>
      {children}
      <div className="container" id="wrapper">
        <div className="row">
          <HomeSidebar />
          <div className="col-md-9">
            <div id="main-area">
              <HomeHeader />
              <HomeCurentSection />
              <HomeFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
