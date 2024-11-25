import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../../theme-styles/themeContext";
import CloseIcon from "@mui/icons-material/Close";

const Drawers = ({
  isDrawerOpen,
  toggleDrawer,
  contentTitle,
  content,
  actions,
  loader,
  fullWidth,
}) => {
  const { darkMode } = useThemeContext();
  return (
    <>
      <Drawer anchor="right" open={isDrawerOpen} variant="persistent">
        <Box
          sx={{
            width: 400,
            padding: 2,
          }}
          role="presentation"
        >
          <Typography variant="h6" gutterBottom>
            {contentTitle}
            <IconButton
              aria-label="close"
              onClick={toggleDrawer(false)}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          {content}
          {actions &&
            actions.map((action, index) => (
              <Button
                key={action.id}
                onClick={action.onClick}
                color={action.color || "primary"}
                variant={action.variant}
                fullWidth={fullWidth}
                sx={{
                  backgroundColor:
                    action.color === "secondary"
                      ? darkMode
                        ? "#D48800"
                        : "danger"
                      : null,
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
        </Box>
      </Drawer>
    </>
  );
};

export default Drawers;
