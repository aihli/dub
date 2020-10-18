import React, { useState, useEffect } from "react";
import Button from "./Button";
import LoadingAnimation from "./LoadingAnimation";
import happy from "../images/happy.png";
import mildHappy from "../images/mild-happy.png";
import mildSad from "../images/mild-sad.png";
import neutral from "../images/neutral.png";
import sad from "../images/sad.png";

const ResultPage = ({ navigatePage, username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sentiment, setSentiment] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/sentiment?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let todaySentiment = data.sentiments[6];
        if (todaySentiment < -4) {
          setSentiment(
            <>
              <img src={sad} width={200} height={200} />
              <div>Remember: you can always depend on your friends.</div>
            </>
          );
        } else if (todaySentiment > 4) {
          setSentiment(
            <>
              <img src={happy} width={200} height={200} />
              <div>You are extremely happy today! Keep it up.</div>
            </>
          );
        } else if (todaySentiment < -1.5) {
          setSentiment(
            <>
              <img src={mildSad} width={200} height={200} />
              <div>Cheer up! Take some time off for yourself.</div>
            </>
          );
        } else if (todaySentiment > 1.5) {
          setSentiment(
            <>
              <img src={mildHappy} width={200} height={200} />
              <div>Keep the positive energy flowing!</div>
            </>
          );
        } else {
          setSentiment(
            <>
              <img src={neutral} width={200} height={200} />
              <div>You are feeling neutral today.</div>
            </>
          );
        }
      });
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 6000);

  if (isLoading) {
    return (
      <div className="App">
        <LoadingAnimation />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="flex-container">
          {sentiment}
          <div className="button-container">
            <Button>Add a friend</Button>
            <Button>Check up on your friends</Button>
            <Button onClick={() => navigatePage("choice")}>
              Check your recent results
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ResultPage;
