import React, { useState, useEffect } from "react";
import { fetchTasks } from "./api";
import Grid from "./components/Grid";
import Logout from "./components/Logout";
import Button from "@mui/material/Button";
import DropDown from "./components/DropDown";
import EditDialog from "./components/EditDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import { Box } from "@mui/system";

const MainPage = ({ setAuth }) => {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));

  // Close Kebab DropDown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete Task
  const handleDelete = () => {
    fetch(`http://localhost:3000/tasks/${selectedRow.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          setTasks((prev) => prev.filter((task) => task.id !== selectedRow.id));
          toast.success("Task Deleted Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  // Fetch Tasks on page load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  return (
    <>
      {showEdit && (
        <EditDialog
          setShowEdit={setShowEdit}
          selectedRow={selectedRow}
          setTasks={setTasks}
        />
      )}
      <DropDown
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleDelete={handleDelete}
        setShowEdit={setShowEdit}
      />
      <TopNav setAuth={setAuth} />
      <div className="container">
        <div className="tasks-container">
          <Box
            sx={{
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div className="tasks-header">
              <h1>Your Tasks</h1>
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-end" }}
                color="success"
              >
                Add Task
              </Button>
            </div>
            <Grid
              tasks={tasks}
              setAnchorEl={setAnchorEl}
              setSelectedRow={setSelectedRow}
            />
          </Box>
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </>
  );
};

export default MainPage;
