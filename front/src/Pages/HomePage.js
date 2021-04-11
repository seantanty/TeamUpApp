import React, { useState, useEffect, useRef } from "react";
import ListPosts from "../Components/ListPosts.js";
import PaginationComponent from "../Components/PaginationComponent.js";
import "../styles/home.css";

function HomePage() {
  let [posts, setPosts] = useState([]);
  let [query, setQuery] = useState("");
  let [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  const inSearchRef = useRef();

  useEffect(() => {
    //Send focus to the search input
    inSearchRef.current.focus();

    console.log("setting focus to input", inSearchRef.current.value);
  });

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resRaw = await fetch(`./getPosts?query=${query}&page=${page}`);
        const res = await resRaw.json();
        setPosts(res.posts);
        setTotal(res.total);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [reload, page]);

  const onChangePage = (_page) => {
    setPage(_page);
  };

  return (
    <div className="container">
      <div className="col-12 col-md-10 col-lg-8" style={{ margin: "0 auto" }}>
        <div className="card card-sm" id="searchBarBox">
          <div
            className="card-body row no-gutters align-items-center"
            id="searchBar"
          >
            <div className="col-auto">
              <i className="fa fa-search h4 text-body"></i>
            </div>
            <div className="col">
              <input
                ref={inSearchRef}
                className="form-control form-control-lg form-control-borderless"
                type="text"
                placeholder="Search topics or keywords"
                onChange={(evt) => {
                  setQuery(evt.target.value);
                }}
                onKeyPress={(evt) => {
                  console.log("keypress", evt.keyCode, evt.code);
                  if (evt.code === "Enter") {
                    console.log("Reload Data");
                    setReload(reload + 1);
                  }
                }}
                value={query}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success"
                onClick={() => {
                  const now = new Date();

                  console.log("time is ", now);
                  setReload(reload + 1);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <ListPosts posts={posts}></ListPosts>

      <PaginationComponent
        total={total}
        page={page}
        onChangePage={setPage}
      ></PaginationComponent>
    </div>
  );
}

export default HomePage;
