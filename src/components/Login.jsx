import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("isAuthenticated", "true");
          Navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignup = () => {
    fetch("http://localhost:3000/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        Navigate("/");
      }
    });
  };

  const handleSubmit = () => {
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
        </div>
        <div className="login-form-container">
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
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
                <TextField
                  label="Password"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                />
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    height: "50px",
                    backgroundColor: "#0b1929",
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
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
                <TextField
                  label="Password"
                  sx={{ color: "black", marginTop: "20px" }}
                  fullWidth
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                />
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    height: "50px",
                    backgroundColor: "#0b1929",
                  }}
                  onClick={handleSubmit}
                >
                  SignUP
                </Button>
              </FormControl>
            )}
            <h5
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={() => {
                setFormData({ username: "", password: "" });
                setFormType(formType === "login" ? "signup" : "login");
              }}
            >
              {formType === "login" ? "New here? Sign Up" : "Go to Login"}
            </h5>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
