import React from "react";
import "./About.css";
// import { AboutHeader } from "../../components/home/about-header/AboutHeader";

export const About = () => {
  return (
    <>
      {/* <AboutHeader /> */}
      <div className="content-section about">
        <div className="row">
          <div className="col-lg-10 col-md-12 offset-lg-1">
            <h5 className="about-title">About</h5>
            <div className="about-card wave-effect">
              <p className="about-text">
              This application is a premier digital hub for programming enthusiasts, offering a curated space to explore source code and engage with discussions on cutting-edge technologies. It provides an unparalleled platform for users to immerse themselves in content related to software development, including comprehensive blog posts and detailed code snippets.
              </p>
              <p className="about-text">
              Central to this platform is a meticulously organized content exploration system. It empowers users to navigate through a wealth of programming knowledge, from code examples and tutorials to technical discussions, thus promoting a rich exchange of information within the programming community.
              </p>
              <p className="about-text">
              Security and user privacy are paramount. The platform boasts a robust and secure authentication system to protect user personal data comprehensively. Features like password reset and account verification via email, alongside Google authentication, ensure both safety and ease of access.
              </p>
              <p className="about-text">
              Beyond being a simple repository of code, this application has grown into a vibrant ecosystem for developers to delve into learning, observe and discuss innovations, and connect over shared interests in the software domain. It is a testament to the spirit of innovation, creativity, and collaboration that defines the software development community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
