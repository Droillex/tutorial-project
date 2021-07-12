import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers, followUser, unfollowUser } from "../../redux/usersReducer";
import Users from "./Users";
import {
  selectIsFetching,
  selectUsers,
  selectUsersCount,
  selectDisabledUsers,
  selectUsersPerPage,
  selectCurrentPage,
} from "../../redux/usersSelectors";

import { compose } from "redux";
import { withRouter } from "react-router-dom";

const UsersContainerWithHooks = ({
  currentPage,
  usersPerPage,
  fetchUsers,
  ...props
}) => {
  let params = {};
  props.location.search
    .substr(1)
    .split("&")
    .forEach((elem) => {
      const [key, value] = elem.split("=");
      params[key] = value;
    });
  const page = parseInt(params.page) || currentPage;

  let [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    const response = fetchUsers(localPage, usersPerPage);
    response.catch(() => {
      setLocalPage(currentPage);
    });
  }, [localPage, currentPage, usersPerPage, fetchUsers]);

  const onPageChanged = (pageNumber) => {
    setLocalPage(pageNumber);
  };

  return props.isFetching ? (
    <Users usersPerPage={usersPerPage} users={null} />
  ) : (
    <Users
      users={props.users}
      usersCount={props.usersCount}
      usersPerPage={usersPerPage}
      currentPage={currentPage}
      onFollow={props.followUser}
      onUnfollow={props.unfollowUser}
      onPageChanged={onPageChanged}
      disabledUsers={props.disabledUsers}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    users: selectUsers(state),
    currentPage: selectCurrentPage(state),
    usersPerPage: selectUsersPerPage(state),
    usersCount: selectUsersCount(state),
    isFetching: selectIsFetching(state),
    disabledUsers: selectDisabledUsers(state),
  };
};

const mapDispatchToProps = {
  followUser,
  unfollowUser,
  fetchUsers,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UsersContainerWithHooks);
