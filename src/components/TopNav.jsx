import React from "react";
import Logout from "./Logout";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TopNav = ({ setAuth }) => {
  return (
    <div className="top-nav">
      <h1
        style={{
          color: "white",
          marginLeft: "30px",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TaskAltIcon color="success" />
        Task Tracker
      </h1>
      <Logout setAuth={setAuth} />
    </div>
  );
};

export default TopNav;
