import React, { useState } from "react";
import "./Home.css";
import { HomeSidebar } from "../../components/home/home-sidebar/HomeSidebar";
import { HomeHeader } from "../../components/home/home-header/HomeHeader";
import { HomeCurentSection } from "../../components/home/home-curent-section/HomeCurentSection";

import { HomeFooter } from "../../components/home/home-footer/HomeFooter";
import { HomeAllPosts } from "../../components/home/home-posts/HomeAllPosts";
import { About } from "../about/About";

export const Home = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("home");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case "home":
        return <HomeCurentSection />;
      case "posts":
        return <HomeAllPosts />;
      case "about":
        return <About />;
      // Adăugați cazurile pentru celelalte tab-uri aici
      default:
        return <HomeCurentSection />;
    }
  };

  return (
    <>
      {children}
      <div className="container" id="wrapper">
        <div className="row">
          <HomeSidebar onTabChange={handleTabChange} currentTab={currentTab} />
          <div className="col-md-9">
            <div id="main-area">
              <HomeHeader />
              {renderCurrentTab()}
              <HomeFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};