import React from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";

const courses = [
  { name: "JavaScript", link: "/JavascriptCourse", color: "#00afaf" },
  { name: "React", link: "/ReactCourse", color: "#00bb00" },
  { name: "Node.js", link: "/NodejsCourse", color: "#0f2bff" },
  { name: "Redux", link: "/AngularCourse", color: "#ff6a2f" },
];

export const Courses = () => {
  const navigate = useNavigate();

  return (

    <div className="learn-card-body">
      <div className="learn-container">
        {courses.map((course, index) => (
          <div className="learn-card" style={{ "--color": course.color }} key={index}>
            <button className="learn-button" onClick={() => navigate(course.link)}>
              <span className="learn-text">{course.name}</span>
              <div className="learn-icon">
                <ArrowRight className="learn-svg"/>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>

  );
};
