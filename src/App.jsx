import "./App.css";
import MainPage from "./MainPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <MainPage setAuth={setAuth} />
    </>
  );
};

export default App;
