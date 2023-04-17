import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Grid = ({ setAnchorEl, tasks }) => {
  const columns = [
    {
      field: "id",
      headerName: "",
      width: 50,
      renderCell: () => (
        <MoreVertIcon
          onClick={(evt) => {
            setAnchorEl(evt.currentTarget);
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
          border: "none",
          "& .MuiDataGrid-cell": {},
          "& .MuiDataGrid-row": {
            marginTop: "0.5rem",
            borderRadius: "0.5rem",
            width: "99%",
          },
          "& .MuiDataGrid-columnsContainer": {
            border: "solid 1px #e0e0e0",
          },
        }}
      />
    </Box>
  );
};

export default Grid;
