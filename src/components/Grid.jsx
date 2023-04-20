import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Grid = ({ setAnchorEl, tasks, setSelectedRow }) => {
  const getStatus = (status) => {
    console.log(status);
    switch (status) {
      case "todo":
        return <Box sx={{ color: "red" }}>To Do</Box>;
      case "in_progress":
        return <Box sx={{ color: "orange" }}>In Progress</Box>;
      case "completed":
        return <Box sx={{ color: "#66bb6a" }}>Completed</Box>;
      default:
        return <Box sx={{ color: "red" }}>To Do</Box>;
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "",
      width: 50,
      renderCell: (row) => (
        <MoreVertIcon
          onClick={(evt) => {
            setAnchorEl(evt.currentTarget);
            setSelectedRow();
          }}
          sx={{
            cursor: "pointer",
          }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "due_date", headerName: "Due Date", width: 400 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (row) => getStatus(row.row.status),
    },
  ];

  return (
    <DataGrid
      rows={tasks}
      columns={columns}
      pageSizeOptions={[10]}
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-cell:focus": {
          outline: " none",
        },
        "& .MuiDataGrid-columnHeader:focus": {
          outline: " none",
        },
      }}
    />
  );
};

export default Grid;
