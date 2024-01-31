import { useSelector } from 'react-redux';

export const useAuthAdminStatus = (postUser) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const isUserLoggedIn = user !== null;
  const isUserCreator = user?._id === postUser?._id;

  return { isAdmin, isUserLoggedIn, isUserCreator };
};
