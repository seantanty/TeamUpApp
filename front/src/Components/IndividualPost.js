import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListComments from "../Components/ListComments.js";
import CommentBox from "../Components/CommentBox.js";

function IndividualPost(props) {
  const { state } = useLocation();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [displayCommentBox, setdisplayCommentBox] = useState(false);

  function clickComment() {
    setdisplayCommentBox(!displayCommentBox);
  }
  function convertDate(dateString) {
    let postDate = new Date(dateString);
    return postDate.toLocaleString();
  }

  useEffect(() => {
    const getPostById = async () => {
      try {
        const resRaw = await fetch("/getPostById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: state.post._id }),
        });
        const res = await resRaw.json();
        setPost(res);
        setComments(res.comments);
      } catch (error) {
        console.error(error);
      }
    };
    getPostById();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="d-flex flex-column comment-section">
              <div className="bg-white p-2">
                <div className="mt-2">
                  <h4>{post.title}</h4>
                  <p className="comment-text">{post.content}</p>
                </div>
                <div className="d-flex flex-row user-info">
                  <div className="d-flex flex-column justify-content-start ml-2">
                    <h6>Posted by: {post.username}</h6>
                    <span className="date text-black-50">
                      Created at: {convertDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <div className="d-flex flex-row fs-12">
                  <button type="button" className="btn btn-outline-danger">
                    <i className="fa fa-heart-o"></i>
                    <span className="ml-1">Like</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ marginLeft: "5px" }}
                    onClick={clickComment}
                  >
                    <i className="fa fa-commenting-o"></i>
                    <span className="ml-1">Comment</span>
                  </button>
                </div>
              </div>
              <CommentBox display={displayCommentBox} post={post}></CommentBox>
              <div className="bg-white p-2">
                <h4>Comments:</h4>
                <ListComments comments={comments}></ListComments>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualPost;
