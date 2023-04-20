import "./App.css";
import MainPage from "./MainPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const setAuth = useState(false)[1];
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <MainPage setAuth={setAuth} auth={auth} />
    </>
  );
};

export default App;
