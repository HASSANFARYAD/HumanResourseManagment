import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyCalendar from "../../components/Calender/calender";

const events = [
  {
    id: "1",
    title: "Order #12345: Product A",
    start: "2024-12-01T10:00:00",
    end: "2024-12-01T12:00:00",
    color: "blue",
    url: "https://example.com/orders/12345",
    extendedProps: {
      description: "Order is being prepared.",
    },
  },
  {
    id: "2",
    title: "Order #12346: Product B",
    start: "2024-12-02T13:00:00",
    end: "2024-12-02T15:30:00",
    color: "green",
    url: "https://example.com/orders/12346",
    extendedProps: {
      description: "Order is ready for shipment.",
    },
  },
  {
    id: "3",
    title: "Order #12347: Product C",
    start: "2024-12-03T09:00:00",
    end: null,
    color: "red",
    url: "https://example.com/orders/12347",
    extendedProps: {
      description: "Order has been delayed.",
    },
  },
  {
    id: "4",
    title: "Order #12348: Product D",
    start: "2024-12-04T14:00:00",
    end: "2024-12-04T16:00:00",
    color: "yellow",
    url: "https://example.com/orders/12348",
    extendedProps: {
      description: "Order is in transit.",
    },
  },
  {
    id: "5",
    title: "Order #12349: Product E",
    start: "2024-12-05T08:00:00",
    end: null,
    color: "orange",
    url: "https://example.com/orders/12349",
    extendedProps: {
      description: "Order is being processed.",
    },
  },
  {
    id: "6",
    title: "Order #12350: Product F",
    start: "2024-12-06T11:00:00",
    end: "2024-12-06T13:00:00",
    color: "purple",
    url: "https://example.com/orders/12350",
    extendedProps: {
      description: "Order is awaiting confirmation.",
    },
  },
  {
    id: "7",
    title: "Order #12351: Product G",
    start: "2024-12-07T10:30:00",
    end: "2024-12-07T12:00:00",
    color: "pink",
    url: "https://example.com/orders/12351",
    extendedProps: {
      description: "Order is scheduled for delivery.",
    },
  },
  {
    id: "8",
    title: "Order #12352: Product H",
    start: "2024-12-08T15:00:00",
    end: "2024-12-08T17:00:00",
    color: "cyan",
    url: "https://example.com/orders/12352",
    extendedProps: {
      description: "Order is out for delivery.",
    },
  },
  {
    id: "9",
    title: "Order #12353: Product I",
    start: "2024-12-09T14:00:00",
    end: null,
    color: "gray",
    url: "https://example.com/orders/12353",
    extendedProps: {
      description: "Order has been cancelled.",
    },
  },
  {
    id: "10",
    title: "Order #12354: Product J",
    start: "2024-12-10T09:00:00",
    end: "2024-12-10T11:00:00",
    color: "lime",
    url: "https://example.com/orders/12354",
    extendedProps: {
      description: "Order is completed.",
    },
  },
];

const UserDashboard = () => {
  const { userAuth } = useSelector((state) => state?.authentication);
  if (userAuth.role === "0") {
    return <Navigate to="/admin" />;
  }
  return (
    <div>
      User Dashboard
      <MyCalendar
        events={events}
        permissions={{
          canViewDetails: true,
          canEditEvents: true,
          canNavigate: true,
          canChangeView: true,
        }}
      />
    </div>
  );
};

export default UserDashboard;
