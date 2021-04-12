import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListPostsUser = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    let res = [];
    let i = 0;
    for (let p of posts) {
      let postDate = new Date(p.createdAt);
      let dateToShow = postDate.toLocaleString();
      res.push(
        <div className="forum-item active" key={"Posts" + i}>
          <div className="card-body py-3">
            <div className="row no-gutters align-items-center">
              <div className="col">
                <Link
                  to={{
                    pathname: `/post/${p.post_id}`,
                    state: { post: p },
                  }}
                >
                  <p className="forum-item-title">{p.title}</p>
                </Link>
              </div>
              <div className="d-none d-md-block col-5">
                <div className="row no-gutters align-items-center">
                  <div className="col-6">{dateToShow}</div>
                </div>
              </div>
            </div>
          </div>
          <hr className="m-0" />
        </div>
      );
      i += 1;
    }
    return res;
  };

  return <div className="ListPostsUser">{renderPosts()}</div>;
};

ListPostsUser.propTypes = {
  posts: PropTypes.array.isRequired,
  //label: PropTypes.string,
};

export default ListPostsUser;
