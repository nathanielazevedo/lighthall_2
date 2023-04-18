import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

const Logout = ({ setAuth }) => {
  return (
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
  );
};

export default Logout;
