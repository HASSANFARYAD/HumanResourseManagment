import React, { Fragment, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import Drawers from "../custom/drawers";
import EventForm from "./CalenderEvent/EventForm";
import { formatDateTime } from "../../utils/_helpers";
import "./style.css";

const MyCalendar = ({
  events,
  permissions = {
    canViewDetails: true,
    canEditEvents: false,
    canNavigate: true,
    canChangeView: true,
  },
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startDatetime, setStartDatetime] = useState();
  const [formattedEvents, setFormattedEvents] = useState([]);

  const isWeekend = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDay() === 0 || date.getDay() === 6; // 0 = Sunday, 6 = Saturday
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    if (startDatetime) {
      setIsDrawerOpen(true);
    }
  }, [startDatetime]);

  useEffect(() => {
    if (events.length > 0) {
      const formatEvents = events
        .map((event) => {
          const { eventDate, startTime, endTime, title, description } = event;

          const datePart = eventDate.split("T")[0]; // Get "2024-11-29" from "2024-11-29T00:00:00Z"

          const startDateTime = `${datePart}T${startTime}`;
          const endDateTime = `${datePart}T${endTime}`;

          const start = new Date(startDateTime);
          const end = new Date(endDateTime);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.error("Invalid start or end date:", {
              startDateTime,
              endDateTime,
            });
            return null; // Skip this event
          }

          return {
            title: title || "Untitled Event", // Provide a default title if missing
            start,
            end,
            description,
            extendedProps: { description },
          };
        })
        .filter((event) => event !== null); // Filter out invalid events

      setFormattedEvents(formatEvents);
    }
  }, [events]);

  return (
    <div>
      {formattedEvents.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable
          droppable
          headerToolbar={
            permissions.canChangeView
              ? {
                  left: permissions.canNavigate ? "prev,next today" : "",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }
              : { center: "title" }
          }
          events={formattedEvents}
          navLinks={permissions.canNavigate}
          selectable={permissions.canEditEvents}
          dateClick={(info) => {
            if (isWeekend(info.dateStr)) {
              toast.error("Saturdays and Sundays are disabled.");
            } else {
              if (permissions.canNavigate) {
                info.view.calendar.gotoDate(info.date);
                console.log("Clicked date start:", info.dateStr);
                setStartDatetime(info.dateStr);
              }
            }
          }}
          eventMouseEnter={(info) => {
            if (permissions.canViewDetails) {
              let currentToastId = null;
              const el = info.el;
              const event = info.event;

              if (currentToastId !== null) {
                toast.dismiss(currentToastId);
              }

              currentToastId = toast.success(
                <>
                  <div>
                    <strong>{event.title}</strong>
                    <br />
                    Start: {event.start.toLocaleString()}
                    <br />
                    End: {event.end ? event.end.toLocaleString() : "N/A"}
                    <br />
                    Status: {event.extendedProps.description}
                  </div>
                </>
              );
              el.onmouseleave = () => {
                toast.dismiss(currentToastId);
                currentToastId = null;
              };
            }
          }}
          eventClick={(info) => {
            if (permissions.canViewDetails && info.event.url) {
              console.log("Event URL:", info.event.url);
            }
          }}
          eventDrop={(info) => {
            console.log("Event dropped:", {
              id: info.event.id,
              title: info.event.title,
              start: info.event.start.toISOString(),
              end: info.event.end ? info.event.end.toISOString() : null,
            });
          }}
          dayCellClassNames={(arg) => {
            if (isWeekend(arg.dateStr)) {
              return "disabled-date"; // Add a CSS class for weekends
            }
            return "";
          }}
        />
      )}
      <Fragment>
        {startDatetime && (
          <Drawers
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            contentTitle="Create Event"
            content={
              <EventForm
                defaultValues={{ startDate: formatDateTime(startDatetime) }}
              />
            }
          />
        )}
      </Fragment>
    </div>
  );
};

export default MyCalendar;
