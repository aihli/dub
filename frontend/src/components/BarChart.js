import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import LoadingAnimation from "./LoadingAnimation";

const BarChart = ({ username, isLoading, setIsLoading }) => {
  const getWeeklyResults = async () => {
    await fetch(`http://localhost:8080/sentiment?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDays(data.days);
        setSentiments(
          data.sentiments.map((sentiment) => {
            if (!sentiment) {
              return 0;
            } else if (sentiment > 10) {
              return 10;
            } else if (sentiment < -10) {
              return -10;
            } else {
              return sentiment;
            }
          })
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      });
  };

  const [sentiments, setSentiments] = useState([]);
  const [days, setDays] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    getWeeklyResults();
  }, []);

  useEffect(() => {
    if (sentiments.length !== 0 && days.length !== 0)
      setData({
        labels: days,
        datasets: [
          {
            data: sentiments,
            label: "Mood for the last week",
          },
        ],
      });
  }, [sentiments]);

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Day",
          },
          ticks: {
            beginAtZero: true,
            max: 6,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: -10,
            steps: 4,
            stepValue: 5,
            max: 10,
          },
        },
      ],
    },
  };

  if (isLoading) {
    return <LoadingAnimation />;
  } else {
    return (
      <div className="chart-container">
        <Bar
          id="#chart"
          data={data}
          width={200}
          height={200}
          options={options}
        />
      </div>
    );
  }
};

export default BarChart;
