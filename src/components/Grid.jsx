import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Grid = ({ setAnchorEl, tasks, setSelectedRow }) => {
  const columns = [
    {
      field: "id",
      headerName: "",
      width: 50,
      renderCell: (row) => (
        <MoreVertIcon
          onClick={(evt) => {
            setAnchorEl(evt.currentTarget);
            setSelectedRow(row.row);
          }}
          sx={{
            cursor: "pointer",
          }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  return (
    <Box
      sx={{
        height: "70vh",
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {},
          "& .MuiDataGrid-row": {},
          "& .MuiDataGrid-columnsContainer": {},
        }}
      />
    </Box>
  );
};

export default Grid;
