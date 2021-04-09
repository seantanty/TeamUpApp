import React from "react";
import PropTypes from "prop-types";

const ListPosts = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    let res = [];
    let i = 0;
    for (let p of posts) {
      res.push(
        <div class="forum-item active" key={"Posts" + i}>
          <div class="row">
            <div class="col-md-9">
              <div class="forum-icon">
                <i class="fa fa-shield"></i>
              </div>
              <a href="forum_post.html" class="forum-item-title">
                {p.title}
              </a>
            </div>
            <div class="col-md-1 forum-info">
              <span class="views-number">Created at: {p.createdAt}</span>
            </div>
          </div>
        </div>
      );
      i += 1;
    }
    return res;

    // return movies.map((m, i) => <div key={"Movie" + i}>{m.title}</div>);
  };

  return <div className="ListPosts">{renderPosts()}</div>;
};

ListPosts.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default ListPosts;
