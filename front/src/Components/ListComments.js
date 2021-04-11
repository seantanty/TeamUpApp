import React from "react";
import PropTypes from "prop-types";
import "../styles/listcomments.css";

const ListComments = (props) => {
  const { comments } = props;

  const renderComments = () => {
    let res = [];
    let i = 0;
    for (let c of comments) {
      let commentDate = new Date(c.createdAt);
      let dateToShow = commentDate.toLocaleString();
      res.push(
        <div className="comment-item active" key={"Comments" + i}>
          <div className="comment mt-4 text-justify float-left"></div>
          <div className="comment card p-3 mt-2">
            <h5>{c.username}</h5> <span>{dateToShow}</span> <br />
            <p>{c.content}</p>
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
