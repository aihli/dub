import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login.js";
import StartPage from "./components/StartPage";
import HomePage from "./components/HomePage";
import ChoicePage from "./components/ChoicePage";
import ResultPage from "./components/ResultPage";

function App() {
  const [currPage, setCurrPage] = useState("start");
  const [username, setUsername] = useState("Alice");

  const navigatePage = (page) => {
    setCurrPage(page);
  };

  if (currPage === "start") {
    return <StartPage navigatePage={navigatePage} />;
  } else if (currPage === "login") {
    return <Login navigatePage={navigatePage} setUsername={setUsername} />;
  } else if (currPage === "home") {
    return <HomePage navigatePage={navigatePage} username={username} />;
  } else if (currPage === "choice") {
    return <ChoicePage navigatePage={navigatePage} username={username} />;
  } else if (currPage === "result") {
    return <ResultPage navigatePage={navigatePage} username={username} />;
  }
}

export default App;
