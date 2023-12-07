import React from "react";

export const HomeFooter = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="col-lg-4 col-md-12 order-lg-2"></div>
        <div className="col-lg-8 col-md-12 order-lg-1 social-links">
          <div className="social-links">
            <a href="https://kmonlineworks.blogspot.com">
              <i className="fas fa-globe"></i> Website
            </a>
            <a href="mailto:kmonlineworks@gmail.com">
              <i className="fal fa-envelope"></i> Email
            </a>
            <a href="https://web.facebook.com/kmonlineworks">
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
