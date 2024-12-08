import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyCalendar from "../../components/Calender/calender";
import { getEvents } from "../../redux/Actions/eventActions";
import { CardContent, Container } from "@mui/material";
import CustomCard from "../../theme-styles/customCard";

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
    <Container>
      <CustomCard>
        User Dashboard
        <CardContent>
          {events.length > 0 && (
            <MyCalendar
              events={events}
              dateRange={{
                start: new Date(),
                end: "",
              }}
              permissions={{
                canViewDetails: true,
                canEditEvents: true,
                canNavigate: true,
                canChangeView: true,
                canDateRange: false,
              }}
            />
          )}
        </CardContent>
      </CustomCard>
    </Container>
  );
};

export default UserDashboard;
