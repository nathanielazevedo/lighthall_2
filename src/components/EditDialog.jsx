import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

const EditDialog = ({ selectedRow, setShowEdit, setTasks }) => {
  const [formData, setFormData] = useState(selectedRow);
  const handleClose = () => {
    setShowEdit(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3000/tasks/${selectedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      if (res.status === 200) {
        setTasks((prev) => {
          const newTasks = prev.map((task) => {
            if (task.id === selectedRow.id) {
              return formData;
            } else {
              return task;
            }
          });
          return newTasks;
        });
      }
      setShowEdit(false);
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth="sm"
      open
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          height: "500px",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Edit Task
        <div onClick={handleClose} style={{ cursor: "pointer" }}>
          X
        </div>
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
          <TextField
            value={formData.title}
            fullWidth
            label="Title"
            name="title"
            onChange={(e) => handleChange(e)}
          ></TextField>
          <TextField
            value={formData.description}
            fullWidth
            label="Description"
            name="description"
            onChange={(e) => handleChange(e)}
          ></TextField>
          <TextField
            value={formData.due_date}
            fullWidth
            label="Due Date"
            name="due_date"
            onChange={(e) => handleChange(e)}
          ></TextField>
          <TextField
            value={formData.status}
            name="status"
            fullWidth
            label="Status"
            onChange={(e) => handleChange(e)}
          ></TextField>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
