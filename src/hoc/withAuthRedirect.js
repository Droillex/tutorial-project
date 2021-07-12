import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectIsAuth } from "../redux/authSelector";

const withAuthRedirect = (Component) => {
  const mapStateToProps = (state) => ({
    isAuth: selectIsAuth(state),
  });

  function RedirectComponent(props) {
    if (!props.isAuth) return <Redirect to="/" />;
    return <Component {...props} />;
  }

  return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;
