import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/Actions/authActions";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const dispatch = useDispatch();
  let timer;

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      systemLogout();
    }, 3600000); // 10000ms = 10secs. You can change the time.
  };

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const systemLogout = () => {
    localStorage.clear();
    dispatch(logoutAction());
  };

  return children;
};

export default AppLogout;
