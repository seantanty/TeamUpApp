import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const style = { fontSize: "22pt" };

function IndividualPost(props) {
  const { state } = useLocation();
  let [post, setPost] = useState([]);

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
      } catch (error) {
        console.error(error);
      }
    };
    getPostById();
  }, []);

  // function renderCommentForm() {
  //    return (
  //       <Form onSubmit={this.handleSubmit}>
  //           <div style={{width: '90%', margin: '30px auto'}}>
  //               <Form.Group>
  //                   <Form.Control as="textarea" onChange={this.handleChange} value={this.state.text} rows={5} placeholder="Write something for this comment..."/>
  //                   </Form.Group>
  //                   <Button variant="primary" type="submit">
  //                       Reply
  //                   </Button>
  //               </div>
  //           </Form>
  //       )
  // }

  return (
    <div>
      <div class="container mt-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
            <div class="d-flex flex-column comment-section">
              <div class="bg-white p-2">
                <div class="d-flex flex-row user-info">
                  <img
                    class="rounded-circle"
                    src="https://i.imgur.com/RpzrMR2.jpg"
                    width="40"
                    alt="Avatar"
                  />
                  <div class="d-flex flex-column justify-content-start ml-2">
                    <span class="d-block font-weight-bold name">
                      Marry Andrews
                    </span>
                    <span class="date text-black-50">
                      Shared publicly - Jan 2020
                    </span>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="comment-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div class="bg-white">
                <div class="d-flex flex-row fs-12">
                  <div class="like p-2 cursor">
                    <i class="fa fa-thumbs-o-up"></i>
                    <span class="ml-1">Like</span>
                  </div>
                  <div class="like p-2 cursor">
                    <i class="fa fa-commenting-o"></i>
                    <span class="ml-1">Comment</span>
                  </div>
                  <div class="like p-2 cursor">
                    <i class="fa fa-share"></i>
                    <span class="ml-1">Share</span>
                  </div>
                </div>
              </div>
              <div class="bg-light p-2">
                <div class="d-flex flex-row align-items-start">
                  <img
                    class="rounded-circle"
                    src="https://i.imgur.com/RpzrMR2.jpg"
                    width="40"
                    alt="Avatar"
                  />
                  <textarea class="form-control ml-1 shadow-none textarea"></textarea>
                </div>
                <div class="mt-2 text-right">
                  <button
                    class="btn btn-primary btn-sm shadow-none"
                    type="button"
                  >
                    Post comment
                  </button>
                  <button
                    class="btn btn-outline-primary btn-sm ml-1 shadow-none"
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
      <h1>ID: {post._id}</h1>
      <p>Title: {post.title}</p>
      <p>Created at: {post.createdAt}</p>
      <p>{post.content}</p>
      <button type="button" className="btn btn-primary">
        Reply
      </button>
    </div>
  );
}

IndividualPost.propTypes = {};

export default IndividualPost;
