import React from "react";
import Button from "./Button.js";

const HomePage = ({ navigatePage, username }) => {
  let paragraph = "";

  const submit = () => {
    fetch("http://localhost:8080/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        texts: [paragraph],
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigatePage("result");
      });
  };

  return (
    <div className="App">
      <div className="flex-container">
        <strong>How are you feeling today?</strong>
        <textarea
          className="paragraph-input"
          onChange={(event) => {
            paragraph = event.target.value;
          }}
        ></textarea>
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
};

export default HomePage;
