import React from "react";
import { Menu, MenuItem } from "@mui/material";

const DropDown = ({ anchorEl, handleClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>Edit</MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </Menu>
  );
};

export default DropDown;
