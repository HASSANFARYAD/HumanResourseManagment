import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { truncateText, formatDateTime } from "../../utils/_helpers";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { deleteRecord } from "../../redux/Actions/apiActions";
import { markReadNotification } from "../../redux/Actions/notificationActions";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import { useThemeContext } from "../../theme-styles/themeContext";

const NotificaltionPanel = ({
  notifications,
  handleNotificationPanel,
  setUnReadCount,
}) => {
  const { darkMode } = useThemeContext();
  const [messages, setMessages] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("before setting", notifications);
    setMessages(notifications);
  }, [notifications]);

  const handleReadNotifications = async (values, type) => {
    setDisabled(true);
    try {
      const payload = {
        type,
        id: values,
        userId: "",
      };
      if (type === "user") {
      } else {
      }
      await dispatch(markReadNotification(payload));
      setUnReadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setDisabled(false);
      handleNotificationPanel();
    }
  };

  const handleDelete = async (id) => {
    setDisabled(true);
    try {
      console.log(id);
      const endPoint = `Notification/Delete?id=${id}`;
      await dispatch(deleteRecord(endPoint));
      setUnReadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setDisabled(false);
      handleNotificationPanel();
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            borderBottom: "1px solid #f9f9f9",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            backgroundColor:
              message.isRead === 1 ? "rgb(54 119 209 / 60%)" : "",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Avatar sx={{ width: 56, height: 56 }}>
                {message.title.charAt(0)}
              </Avatar>
            </Grid>

            <Grid item xs={8}>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: darkMode ? "#29b6f6" : "textSecondary",
                }}
              >
                {message.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  color: darkMode ? "#E1D7C6" : "#333",
                }}
              >
                {truncateText(message.description, 10)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: darkMode ? "#E1D7C6" : "#333" }}
              >
                {formatDateTime(message.createdAt)}
              </Typography>
            </Grid>

            <Grid item xs={2} container justifyContent="flex-end">
              {message.isRead === 1 && (
                <Tooltip title="Mark as Read">
                  <IconButton
                    color="info"
                    size="small"
                    onClick={() => handleReadNotifications(message.id, "Noti")}
                    disabled={isDisabled}
                  >
                    <CheckCircleOutline />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(message.id)}
                  disabled={isDisabled}
                >
                  <CancelOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default NotificaltionPanel;
