import React, { useState } from "react";
import "../styles/commentbox.css";

const CommentBox = (props) => {
  const { username, post, display, cid } = props;
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

    const editComment = async () => {
      await fetch("/editComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
          commentId: cid,
          comment: comment,
        }),
      }).then(() => {
        window.location.reload();
      });
    };

    if (cid) {
      return (
        <div className="CommentBox">
          <div className="bg-light p-2">
            <h5>Edit comment as {username}</h5>
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
                onClick={editComment}
              >
                Edit comment
              </button>
            </div>
          </div>
        </div>
      );
    } else {
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
    }
  } else {
    return <div></div>;
  }
};

export default CommentBox;
