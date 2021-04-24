import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/post.css";

const EditPostPage = () => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [content, setContent] = useState("");
  const postId = window.location.pathname.slice(10);

  const user = localStorage.getItem("user");
  if (user === null) {
    alert("Pleae sign in first!");
    window.location.href = "/login";
  }

  useEffect(() => {
    const getPostById = async () => {
      try {
        const resRaw = await fetch("/getPostById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: postId }),
        });
        const res = await resRaw.json();
        setPost(res);
        setCat(res.category);
      } catch (error) {
        console.error(error);
      }
    };
    getPostById();
  }, []);

  const editPost = async (event) => {
    event.preventDefault();
    if (title === "" || cat === "") {
      alert("Post must have a title and category.");
    } else {
      const resRaw = await fetch("/editPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          category: cat,
          content: content,
        }),
      });

      const res = await resRaw.json();
      if (res.p_id) {
        window.location.href = `/post/${res.p_id}`;
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="container" id="postContainer">
      <h1>{cat}</h1>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <form action="">
            <div className="form-group">
              <label for="title">Title *</label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={post.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                className="form-select form-control"
                value={cat}
                name="category"
                onChange={(evt) => {
                  setCat(evt.target.value);
                }}
              >
                <option value="">Category</option>
                <option value="Study">Study</option>
                <option value="Video Game">Video Games</option>
                <option value="Outdoor Activities">Outdoor Activities</option>
                <option value="Online Activities">Online Activities</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                className="form-control"
                name="description"
                value={post.content}
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
                onClick={editPost}
                id="editPost"
              >
                Edit
              </button>
              <Link
                to={{
                  pathname: `/post/${postId}`,
                }}
              >
                <button className="btn btn-default" id="cancel">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
