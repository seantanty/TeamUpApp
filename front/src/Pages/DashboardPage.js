import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

import Count from "../Components/Count.js";
import ListPostsUser from "../Components/ListPostsUser.js";

const DashboardPage = () => {
  const [postCount, setPostCount] = useState(0);
  const [teamupCount, setTeamedCount] = useState(0);
  const [interestCount, setInterestCount] = useState(0);
  const [posted, setPosted] = useState([]);
  const [interested, setInterested] = useState([]);
  const [teamuped, setTeamuped] = useState([]);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;

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
        //set counts
        setInterestCount(res.interested.length);
        setPostCount(res.posted.length);
        setTeamedCount(res.teamuped.length);

        //set posts
        const userPosted = res.posted.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        const userInterested = res.interested.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        const userTeamuped = res.teamuped.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        setPosted(userPosted);
        setInterested(userInterested);
        setTeamuped(userTeamuped);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="containter">
      <div className="countsContainer">
        <Count label={"posted"} count={postCount} />
        <Count label={"interested"} count={interestCount} />
        <Count label={"teamuped"} count={teamupCount} />
      </div>

      <div className="container-fluid mt-100">
        <div className="row">
          <div className="col-md-9">
            <div className="card mb-3">
              <div className="card-header pr-0 pl-0">
                <div className="row no-gutters align-items-center w-100">
                  <div className="col font-weight-bold pl-3">Titles</div>
                  <div className="d-none d-md-block col-6 text-muted">
                    <div className="row no-gutters align-items-center">
                      <div className="col-6">Last update</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card mb-3">
                  <div className="card-header pr-0 pl-0">
                    <div className="row no-gutters align-items-center w-100">
                      <div className="col font-weight-bold pl-3">Posted</div>
                    </div>
                  </div>
                </div>
                <ListPostsUser posts={posted}></ListPostsUser>
              </div>
              <div>
                <div className="card mb-3">
                  <div className="card-header pr-0 pl-0">
                    <div className="row no-gutters align-items-center w-100">
                      <div className="col font-weight-bold pl-3">
                        Interested
                      </div>
                    </div>
                  </div>
                </div>
                <ListPostsUser posts={interested}></ListPostsUser>
              </div>
              <div>
                <div className="card mb-3">
                  <div className="card-header pr-0 pl-0">
                    <div className="row no-gutters align-items-center w-100">
                      <div className="col font-weight-bold pl-3">TeamUped</div>
                    </div>
                  </div>
                </div>
                <ListPostsUser posts={teamuped}></ListPostsUser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
