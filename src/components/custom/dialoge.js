import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeContext } from "../../theme-styles/themeContext"; // Import the theme context

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({
  open,
  title,
  content,
  actions,
  onClose,
  onOpen,
  PaperComponentOverride,
  loader,
}) => {
  const { darkMode } = useThemeContext(); // Access the dark mode from theme context

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperComponent={PaperComponentOverride || PaperComponent}
        aria-labelledby="draggable-dialog-title"
        disableEscapeKeyDown
        fullWidth
      >
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: darkMode ? "#1F1F1F" : "#fff", // Dynamic background color based on dark mode
            color: darkMode ? "#ffffff" : "#1A237E", // Dynamic text color
          }}
          id="draggable-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: darkMode ? "#1F1F1F" : "#E8EAF6", // Dynamic content background
            color: darkMode ? "#CFCFCF" : "#1A237E", // Dynamic content text color
          }}
        >
          {content.map((item, index) => (
            <DialogContentText
              key={index}
              sx={{
                color: item.color, // Use provided color or fallback
              }}
              py={1}
            >
              {item.text}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: darkMode ? "#1F1F1F" : "#fff", // Dynamic actions background color
            borderTop: darkMode ? "1px solid #444" : "1px solid #ddd", // Border for separation
          }}
        >
          {actions.map((action, index) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              color={action.color || "primary"}
              variant={action.variant}
              sx={{
                backgroundColor:
                  action.color === "secondary"
                    ? darkMode
                      ? "#D48800"
                      : "danger"
                    : null, // Dynamic button background for secondary action
              }}
              disabled={loader}
              endIcon={
                loader &&
                action.label === "Delete" && <CircularProgress size={23} />
              }
              size="small"
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DraggableDialog;
