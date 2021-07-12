import React from "react";
import { connect } from "react-redux";
import { getUsers, followUser, unfollowUser } from "../../redux/usersReducer";
import Users from "./Users";
import usersSelectors from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.usersPerPage);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.usersPerPage);
  };

  render() {
    return this.props.isFetching ? (
      <Users usersPerPage={this.props.usersPerPage} users={null} />
    ) : (
      <Users
        users={this.props.users}
        usersCount={this.props.usersCount}
        usersPerPage={this.props.usersPerPage}
        currentPage={this.props.currentPage}
        onFollow={this.props.followUser}
        onUnfollow={this.props.unfollowUser}
        onPageChanged={this.onPageChanged}
        disabledUsers={this.props.disabledUsers}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: usersSelectors.getUsers(state),
    currentPage: usersSelectors.getCurrentPage(state),
    usersPerPage: usersSelectors.getUsersPerPage(state),
    usersCount: usersSelectors.getUsersCount(state),
    isFetching: usersSelectors.getIsFetching(state),
    disabledUsers: usersSelectors.getDisabledUsers(state),
  };
};

const mapDispatchToProps = {
  followUser,
  unfollowUser,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
