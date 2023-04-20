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

const AddTaskDialog = ({ setShowAdd, setTasks }) => {
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  const [formData, setFormData] = useState({
    user_id: user?.id,
    title: "",
    description: "",
    status: "",
    due_date: new Date(),
  });

  // Handles closing the dialog
  const handleClose = () => {
    setShowAdd(false);
  };

  // Handles input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles submitting the form
  const handleSubmit = () => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success("Task added successfully");
          setShowAdd(false);
          const data = await res.json();
          console.log(data);
          setTasks((prev) => {
            return [...prev, data];
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
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
        Add Task
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
            color="success"
            onClick={handleSubmit}
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

export default AddTaskDialog;
