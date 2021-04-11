import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ListComments from "../Components/ListComments.js";

const style = { fontSize: "22pt" };

function IndividualPost(props) {
  const { state } = useLocation();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);

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
        console.log(res);
        setPost(res);
        setComments(res.comments);
      } catch (error) {
        console.error(error);
      }
    };
    getPostById();
  }, []);

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
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-12">
            <div className="d-flex flex-column comment-section">
              <div className="bg-white p-2">
                <div className="d-flex flex-row user-info">
                  <img
                    className="rounded-circle"
                    src="https://i.imgur.com/RpzrMR2.jpg"
                    width="40"
                    alt="Avatar"
                  />
                  <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name">
                      {post.user}
                    </span>
                    <span className="date text-black-50">
                      Created at: {post.createdAt}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <h4>{post.title}</h4>
                  <p className="comment-text">{post.content}</p>
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
                  >
                    <i className="fa fa-commenting-o"></i>
                    <span className="ml-1">Comment</span>
                  </button>
                </div>
              </div>
              <div className="bg-light p-2">
                <div className="d-flex flex-row align-items-start">
                  <textarea
                    className="col-md-6 form-control ml-1 textarea"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-2 text-right">
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={createComment}
                  >
                    Post comment
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm ml-1"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListComments comments={comments}></ListComments>
    </div>
  );
}

IndividualPost.propTypes = {};

export default IndividualPost;
