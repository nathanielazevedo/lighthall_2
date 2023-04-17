import {
  Button,
  FormControl,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    const response = fetch("http://localhost:3000/login", {
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
    console.log(response);
  };

  const handleSignup = () => {
    const response = fetch("http://localhost:3000/signUp", {
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
    console.log(response);
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
          <h1>Task Tracker</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam
            necessitatibus quas voluptatum quidem nesciunt. Quisquam, quae
          </p>
        </div>
        <div className="login-form-container">
          <div className="login-form">
            <h1
              style={{
                color: "#0b1929",
              }}
            >
              {formType === "login" ? "Login" : "Sign Up"}
            </h1>
            {formType === "login" ? (
              <FormControl>
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
                  sx={{ marginTop: "20px" }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </FormControl>
            ) : (
              <FormControl>
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
                  sx={{ marginTop: "20px" }}
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
