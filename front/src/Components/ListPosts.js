import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListPosts = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    let res = [];
    let i = 0;
    for (let p of posts) {
      res.push(
        <div className="forum-item active" key={"Posts" + i}>
          <div className="row">
            <div className="col-md-9">
              <Link
                to={{
                  pathname: `/post/${p._id}`,
                  state: { post: p },
                }}
              >
                <p className="forum-item-title">{p.title}</p>
              </Link>
            </div>
            <div className="col-md-2 forum-info">
              <span className="views-number">Created at: {p.createdAt}</span>
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
