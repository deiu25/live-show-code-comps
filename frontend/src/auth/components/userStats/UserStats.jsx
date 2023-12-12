import React, { useEffect } from "react";
import "./UserStats.css";
import { InfoBox } from "../infoBox/InfoBox";
import { FaUsers } from "react-icons/fa";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from "../../redux/features/auth/authSlice";

const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

export const UserStats = () => {
  const dispatch = useDispatch();
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const univerifiedUsers = users.length - verifiedUsers;

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  return (
    <div className="user-summary">
      <h3>User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={"Total Users"}
          count={users.length}
          bgColor="card1"
        />
        <InfoBox
          icon={icon2}
          title={"Active Users"}
          count={verifiedUsers}
          bgColor="card2"
        />
        <InfoBox
          icon={icon3}
          title={"Unverified Users"}
          count={univerifiedUsers}
          bgColor="card3"
        />
        <InfoBox
          icon={icon4}
          title={"Suspended Users"}
          count={suspendedUsers}
          bgColor="card4"
        />
      </div>
    </div>
  );
};
