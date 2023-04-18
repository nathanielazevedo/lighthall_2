import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const Navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const response = await res.json();
          console.log(response);
          localStorage.setItem("isAuthenticated", JSON.stringify(response));
          Navigate("/");
        } else {
          toast("Invalid username or password", { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Invalid username or password", { type: "error" });
      });
  };

  const handleSignup = () => {
    fetch("http://localhost:3000/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const response = await res.json();
          localStorage.setItem("isAuthenticated", JSON.stringify(response));
          Navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Username already exists", { type: "error" });
      });
  };

  const handleSubmit = () => {
    if (formData.username === "" && formData.password === "") {
      setErrors({
        ...errors,
        username: "*Username is required",
        password: "*Password is required",
      });
      return;
    }
    if (formData.username === "") {
      setErrors({ ...errors, username: "*Username is required" });
      return;
    }
    if (formData.password === "") {
      setErrors({ ...errors, password: "*Password is required" });
      return;
    }
    if (formType === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-container">
        <div className="login-info">
          <h1
            style={{
              fontSize: "75px",
            }}
          >
            Task Tracker
          </h1>
          <p>
            With an intuitive user interface and powerful features, Task Tracker
            is designed to help you stay organized and focused. You can easily
            create and manage tasks, set due dates, and even assign priority
            levels to ensure you're tackling the most important tasks first.
          </p>
          <TaskAltIcon
            color="success"
            sx={{
              fontSize: "150px",
              alignSelf: "center",
              marginTop: "20px",
            }}
          />
        </div>
        <div className="login-form-container">
          <hr
            style={{
              width: "40%",
              height: "2px",
              borderRadius: "10px",
              position: "absolute",
              top: "20px",
              backgroundColor: "#0b1929",
            }}
          ></hr>
          <div className="login-form">
            <h1
              style={{
                color: "#0b1929",
                fontSize: "50px",
              }}
            >
              {formType === "login" ? "Login" : "Sign Up"}
            </h1>
            {formType === "login" ? (
              <FormControl fullWidth>
                <TextField
                  label="Username"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.username}
                  error={errors.username !== ""}
                  helperText={errors.username}
                  onChange={(e) => {
                    setErrors({ ...errors, username: "" });
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
                <TextField
                  label="Password"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.password}
                  error={errors.password !== ""}
                  helperText={errors.password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: "" });
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  type="password"
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    marginTop: "20px",
                    height: "50px",
                    // backgroundColor: "#0b1929",
                  }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <TextField
                  label="Username"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.username}
                  error={errors.username !== ""}
                  helperText={errors.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    setErrors({ ...errors, username: "" });
                  }}
                />
                <TextField
                  label="Password"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.password}
                  error={errors.password !== ""}
                  helperText={errors.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  type="password"
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    marginTop: "20px",
                    height: "50px",
                    // backgroundColor: "#0b1929",
                  }}
                  onClick={handleSubmit}
                >
                  SignUp
                </Button>
              </FormControl>
            )}
            <h5
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={() => {
                setFormData({ username: "", password: "" });
                setFormType(formType === "login" ? "signup" : "login");
                setErrors({ username: "", password: "" });
              }}
            >
              {formType === "login" ? "New here? Sign Up" : "Go to Login"}
            </h5>
          </div>
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </ThemeProvider>
  );
};

export default Login;
