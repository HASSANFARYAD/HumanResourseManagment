import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import theme from "../../theme-styles/theme";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "@mui/material";

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
        loader={loader}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {content.map((item, index) => (
            <DialogContentText
              key={index}
              sx={{
                color: theme.palette[item.color]?.main || "inherit", // Dynamically apply color from theme
              }}
            >
              {item.text}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          {actions.map((action, index) => (
            <>
              <Button
                key={action.id}
                onClick={action.onClick}
                color={action.color || "primary"}
                variant={action.variant}
                sx={{
                  backgroundColor:
                    action.color === "secondary"
                      ? theme.palette.secondary.dark
                      : null,
                }}
                disabled={loader}
                endIcon={
                  loader &&
                  action.label == "Delete" && <CircularProgress size={23} />
                }
                size="small"
              >
                {action.label}
              </Button>
            </>
          ))}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DraggableDialog;
