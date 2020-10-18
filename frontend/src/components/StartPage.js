import React from "react";
import Button from "./Button";
import logo from "../images/logo.svg";

const StartPage = ({ navigatePage }) => {
  return (
    <div className="App">
      <div className="flex-container">
        <strong className="welcome-text">
          Welcome to <img src={logo} />
        </strong>
        <Button onClick={() => navigatePage("login")} type="button">
          Let's Get Started
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
