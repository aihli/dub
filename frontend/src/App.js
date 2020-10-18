import React, { useState } from "react";
import logo from "./logo.svg";
import background from "./images/background.svg";
import "./App.css";
import Login from "./components/Login.js";

function App() {

  const [currPage, setCurrPage] = useState("start");
  const [username, setUsername] = useState(null);

  const goToLogin = function() {
    setCurrPage("login");
  }

  if (currPage === "start") {
    return (
      <div className="App">
        <img idName="background" src={background}></img>
  
        <div className="flex-container">
          <strong>
            Welcome to [logo]
          </strong>
          <button onClick={goToLogin} type="button">Let's Get Started</button>
        </div>
        
        
      </div>
    );
  } else if (currPage === "login") {
    return <Login setUsername={setUsername}></Login>;
  }

  
}

export default App;
