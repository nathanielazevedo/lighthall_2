import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Task = ({ task }) => {
  return (
    <h3 key={task.id} className="task">
      {task.title}
      <div>
        <EditIcon color="primary" />
        <DeleteOutlineIcon color="error" />
      </div>
    </h3>
  );
};

export default Task;
