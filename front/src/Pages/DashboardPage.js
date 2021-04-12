import React, { useState, useEffect, useRef } from "react";
import "../styles/dashboard.css";

import Count from "../Components/Count.js";

const DashboardPage = () => {
  const [postCount, setPostCount] = useState(0);
  const [teamedCount, setTeamedCount] = useState(0);
  const [interestCount, setInterestCount] = useState(0);
  //let [page, setPage] = useState(0);
  //let [reload, setReload] = useState(0);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    console.log("username", username);
    
    const getUser = async () => {
      try {
        const resRaw = await fetch("/getUserByName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        });
        const res = await resRaw.json();
        console.log("res", res);
        setInterestCount(res.intereted.length);
        setPostCount(res.posted.length);
        setTeamedCount(res.teamuped.length);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
    
  }, []);

  return (
    <div className="containter">
      <div className="countsContainer">
        <Count label={"posted events"} count={postCount} />
        <Count label={"intereted events"} count={interestCount} />
        <Count label={"teamed up events"} count={teamedCount} />
      </div>

      <div className="postsContainter"></div>
    </div>
  );
};

export default DashboardPage;
