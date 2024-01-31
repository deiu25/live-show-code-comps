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
            <h5 className="about-title">Introduction</h5>
            <div className="about-card wave-effect">
              <p className="about-text">
                This application is a digital hub dedicated to programming
                enthusiasts, offering an innovative space for showcasing source
                code and discussions on cutting-edge technologies. It is
                designed to enable users to create and distribute software
                development-oriented content, including detailed blog posts and
                code snippets.
              </p>
              <p className="about-text">
                The core of this platform is a well-structured post management
                system, allowing for the addition, updating, and deletion of
                content in an easy and secure manner. This functionality is
                essential for sharing code examples, tutorials, and technical
                discussions, facilitating a valuable exchange of information
                among programmers.
              </p>
              <p className="about-text">
                The section dedicated to creating a new blog article perfectly
                exemplifies how the application supports the addition of dynamic
                and interactive content. Utilizing React and modern front-end
                development techniques, it offers users a smooth and efficient
                user experience. The content block addition section is a key
                part of this application. Various types of content blocks can be
                added, such as text or images, providing great flexibility in
                how content is presented. The drag-and-drop functionality for
                arranging content blocks or removing them offers an intuitive
                and interactive user experience.
              </p>
              <p className="about-text">
                Integration with Cloudinary enhances the user experience by
                efficiently managing images, allowing for the uploading and
                storage of code views and diagrams. This enhances the clarity
                and visual impact of posts, providing users with an expressive
                method to present their work.
              </p>
              <p className="about-text">
                The platform includes a robust and secure authentication system,
                ensuring the confidentiality and protection of users' personal
                data. Password reset functions and account verification through
                email add an extra layer of security, while Google
                authentication offers a convenient access method.
              </p>
              <p className="about-text">
                This application is not just a simple code-sharing site, but a
                complex ecosystem, intended for developers who wish to learn,
                collaborate, and share knowledge in the field of programming. It
                is a platform that encourages innovation, creativity, and
                collaboration in the world of software development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
