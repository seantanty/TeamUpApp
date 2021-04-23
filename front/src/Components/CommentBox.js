import React, { useState } from "react";
import "../styles/commentbox.css";

const CommentBox = (props) => {
  const { username, post, display } = props;
  const [comment, setComment] = useState([]);
  if (display && username) {
    const createComment = async () => {
      await fetch("/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
          comment: comment,
        }),
      }).then(() => {
        window.location.reload();
      });
    };

    return (
      <div className="CommentBox">
        <div className="bg-light p-2">
          <h5>Post comment as {username}</h5>
          <div className="d-flex flex-row align-items-start">
            <textarea
              className="col-md-6 form-control ml-1 textarea"
              onChange={(e) => setComment(e.target.value)}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="mt-2 pull-right">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={createComment}
            >
              Post comment
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CommentBox;
