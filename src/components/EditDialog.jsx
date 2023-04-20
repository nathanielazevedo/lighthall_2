import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditDialog = ({ selectedRow, setShowEdit, setTasks }) => {
  const [formData, setFormData] = useState(selectedRow);

  // Handles closing the dialog
  const handleClose = () => {
    setShowEdit(false);
  };

  // Handles input changes
  const handleChange = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  // Handles submitting the form
  const handleSubmit = () => {
    fetch(`http://localhost:3000/tasks/${selectedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
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
        toast.success("Task updated successfully");
        setShowEdit(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Task
        <div onClick={handleClose} style={{ cursor: "pointer" }}>
          <CloseIcon />
        </div>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          />
          <TextField
            value={formData.description}
            fullWidth
            label="Description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
            <DatePicker
              fullWidth
              sx={{ width: "100%" }}
              label="Due Date"
              defaultValue={dayjs(formData.due_date)}
              onChange={(newValue) =>
                handleChange({
                  target: { name: "due_date", value: dayjs(newValue) },
                })
              }
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.status}
              defaultValue={formData.status}
              fullWidth
              label="Status"
              name="status"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="todo">Todo</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            color="success"
            sx={{
              height: "50px",
            }}
          >
            Submit
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
