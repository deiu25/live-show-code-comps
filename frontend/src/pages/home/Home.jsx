import React, { useState } from "react";
import "./Home.css";
import { HomeSidebar } from "../../components/home/home-sidebar/HomeSidebar";
import { HomeCurentSection } from "../../components/home/home-curent-section/HomeCurentSection";
import { HomeAllPosts } from "../../components/home/home-posts/HomeAllPosts";
import { About } from "../about/About";
import { BlogPosts } from "../../aplication/blog/pages/blog-posts/BlogPosts";
import { Learn } from "../../aplication/learn/components/Learn";


export const Home = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
      case "blog":
        return <BlogPosts />;
      case "learn":
        return <Learn />;
      case "about":
        return <About />;
      default:
        return <HomeCurentSection />;
    }
  };

  return (
    <>
      {children}
      <div className=" home-container" id="wrapper">
        <div className="row">
          <HomeSidebar
            onTabChange={handleTabChange}
            currentTab={currentTab}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className={`col-md-${isSidebarOpen ? "9" : "11"}`}>
            <div id="main-area">
              {renderCurrentTab()}
              {/* <HomeFooter /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
