import React, { useState } from "react";
import BarChart from "./BarChart";

const ChoicePage = ({ navigatePage, username }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <BarChart
        username={username}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default ChoicePage;
