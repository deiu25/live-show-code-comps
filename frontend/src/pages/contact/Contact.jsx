import React from "react";

export const Contact = () => {
  return (
    <div className="content-section contact">
      <div className="row">
        <div className="col-md-5 order-md-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">For Web Development</h5>
              <img src="img/km-logo.png" alt="km online works" />
              <p className="card-text">
                <i className="fal fa-envelope"></i>{" "}
                <a href="mailto:kmonlineworks@gmail.com" className="links">
                  kmonlineworks@gmail.com
                </a>
              </p>
              <p className="card-text">
                <a href="https://www.facebook.com/kmonlineworks" className="links">
                  <i className="fab fa-facebook links"></i> Follow Facebook Page
                </a>
              </p>
              <p className="card-text">
                <a href="https://www.fiverr.com/kamranmubarik" className="links">
                  <i className="fal fa-globe links"></i> Order on Fiverr
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-7 order-lg-1">
          <div className="card">
            <div className="section-description">
              <h2 className="display-4">
                <i className="fal fa-pencil"></i> Get in Touch
              </h2>
            </div>
            <form>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" />
                <small className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control"></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
