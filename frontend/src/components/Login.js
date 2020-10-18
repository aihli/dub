import React from "react";
import Button from "./Button";

function Login({ navigatePage, setUsername }) {
  let username = "";
  let password = "";

  function createAccount() {
    fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigatePage("home");
        setUsername(username);
      });
  }

  return (
    <div className="App">
      <div className="flex-container">
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            username = event.target.value;
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            password = event.target.value;
          }}
        ></input>
        <Button onClick={createAccount} type="button">
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
