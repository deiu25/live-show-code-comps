import React from "react";
import { useDispatch } from "react-redux";
import { RESET, verifyUser } from "../../../redux/features/auth/authSlice";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";

export const Verify = () => {

  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section>
      <div className="hero-text">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <Button onClick={verifyAccount}>Verify Account</Button>
      </div>
    </section>
  );
};
