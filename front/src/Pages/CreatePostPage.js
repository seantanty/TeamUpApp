import React, { useState } from "react";
// import { Link } from "react-router-dom";

const CreatePostPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await fetch("/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => console.log(res));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h1>Create Post</h1>
          <form action="">
            <div class="form-group">
              <label for="title">
                Title <span class="require">*</span>
              </label>
              <input type="text" class="form-control" name="title" />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                rows="5"
                class="form-control"
                name="description"
              ></textarea>
            </div>

            <div class="form-group">
              <p>
                <span class="require">*</span> - required fields
              </p>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Create
              </button>
              <button class="btn btn-default">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
