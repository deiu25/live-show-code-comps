import "./Profile.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { PageMenu } from "../../components/pageMenu/PageMenu";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { Notification } from "../../components/notification/Notification";
import Button from "../../components/button/Button";

export const shortenText = (text, maxLength) => {
  if (typeof text !== "string" || text.length <= maxLength) {
    return text;
  }

  const shortened = text.substr(0, maxLength) + "...";
  return shortened;
};

export const Profile = () => {
  useRedirectLoggedOutUser("/auth");

  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isisVerified: user?.isVerified || "",
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      // Create form data
      const formData = new FormData();
      formData.append("firstname", profile.firstname);
      formData.append("lastname", profile.lastname);
      formData.append("phone", profile.phone);
      formData.append("bio", profile.bio);
      if (profileImage !== null) {
        formData.append("photo", profileImage);
      }

      // Send form data to server
      dispatch(updateUser(formData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role,
        isVerified: user.isVerified,
      }));
    }
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {!profile.isVerified && <Notification />}
      <div className="profile-container">
        <div className="centered-row">
          <div className="full-width">
            <div className="custom-card">
              <PageMenu />
              <div className="custom-card-header centered-text">
                <h2 className="textColor">Profile</h2>
              </div>
              <div className="custom-card-body">
                <div className="centered-text">
                  <input
                    type="file"
                    accept="image/*"
                    id="hiddenFileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <img
                    src={imagePreview === null ? user?.photo : imagePreview}
                    alt="profileImg"
                    className="circle margin-bottom hover-effect"
                    onClick={() =>
                      document.getElementById("hiddenFileInput").click()
                    }
                  />
                  <h3 className="textColor">Role: {profile.role}</h3>
                </div>
                <form onSubmit={saveProfile}>
                  <label>Change Photo</label>
                  <div className="custom-form-group">
                    <input
                      type="file"
                      accept="photo/*"
                      name="photo"
                      className="form-control-file"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="form-group form-group-flex">
                    <label htmlFor="firstname">First Name</label>
                    <span className="input-icon-custom">
                      <i className="uil uil-user"></i>
                    </span>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form-control form-style"
                      value={profile?.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group form-group-flex">
                    <label htmlFor="lastname">Last Name</label>
                    <span className="input-icon-custom">
                      <i className="uil uil-user"></i>
                    </span>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form-control form-style"
                      value={profile?.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    className="email-input form-group form-group-flex"
                    style={{ position: "relative" }}
                  >
                    <label htmlFor="email">
                      Email{" "}
                      <span className="hover-message">
                        You cannot change your email address.
                      </span>
                    </label>
                    <span className="input-icon-custom">
                      <i className="uil uil-at"></i>
                    </span>
                    <input
                      type="email"
                      disabled
                      id="email"
                      name="email"
                      className="form-style"
                      value={profile?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group form-group-flex">
                    <label htmlFor="phone">Phone</label>
                    <span className="input-icon-custom">
                      <i className="uil uil-phone"></i>
                    </span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control form-style"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group form-group-flex">
                    <label htmlFor="bio">Bio</label>
                    <span className="input-icon-custom">
                      <i className="uil uil-comment"></i>
                    </span>
                    <textarea
                      id="bio"
                      name="bio"
                      className="textarea"
                      value={profile?.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="centered-text margin-top">
                    <Button>Update Profile</Button>
                  </div>
                </form>
              </div>
              <div className="custom-card-footer">
                <h4>User</h4>
                <p>
                  {profile.firstname} {profile.lastname}
                </p>
                <p>{profile.email}</p>
                <p>{profile.phone}</p>
                <p>
                  Status: {profile.isVerified ? "Verified" : "Not Verified"}
                </p>
                <p>Role: {profile.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);
  const firstName = user?.firstname || "...";
  const shortenedLastName = shortenText(firstName, 9);
  return <span>{shortenedLastName}</span>;
};
