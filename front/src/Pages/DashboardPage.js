import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

import Count from "../Components/Count.js";

const DashboardPage = () => {
  const [postCount, setPostCount] = useState(0);
  const [teamedCount, setTeamedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);

  //useEffect(() => {});

  return (
    <div className="containter">
      <div className="countsContainer">
          <Count label={"initiated events"} count={postCount} />
          <Count label={"teamed up events"} count={teamedCount} />
          <Count label={"open events"} count={openCount} />
        
      </div>

      <div className="postsContainter">

      </div>
    </div>
  );
};

export default DashboardPage;
