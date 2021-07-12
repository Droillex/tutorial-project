import React, { useEffect } from "react";
import Profile from "./Profile";
import {
  addPost,
  fetchProfile,
  getUserStatus,
  updateUserStatus,
  updateProfilePhoto,
} from "../../redux/profileReducer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  selectAuthID,
  selectPosts,
  selectPostText,
  selectProfile,
  selectStatus,
} from "../../redux/profileSelectors";

function ProfileContainerWithHooks({ fetchProfile, getUserStatus, ...props }) {
  let linkId = props.match.params.userId;
  if (!linkId) linkId = props.authUserId;

  useEffect(() => {
    if (linkId) {
      fetchProfile(linkId);
      getUserStatus(linkId);
    }
  }, [linkId, fetchProfile, getUserStatus]);

  if (!linkId) return <Redirect to="/" />;
  return (
    <Profile
      {...props}
      isOwner={
        !props.match.params.userId ||
        (props.authUserId &&
          props.authUserId.toString() === props.match.params.userId)
      }
    />
  );
}

const mapStateToProps = (state) => ({
  profile: selectProfile(state),
  posts: selectPosts(state),
  post_text: selectPostText(state),
  status: selectStatus(state),
  authUserId: selectAuthID(state),
});

const mapDispatchToProps = {
  addPost,
  fetchProfile,
  getUserStatus,
  updateUserStatus,
  updateProfilePhoto,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
  // withAuthRedirect
)(ProfileContainerWithHooks);
