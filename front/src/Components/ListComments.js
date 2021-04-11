import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListComments = (props) => {
  const { comments } = props;

  const renderComments = () => {
    let res = [];
    let i = 0;
    for (let c of comments) {
      res.push(
        <div className="forum-item active" key={"Comments" + i}>
          <div className="row">
            <div className="col-md-9">
              <h5>{c.user}</h5>
              <p className="forum-item-title">{c.content}</p>
            </div>
            <div className="col-md-2 forum-info">
              <span className="views-number">Created at: {c.createdAt}</span>
            </div>
          </div>
        </div>
      );
      i += 1;
    }
    return res;

    // return movies.map((m, i) => <div key={"Movie" + i}>{m.title}</div>);
  };

  return <div className="ListComments">{renderComments()}</div>;
};

ListComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ListComments;
