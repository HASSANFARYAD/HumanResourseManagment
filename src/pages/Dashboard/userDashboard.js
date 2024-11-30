import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyCalendar from "../../components/Calender/calender";
import { getEvents } from "../../redux/Actions/eventActions";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchvents();
  }, [userAuth?.id]);

  if (userAuth.role === "0") {
    return <Navigate to="/admin" />;
  }

  const fetchvents = () => {
    dispatch(getEvents("")).then((response) => {
      setEvents(response?.payload);
    });
  };
  return (
    <div>
      User Dashboard
      {events.length > 0 && (
        <MyCalendar
          events={events}
          permissions={{
            canViewDetails: true,
            canEditEvents: true,
            canNavigate: true,
            canChangeView: true,
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
