import React, { useState } from "react";
// import { Link } from "react-router-dom";

import "../styles/post.css";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createPost() {
    let time = new Date();
    await fetch("/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        createdAt: time.toString(),
      }),
    }).then((res) => {
      if (res.redirected) {
        console.log(res.url);
        window.location.href = res.url;
      }
    });
  }

  return (
    <div className="container" id="postContainer">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <form action="">
            <div className="form-group">
              <label for="title">
               Title *
              </label>
          
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                className="form-control"
                name="description"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
  
              <p>
                <br />
                <span className="require">*</span> - required fields
              </p>
            
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={createPost}
                id="createPost"
              >
                Create
              </button>
              <button className="btn btn-default" id="cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
