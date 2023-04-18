import React from "react";
import { useState, useEffect } from "react";
import { fetchTasks } from "./api";
import Button from "@mui/material/Button";
import Grid from "./components/Grid";
import DropDown from "./components/DropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
import EditDialog from "./components/EditDialog";

const MainPage = ({ setAuth }) => {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  console.log(selectedRow);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const response = fetch(`http://localhost:3000/tasks/${selectedRow.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setTasks((prev) => prev.filter((task) => task.id !== selectedRow.id));
      }
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
            <h1>Your Tasks</h1>
            <Button variant="contained" sx={{ alignSelf: "flex-end" }}>
              Add Task
            </Button>
          </div>
          <Grid
            tasks={tasks}
            setAnchorEl={setAnchorEl}
            setSelectedRow={setSelectedRow}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
