import React from "react";
import { useState, useEffect } from "react";
import { fetchTasks } from "./api";
import Button from "@mui/material/Button";
import Grid from "./components/Grid";
import DropDown from "./components/DropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

const MainPage = ({ setAuth }) => {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
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
      <DropDown anchorEl={anchorEl} handleClose={handleClose} />
      <div className="container">
        <Tooltip title="Logout" placement="right">
          <LogoutIcon
            sx={{
              cursor: "pointer",
              color: "white",
              fontSize: "30px",
              alignSelf: "flex-end",
              marginRight: "30px",
              padding: "10px",
            }}
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              setAuth((prev) => !prev);
            }}
          />
        </Tooltip>

        <div className="tasks-container">
          <div className="tasks-header">
            <h1>Tasks</h1>
            <Button variant="contained" sx={{ alignSelf: "flex-end" }}>
              Add Task
            </Button>
          </div>
          <Grid tasks={tasks} setAnchorEl={setAnchorEl} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
