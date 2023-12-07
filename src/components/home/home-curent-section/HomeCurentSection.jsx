import React from 'react';
import Card from '../post-card/PostCard';


export const HomeCurentSection = () => {
  return (
    <div className="content-section">
      <div className="section-heading">
        <h2 className="display-4">
          Latest Posts <i className="fal fa-play small"></i>
        </h2>
        <a href="videos.html">
          <i className="fal fa-list"></i> All
        </a>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Card image="https://placekitten.com/300/300" description="Some quick example text to build on the card title." url="single.html" />
        </div>
        <div className="col-md-4">
          <Card image="https://placekitten.com/300/300" description="Some quick example text to build on the card title." url="single.html" />
        </div>
        <div className="col-md-4">
          <Card image="https://placekitten.com/300/300" description="Some quick example text to build on the card title." url="single.html" />
        </div>
      </div>
    </div>
  );
};