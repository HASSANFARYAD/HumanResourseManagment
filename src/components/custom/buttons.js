import React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";

const CustomButtons = ({ buttons, row }) => {
  return (
    <div>
      {buttons.map((button) =>
        button.icon ? (
          <IconButton
            key={button.id}
            onClick={button.onClick ? () => button.onClick(row) : undefined}
            className={button.className}
            color={button.color}
            size="small"
            aria-label={button.title}
            fontSize="inherit"
          >
            {button.icon}
          </IconButton>
        ) : (
          <Button
            key={button.id}
            onClick={button.onClick ? () => button.onClick(row) : undefined}
            className={button.className}
            title={button.title || ""}
            variant={button.variant || "contained"}
            color={button.color || "primary"}
            size="small"
            fontSize="inherit"
          >
            {button.label}
          </Button>
        )
      )}
    </div>
  );
};

export default CustomButtons;
