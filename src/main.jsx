import React from "react";
import App from "./App";
import Auth from "./components/Auth";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/homes",
    element: <App />,
  },
  {
    path: "login",
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themes}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
