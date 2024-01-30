import React from "react";
import { BlogPostNavbar } from "../../../blog/components/blog-post-navbar/BlogPostNavbar";
import "./JavascriptCourse.css";

const chapters = [
  {
    title: "Introducere în JavaScript",
    description: "Descriere scurtă...",
    id: 1,
  },
  {
    title: "Variabile și Tipuri de Date",
    description: "Descriere scurtă...",
    id: 2,
  },
  {
    title: "Structuri de Control",
    description: "Descriere scurtă...",
    id: 3,
  },
  {
    title: "Funcții",
    description: "Descriere scurtă...",
    id: 4,
  },
  {
    title: "Arrays",
    description: "Descriere scurtă...",
    id: 5,
  },
  { title: "Obiecte", description: "Descriere scurtă...", id: 6 },
  { title: "Clase", description: "Descriere scurtă...", id: 7 },
  { title: "DOM", description: "Descriere scurtă...", id: 8 },
];

export const JavascriptCourse = () => {
  return (
    <>
      <BlogPostNavbar />
      <div className="course-body">
        <div className="course-header">
          <div className="course-title">Curs Rapid Javascript</div>
        </div>
        <div className="course-map">
          {chapters.map((chapter) => (
            <div className="chapter-card" key={chapter.id}>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
