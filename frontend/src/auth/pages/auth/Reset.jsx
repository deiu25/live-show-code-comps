import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Loader } from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import './AuthStyle.css'
import Button from "../../components/button/Button";

const initialState = {
  password: "",
  confirmPassword: "",
};

export const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <i className="uil uil-times"></i>;
  const checkIcon = <i className="uil uil-check"></i>;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  useEffect(() => {
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    if (password.match(/[A-Z]/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }

    if (password.match(/[0-9]/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (password.match(/[!@#$%^&*]/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
  }, [password]);


  const reset = async (e) => {
    e.preventDefault();
    
    if (password.length <= 7) {
      return toast.error("Password must be at least 8 characters long.");
    }
    if (!password.match(/[A-Z]/)) {
      return toast.error(
        "Password must contain at least one uppercase letter."
      );
    }
    if (!password.match(/[0-9]/)) {
      return toast.error("Password must contain at least one number.");
    }
    if (!password.match(/[!@#$%^&*]/)) {
      return toast.error(
        "Password must contain at least one special character."
      );
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const userData = { password };

    await dispatch(resetPassword({userData, resetToken}));
    navigate("/auth");
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/auth");
    }
    dispatch(RESET());
  }, [dispatch, navigate, isSuccess, message]);

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
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          ></path>
                        </svg>
                        <h4 className="authTitle">Reset Password</h4>
                        <p className="forgotParagraph">
                          Enter your new password below.
                        </p>
                        <form onSubmit={reset}>
                          <div className="form-group">
                            <PasswordInput
                              className="form-style"
                              id="newPassword"
                              autoComplete="off"
                              placeholder="Password"
                              name="password"
                              required
                              value={password}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <PasswordInput
                              className="form-style"
                              id="repeatPassword"
                              autoComplete="off"
                              placeholder="Repeat Password"
                              name="confirmPassword"
                              required
                              value={confirmPassword}
                              onChange={handleInputChange}
                            />
                          </div>
                          <Button>Reset Password</Button>
                        </form>
                        <div className="password-info">
                          <div className="password-info-item">
                            {switchIcon(passLength)}
                            At least 8 characters
                          </div>
                          <div className="password-info-item">
                            {switchIcon(uCase)}
                            At least 1 uppercase letter
                          </div>
                          <div className="password-info-item">
                            {switchIcon(num)}
                            At least 1 number
                          </div>
                          <div className="password-info-item">
                            {switchIcon(sChar)}
                            At least 1 special character
                          </div>
                        </div>
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
