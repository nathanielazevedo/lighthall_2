import "./App.css";
import MainPage from "./MainPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const setAuth = useState(false)[1];
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <MainPage setAuth={setAuth} />
    </>
  );
};

export default App;
