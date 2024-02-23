import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../../../redux/features/auth/authSlice";
import Button from "../../components/button/Button";

export const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

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
    <div id="login-container">
      <div className="login-form">
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
        <h4 className="forgotParagraph">Enter Access Code</h4>
        <form onSubmit={loginUserWithCode}>
          <div className="form-group">
            <input
              type="text"
              name="LoginCode"
              value={loginCode}
              className="forgot-input"
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
          <Button>Resend Access Code</Button>
        </p>
        <p className="forgotParagraph">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
      <div id="rays">
        <svg
          fill="none"
          viewBox="0 0 299 152"
          height="9em"
          width="18em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#paint0_linear_8_3)"
            d="M149.5 152H133.42L9.53674e-07 4.70132e-06H149.5L299 4.70132e-06L165.58 152H149.5Z"
          ></path>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="12.1981"
              x2="150.12"
              y1="152"
              x1="149.5"
              id="paint0_linear_8_3"
            >
              <stop stopColor="#00E0FF"></stop>
              <stop stopOpacity="0" stopColor="#65EDFF" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div id="emiter">

      </div>
      </div>
  );
};
