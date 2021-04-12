import React, { useState } from "react";
// import { Link } from "react-router-dom";

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
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h1>Create Post</h1>
          <form action="">
            <div className="form-group">
              <label>Title</label>
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

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={createPost}
              >
                Create
              </button>
              <button className="btn btn-default">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
