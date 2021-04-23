import React from "react";
import PropTypes from "prop-types";
import "../styles/listcomments.css";

const ListComments = (props) => {
  const { comments, userid } = props;

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
                    <h5>{c.username}</h5> <span>{dateToShow}</span> <br />
                    <p>{c.content}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{
                    marginLeft: "10px",
                    height: "36px",
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{
                    marginLeft: "10px",
                    height: "36px",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          } else {
            res.push(
              <div className="comment-item active" key={"Comments" + i}>
                <div className="comment mt-4 text-justify float-left">
                  <div className="comment card p-3 mt-2">
                    <h5>{c.username}</h5> <span>{dateToShow}</span> <br />
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
