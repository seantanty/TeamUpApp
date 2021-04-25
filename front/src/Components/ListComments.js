import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/listcomments.css";
import CommentBox from "../Components/CommentBox.js";

const ListComments = (props) => {
  const { post, comments, userid, username } = props;
  const [displayCommentBox, setdisplayCommentBox] = useState(false);

  function clickComment() {
    if (userid) {
      setdisplayCommentBox(!displayCommentBox);
    }
  }

  const deleteComment = async (cid) => {
    await fetch("/deleteComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
        commentId: cid,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  if (comments !== null && comments !== undefined) {
    if (comments.length && comments.length > 0) {
      const renderComments = () => {
        let res = [];
        let i = 0;
        for (let c of comments) {
          let commentDate = new Date(c.createdAt);
          let dateToShow = commentDate.toLocaleString();
          if (userid && userid === c.userId) {
            res.push(
              <div className="comment-item active" key={"Comments" + i}>
                <div className="comment mt-4 text-justify float-left">
                  <div className="comment card p-3 mt-2">
                    <h6>{c.username}</h6> <span>{dateToShow}</span> <br />
                    <p>{c.content}</p>
                  </div>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-warning"
                  id="commentEdit"
                  onClick={(e) => clickComment()}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="commentDelete"
                  onClick={(e) => deleteComment(c._id)}
                >
                  Delete
                </button>
                <CommentBox
                  username={username}
                  display={displayCommentBox}
                  post={post}
                  cid={c._id}
                ></CommentBox>
              </div>
            );
          } else {
            res.push(
              <div className="comment-item active" key={"Comments" + i}>
                <div className="comment mt-4 text-justify float-left">
                  <div className="comment card p-3 mt-2">
                    <h6>{c.username}</h6> <span>{dateToShow}</span> <br />
                    <p>{c.content}</p>
                  </div>
                </div>
              </div>
            );
          }
          i += 1;
        }
        return res;
      };

      return (
        <div className="bg-white p-2">
          <h5>Comments:</h5>
          <div className="ListComments">{renderComments()}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

ListComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ListComments;
