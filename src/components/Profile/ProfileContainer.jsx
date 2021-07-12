import React from "react";
import Profile from "./Profile";
import {
  addPost,
  fetchProfile,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profileReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  getAuthID,
  getPosts,
  getPostText,
  getProfile,
  getStatus,
} from "../../redux/profileSelectors";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) userId = this.props.authUserId;

    if (userId) this.props.fetchProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    posts: getPosts(state),
    post_text: getPostText(state),
    status: getStatus(state),
    authUserId: getAuthID(state),
  };
};
const mapDispatchToProps = {
  addPost,
  fetchProfile,
  getUserStatus,
  updateUserStatus,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
