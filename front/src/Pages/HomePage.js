import React, { useState, useEffect, useRef } from "react";
import ListPosts from "../Components/ListPosts.js";
import PaginationComponent from "../Components/PaginationComponent.js";
import "../styles/home.css";

function HomePage() {
  let [posts, setPosts] = useState([]);
  let [query, setQuery] = useState("");
  let [cat, setCat] = useState("");
  let [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  const inSearchRef = useRef();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resRaw = await fetch(
          `./getPosts?category=${cat}&query=${query}&page=${page}`
        );
        const res = await resRaw.json();
        setPosts(res.posts);
        setTotal(res.total);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [reload, page]);

  return (
    <div className="container" id="container">
      <div className="row">
        <div className="col-md-8" id="searchBarBox">
          <div className="input-group">
            <div className="input-group-btn search-panel">
              <select
                className="form-select form-control"
                onChange={(evt) => {
                  setCat(evt.target.value);
                }}
              >
                <option value="">Category</option>
                <option value="Study">Study</option>
                <option value="Video Game">Video Games</option>
                <option value="Outdoor">Outdoor Activities</option>
                <option value="Online">Online Activities</option>
              </select>
            </div>
            <input
              ref={inSearchRef}
              className="form-control"
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
            <span className="input-group-btn">
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => {
                  console.log(query);
                  console.log(reload);
                  setReload(reload + 1);
                }}
              >
                <span className="fa fa-search"></span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="container mt-100">
        <div className="row">
          <div className="col-md-10">
            <div className="card mb-3" id="posts card">
              <div className="card-header pr-0 pl-0">
                <div className="row no-gutters align-items-center w-100">
                  <div className="col font-weight-bold pl-3">Titles</div>
                  <div className="d-none d-md-block col-8 text-muted">
                    <div className="row no-gutters align-items-center">
                      <div className="col-4">Replies</div>
                      <div className="col-8">Last update</div>
                    </div>
                  </div>
                </div>
              </div>
              <ListPosts posts={posts}></ListPosts>
            </div>
          </div>
        </div>
      </div>

      <PaginationComponent
        className="Pagination"
        total={total}
        page={page}
        onChangePage={setPage}
      ></PaginationComponent>
    </div>
  );
}

export default HomePage;
