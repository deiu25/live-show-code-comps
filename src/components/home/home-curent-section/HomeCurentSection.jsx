import React from "react";
import Card from "../post-card/PostCard";
import { HomeHeader } from "../home-header/HomeHeader";

export const HomeCurentSection = () => {
  return (
    <>
      <HomeHeader />
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
            <Card
              image="https://res.cloudinary.com/dvstsvpyz/image/upload/f_auto,q_auto/v1/imgs-comps/xonyj7tn33lv6h9qoxhy"
              description="New Blue Glow Button"
            />
          </div>
          <div className="col-md-4">
            <Card
              image="https://res.cloudinary.com/dvstsvpyz/image/upload/f_auto,q_auto/v1/imgs-comps/xonyj7tn33lv6h9qoxhy"
              description="New Blue Glow Button"
            />
          </div>
          <div className="col-md-4">
            <Card
              image="https://res.cloudinary.com/dvstsvpyz/image/upload/f_auto,q_auto/v1/imgs-comps/xonyj7tn33lv6h9qoxhy"
              description="New Blue Glow Button"
            />
          </div>
        </div>
      </div>
    </>
  );
};
