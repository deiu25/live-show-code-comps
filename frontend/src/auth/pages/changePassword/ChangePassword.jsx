import React, { useEffect, useState } from "react";
import { PageMenu } from "../../components/pageMenu/PageMenu";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RESET,
  changePassword,
  logout,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";
import "./ChangePassword.css";
import Button from "../../components/button/Button";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;

  const { isLoading, user, error } = useSelector((state) => state.auth);

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
    if (newPassword.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    if (newPassword.match(/[A-Z]/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }

    if (newPassword.match(/[0-9]/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (newPassword.match(/[!@#$%^&*]/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
  }, [newPassword]);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill in all fields!");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (newPassword.length <= 7) {
      return toast.error("Password must be at least 8 characters long.");
    }
    if (!newPassword.match(/[A-Z]/)) {
      return toast.error(
        "Password must contain at least one uppercase letter."
      );
    }
    if (!newPassword.match(/[0-9]/)) {
      return toast.error("Password must contain at least one number.");
    }
    if (!newPassword.match(/[!@#$%^&*]/)) {
      return toast.error(
        "Password must contain at least one special character."
      );
    }

    const userData = {
      oldPassword,
      newPassword,
    };

    const emailData = {
      subject: "Password Changed - SyntaxSeeker",
      send_to: user.email,
      reply_to: "noreply@syntaxseeker.com",
      template: "changePassword",
      url: "/forgot",
    };

    try {
      await dispatch(changePassword(userData));

      if (error) {
        throw new Error(error);
      }

      await dispatch(sendAutomatedEmail(emailData));
      await dispatch(logout());
      await dispatch(RESET(userData));
      navigate("/auth");
    } catch {
      toast.error(error || "An error occurred.");
    }
  };

  return (
    <div className="change-pass-container margin-top">
      <div className="centered-row">
        <div className="full-width">
          <div className="custom-card">
            <PageMenu />
            <div className="custom-card-header centered-text">
              <h2>Change Password</h2>
            </div>
            <div className="custom-card-body">
              <form onSubmit={updatePassword}>
                <>
                  <PasswordInput
                    className="form-style margin-bottom"
                    id="oldPassword"
                    autoComplete="off"
                    placeholder="Old Password"
                    name="oldPassword"
                    required
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </>
                <>
                  <PasswordInput
                    className="form-style margin-bottom"
                    id="newPassword"
                    autoComplete="off"
                    placeholder="New Password"
                    name="newPassword"
                    required
                    value={newPassword}
                    onChange={handleInputChange}
                  />
                </>
                <>
                  <PasswordInput
                    className="form-style"
                    id="confirmPassword"
                    autoComplete="off"
                    placeholder="Repeat Password"
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                </>
                <div className="centered-text">
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
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="centered-text margin-top-2">
                    <Button type="submit">Change Password</Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
