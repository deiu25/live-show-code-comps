import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import Button from "../../components/button/Button";

export const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid Email");
    }

    const userData = { email };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET());
  };

  return (
    <div className="section full-bg">
      <div className="custom-container">
        {isLoading && <Loader />}
        <div className="custom-row full-height">
          <div className="custom-div">
            <div className="custom-section">
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          width="50"
                          height="50"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          ></path>
                        </svg>
                        <h4 className="forgotTitle">
                          Forgot Password
                        </h4>
                        <p className="forgotParagraph">
                          Enter your email to receive a password reset link.
                        </p>
                        <form onSubmit={forgot}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              value={email}
                              className="form-style"
                              placeholder="Your Email"
                              id="email"
                              autoComplete="off"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <Button>Send Reset Link</Button>
                        </form>
                        <p className="custom-paragraph">
                          <Link to="/auth">Back to Login</Link>
                        </p>
                        <p className="custom-paragraph">
                          <Link to="/">Back to Home</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
