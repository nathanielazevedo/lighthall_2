import React from "react";
import { Dialog, DialogTitle, FormControl, Input } from "@mui/material";

const EditDialog = () => {
  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Task</DialogTitle>
      <FormControl>
        <Input variant="contained"></Input>
      </FormControl>
    </Dialog>
  );
};

export default EditDialog;
