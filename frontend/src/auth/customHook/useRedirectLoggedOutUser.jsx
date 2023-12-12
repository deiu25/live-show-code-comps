import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authService";

export const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

    useEffect(() => {
        let isLoggedIn;
        const redirectLoggedOutUser = async () => {
            try {
                isLoggedIn = await authService.getLoginStatus();
            } catch (error) {
                toast.error(error.message);
            }
            if (!isLoggedIn) {
                toast.info("Session expired, please login to continue", { toastId: "sessionExpired" });
                navigate(path);
                return;
            }
        };
        redirectLoggedOutUser();
    }, [path, navigate]);
};
