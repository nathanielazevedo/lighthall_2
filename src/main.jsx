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
    path: "/",
    element: <App />,
    ErrorBoundary: () => <div>Something went wrong</div>,
  },
  {
    path: "login",
    element: <Auth />,
    ErrorBoundary: () => <div>Something went wrong</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
