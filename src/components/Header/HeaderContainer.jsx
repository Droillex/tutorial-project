import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { loginModal } from "../../redux/modalReducer";
import { selectHeader, selectAuth } from "../../redux/headerSelector";

function HeaderContainer(props) {
  return <Header {...props} />;
}

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
    header: selectHeader(state),
  };
};

export default connect(mapStateToProps, { logout, loginModal })(
  HeaderContainer
);
