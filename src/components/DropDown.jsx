import React from "react";
import { Menu, MenuItem } from "@mui/material";

const DropDown = ({ anchorEl, handleClose, handleDelete }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>Edit</MenuItem>
      <MenuItem
        onClick={() => {
          handleDelete();
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default DropDown;
