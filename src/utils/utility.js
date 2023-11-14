import { logoutAction } from "../redux/authSlice";
import { toast } from "react-toastify";

export const handleApiError = (error, dispatch, data) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const statusCode = error.response.status;
    const errorMessage =
      error.response.data.title || "An error occurred on the server";

    switch (statusCode) {
      case 401:
        UnauthorizedErrorHandler(error, dispatch, data);
        break;
      default:
        console.error(
          `Server returned error with status ${statusCode}: ${errorMessage}`
        );
        toast.error(errorMessage);
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received from the server");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error setting up the request:", error.message);
  }
};

const UnauthorizedErrorHandler = (error, dispatch, data) => {
  if (error.response && error.response.status === 401) {
    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    const tokenExpiryTime = data?.tokenExpiry; // Replace with your actual token expiration from the Redux state

    if (tokenExpiryTime && tokenExpiryTime < currentTime) {
      // Token has expired, log the user out
      dispatch(logoutAction());
    } else {
      // Token is still valid, handle other 401 error scenarios if needed
      toast.error("Unauthorized error, you dont have access");
    }
  } else {
    // Handle other non-401 errors if needed
    console.error("Non-401 error occurred:", error);
  }
};

export const getResponse = (response, dispatch, user) => {
  if (!response?.data?.status) {
    handleApiError(response?.data?.message, dispatch, user);
  } else {
    return response?.data?.data;
  }
};
