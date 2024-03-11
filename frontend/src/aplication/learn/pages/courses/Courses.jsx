import React from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";

const courses = [
  { name: "JavaScript", link: "/JavascriptCourse", className: "javascript-course" },
  { name: "React", link: "/ReactCourse", className: "react-course" },
  { name: "Node.js", link: "/NodejsCourse", className: "nodejs-course" },
  { name: "Redux", link: "/Redux", className: "redux-course" },
];

export const Courses = () => {
  return (
    <div className="learn-card-body">
      <div className="learn-container">
        {courses.map((course) => (
          <div className={`learn-card ${course.className}`} key={course.name}>
            <Link to={course.link} className="learn-button">
              <span className="learn-text">{course.name}</span>
              <div className="learn-icon">
                <ArrowRight className="learn-svg" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
