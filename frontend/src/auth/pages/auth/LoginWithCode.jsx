import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RESET, loginWithCode, sendLoginCode } from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import './AuthStyle.css'
import Button from "../../components/button/Button";

export const LoginWithCode = () => {
    const [loginCode, setLoginCode] = useState("");
    const { email } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isLoggedIn, isSuccess } = useSelector(
        (state) => state.auth
    );

    const sendUserLoginCode = async () => {
      await dispatch(sendLoginCode(email));
      await dispatch(RESET());
    };

    const loginUserWithCode = async (e) => {
        e.preventDefault();

        if (loginCode.length !== 6) {
            return toast.error("Invalid login code");
        }

        if (!loginCode) {
            return toast.error("Please fill in all fields");
        }

        const code = {
            loginCode,
        };

        await dispatch(loginWithCode({ code, email }));
      };
    
      useEffect(() => {
        if (isSuccess && isLoggedIn) {
          navigate("/profile");
        }
    
        dispatch(RESET());
      }, [isLoggedIn, isSuccess, dispatch, navigate]);

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
                        <h4 className="forgotParagraph">
                          Enter Access Code
                        </h4>
                        <form onSubmit={loginUserWithCode}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="LoginCode"
                              value={loginCode}
                              className="form-style"
                              placeholder="Access Code"
                              id="email"
                              autoComplete="off"
                              required
                              onChange={(e) => setLoginCode(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <Button>Proced To Login</Button>
                          <br />
                          <span className="forgotParagraph">
                            Check your email for the access code.
                            </span>
                        </form>
                        <p onClick={sendUserLoginCode} className="resendLink">
                          <b>Resend Code</b>
                        </p>
                        <p className="forgotParagraph">
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
